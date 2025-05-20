import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"
import Class from "../models/class.model.js";
import { sendMail } from "../utils/sendmail.js";



export const createOrder = asyncHandler(async(req,res)=>{

    const userId = req.user.id
    const { classId } = req.validatedData.params
    const existingUser = await User.findById(userId).populate('memberShipPlan.package')

    if(!existingUser.isMember||!existingUser.isDiscovery){
        throw new ApiError("User is not a member",400)
    }

    const {date} = req.validatedData.body

    const existingClass = await Class.findById(classId)

    if(!existingClass){
        throw new ApiError("Class not found",404)
    }
    const createOrder = await Order.create({
        user: userId,
        product: classId,
        status: 'scheduled',
        scheduledDate: date,
    })

    existingUser.upcomingSchedule.push({ item: createOrder._id });

    

    existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession-1;
    if(!existingUser.memberShipPlan.startDate){
        existingUser.memberShipPlan.startDate = new Date();
        existingUser.memberShipPlan.expiryDate = new Date(existingUser.memberShipPlan.startDate.getTime() + existingUser.memberShipPlan.package.validity*7 * 24 * 60 * 60 * 1000);
    }

    const emailTemplateForUser = (userName, className, scheduledDate, time) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Class Booked</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          margin: 0; padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 10px;
        }
        h2 {
          color: #333333;
        }
        p {
          color: #555555;
          line-height: 1.5;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #999999;
          text-align: center;
        }
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff !important;
          padding: 10px 20px;
          margin-top: 20px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
          <h2>Order Confirmation</h2>
        </div>
        <p>Hi ${userName},</p>
        <p>Thank you for booking a class with us! Your class has been successfully scheduled.</p>
        <p>
          <strong>Class:</strong> ${className}<br />
          <strong>Date:</strong> ${new Date(scheduledDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}<br />
          <strong>Time:</strong> ${time}
        </p>
        <p>We look forward to seeing you there. If you have any questions, feel free to reach out to our support team.</p>
        <a href="${process.env.FRONTEND_URL}/api/v1/user/get-scheduled-classes" class="button">View Your Schedule</a>
        <div class="footer">
          <p>The Pilates Room</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await sendMail(existingUser.email,"Order Confirmation",emailTemplateForUser(existingUser.firstName,existingClass.title,date,existingClass.time))
    
    
    const emailTemplateForAdmin = (firstName, lastName, userEmail, className, scheduledDate) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>New Order Received</title>
    <style>
        body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
        .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; }
        h2 { color:#333; }
        p { color:#555; line-height:1.5; }
    </style>
    </head>
    <body>
    <div class="container">
        <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" style="max-width:150px; display:block; margin: 0 auto 20px;" />
        <h2>New Order Received</h2>
        <p><strong>User:</strong> ${firstName} ${lastName} (${userEmail})</p>
        <p><strong>Class Booked:</strong> ${className}</p>
        <p><strong>Scheduled Date:</strong> ${new Date(scheduledDate).
        toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</p>
        <p><strong>Time:</strong>${existingClass.time}</p>
        <p>Please check the admin panel for more details.</p>
    </div>
    </body>
    </html>
    `;

   await sendMail("jadonyash755@gmail.com",`Order Received From ${existingUser.firstName}`,emailTemplateForAdmin(existingUser.firstName,existingUser.lastName,existingUser.email,existingClass.title,date))

    await existingUser.save()

    sendResponse(res,200,createOrder,"Order created successfully")
})



export const cancelOrder = asyncHandler(async(req,res)=>{
    
    const userId = req.user._id;

    const {orderId} = req.validatedData.params

    const existingOrder = await Order.findById(orderId).populate("product")

    if(!existingOrder){
        throw new ApiError("Order not found",404)
    }

    const scheduledDate = new Date(existingOrder.scheduledDate);
    const today = new Date();

   
    scheduledDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (scheduledDate.getTime() <= today.getTime()) {
    throw new ApiError("Order cannot be cancelled on the scheduled date or after", 400);
    }

    const existingUser = await User.findById(userId)

    existingUser.upcomingSchedule = existingUser.upcomingSchedule.filter(
        s => s.item.toString() !== existingOrder._id.toString()
      );

    existingUser.remainingSession = existingUser.remainingSession+1;
    existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession+1;
    existingOrder.status = "cancelled"
 


    await existingOrder.save();
    await existingUser.save();

    const emailTemplateForCancel = (userName, className, scheduledDate) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Order Cancellation</title>
      <style>
        body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
        .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align: center; }
        h2 { color:#333; }
        p { color:#555; line-height:1.5; }
        .button {
          display: inline-block;
          background-color: #dc3545;
          color: #fff !important;
          padding: 10px 20px;
          margin-top: 20px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Replace the src below with your logo URL -->
        <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" class="logo" />
        <h2>class Cancellation Confirmed</h2>
        <p>Hi ${userName},</p>
        <p>Your booking for the class <strong>${className}</strong> scheduled on <strong>${new Date(scheduledDate).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</strong> has been successfully cancelled.</p>
        <p>If you have any questions or wish to reschedule, please contact our support team.</p>
        <a href="${process.env.FRONTEND_URL}/api/v1/user/get-scheduled-classes" class="button">View Your Schedule</a>
      </div>
    </body>
    </html>
    `;

    await sendMail(
        existingUser.email,
        "Class Cancellation Confirmation",
        emailTemplateForCancel(existingUser.firstName, existingOrder.product.title, existingOrder.scheduledDate)
      );

      const emailTemplateForAdminCancel = (firstName, lastName, userEmail, className, scheduledDate) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Class Cancellation Notice</title>
        <style>
          body { font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:20px; }
          .container { max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center; }
          h2 { color:#333; }
          p { color:#555; line-height:1.5; }
          img { max-width:150px; margin-bottom:20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://res.cloudinary.com/disdsorfp/image/upload/v1747652022/TPR-Logo_yh2gyj.webp" alt="Logo" />
          <h2>Order Cancellation Alert</h2>
          <p>User <strong>${firstName} ${lastName}</strong> (${userEmail}) has cancelled their booking.</p>
          <p><strong>Class:</strong> ${className}</p>
          <p><strong>Scheduled Date:</strong> ${new Date(scheduledDate).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</p>
          <p>Please update the records accordingly.</p>
        </div>
      </body>
      </html>
      `;



await sendMail(
    "jadonyash755@gmail.com",
    `Class Cancellation by ${existingUser.firstName} ${existingUser.lastName}`,
    emailTemplateForAdminCancel(existingUser.firstName, existingUser.lastName, existingUser.email, existingOrder.product.title, existingOrder.scheduledDate)
  );

    sendResponse(res,200,null,"Class cancelled successfully")

})


export const orderHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;     
    const orderHistory = await Order.find({ user: userId }).populate('product');    
    if (!orderHistory || orderHistory.length === 0) {
        throw new ApiError("Order not found", 404);
    }
    sendResponse(res, 200, orderHistory, "Order history");
});


export const allOrderHistory = asyncHandler(async (req, res) => {   

    const page = parseInt(req.validatedData.query.page) || 1;
    const limit = parseInt(req.validatedData.query.limit) || 10;
    const date = req.validatedData.query.date;
  
    const query = {};
  
    // Date filter (for exact day)
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
  
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }
  
    const [orderHistory, totalOrderHistory] = await Promise.all([
      Order.find(query)
        .populate('product')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Order.countDocuments(query)
    ]);
  
    const hasMore = page * limit < totalOrderHistory;
  
    sendResponse(res, 200, {
      data: orderHistory,
      pagination: {
        page,
        limit,
        total: totalOrderHistory,
        hasMore,
        totalPages: Math.ceil(totalOrderHistory / limit)
      }
    }, "Order history fetched successfully");
  });


export const getSingleOrder = asyncHandler(async(req,res)=>{

    const {orderId} = req.validatedData.params

    if (order.user.toString() !== req.user._id.toString()) {
        throw new ApiError("Unauthorized access to order", 403);
    }

    const order = await Order.findById(orderId).populate('product')
    if(!order){
        throw new ApiError("Order not found",404)
    }
    sendResponse(res,200,order,"Order found")
})

    



