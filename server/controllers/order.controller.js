import Order from "../models/order.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js"
import ApiError from "../utils/apiError.js"
import Class from "../models/class.model.js";
import { sendMail } from "../utils/sendmail.js";



export const createOrder = asyncHandler(async (req, res) => {

  const userId = req.user.id
  const { classId } = req.validatedData.params
  const existingUser = await User.findById(userId).populate('memberShipPlan.package')

  if (!existingUser.isMember || !existingUser.isDiscovery) {
    throw new ApiError("User is not a member", 400)
  }

  const { date } = req.validatedData.body

  if (existingUser.memberShipPlan.remainingSession <= 0 || existingUser.memberShipPlan.status == 'expired' || existingUser.memberShipPlan.expiryDate < new Date()) {
    throw new ApiError("Your membership has been expired", 400)
  }

  const existingClass = await Class.findById(classId)

  if (!existingClass) {
    throw new ApiError("Class not found", 404)
  }
  const createOrder = await Order.create({
    user: userId,
    product: classId,
    status: 'scheduled',
    scheduledDate: date,
  })

  existingUser.upcomingSchedule.push({ item: createOrder._id });

  existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession - 1;
  if (!existingUser.memberShipPlan.startDate) {
    existingUser.memberShipPlan.startDate = new Date();
    existingUser.memberShipPlan.expiryDate = new Date(existingUser.memberShipPlan.startDate.getTime() + existingUser.memberShipPlan.package.validity * 7 * 24 * 60 * 60 * 1000);
  }

  if (existingUser.memberShipPlan.remainingSession <= 0) {
    existingUser.isMember = false
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

  await sendMail(existingUser.email, "Order Confirmation", emailTemplateForUser(existingUser.firstName, existingClass.title, date, existingClass.time))


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
      toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Time:</strong>${existingClass.time}</p>
        <p>Please check the admin panel for more details.</p>
    </div>
    </body>
    </html>
    `;

  await sendMail("jadonyash755@gmail.com", `Order Received From ${existingUser.firstName}`, emailTemplateForAdmin(existingUser.firstName, existingUser.lastName, existingUser.email, existingClass.title, date))

  await existingUser.save()

  sendResponse(res, 200, createOrder, "Order created successfully")
})

export const cancelOrder = asyncHandler(async (req, res) => {

  const userId = req.user._id;

  const { orderId } = req.validatedData.params

  const existingOrder = await Order.findById(orderId).populate("product")

  if (!existingOrder) {
    throw new ApiError("Order not found", 404)
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


  existingUser.memberShipPlan.remainingSession = existingUser.memberShipPlan.remainingSession + 1;
  existingOrder.status = "cancelled"

  if (existingUser.memberShipPlan.remainingSession > 0) {
    existingUser.isMember = true
  }

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
        <p>Your booking for the class <strong>${className}</strong> scheduled on <strong>${new Date(scheduledDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</strong> has been successfully cancelled.</p>
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
          <p><strong>Scheduled Date:</strong> ${new Date(scheduledDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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

  sendResponse(res, 200, null, "Class cancelled successfully")

})

const updateOrderStatuses = async () => {
  const currentDate = new Date();

  const scheduledOrders = await Order.find({
    status: 'scheduled'
  }).populate('product');

  for (const order of scheduledOrders) {
    if (!order.product || !order.product.time) {
      console.warn(`Skipping order ${order._id}: Product or time missing`);
      continue;
    }

    try {
      const scheduledDate = new Date(order.scheduledDate);
      // console.log(order)
      const scheduledTime = order.product.time;


      const [time, period] = scheduledTime.split(' ');
      if (!time || !period) {
          console.warn(`Skipping order ${order._id}: Invalid time format ${scheduledTime}`);
          continue;
      }
      
      let [hours, minutes] = time.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
           console.warn(`Skipping order ${order._id}: Invalid time numbers ${scheduledTime}`);
           continue;
      }

      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }

      scheduledDate.setHours(hours, minutes, 0, 0);

      if (scheduledDate < currentDate) {
        await Order.findByIdAndUpdate(order._id, {
          status: 'completed'
        });
      }
    } catch (err) {
      console.error(`Error processing order ${order._id}:`, err);
    }
  }
};

export const orderHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await updateOrderStatuses();

  const orderHistory = await Order.find({ user: userId })
    .populate('product')
    .sort({ createdAt: -1 });

  if (!orderHistory || orderHistory.length === 0) {
    throw new ApiError("Order not found", 404);
  }

  const ordersWithStatus = orderHistory.map(order => {
    const orderObj = order.toObject();
    const scheduledDateTime = new Date(order.product.date);
    const currentDate = new Date();

    orderObj.statusInfo = {
      isPast: scheduledDateTime < currentDate,
      isUpcoming: scheduledDateTime > currentDate,
      scheduledDate: scheduledDateTime,
      currentDate: currentDate
    };

    return orderObj;
  });

  sendResponse(res, 200, ordersWithStatus, "Order history");
});

export const allOrderHistory = asyncHandler(async (req, res, next) => {
  await updateOrderStatuses();

  const page = parseInt(req.validatedData.query.page) || 1;
  const limit = parseInt(req.validatedData.query.limit) || 10;
  const dateStr = req.validatedData.query.date;
  const search = req.validatedData.query.search;
  
  // Base queries
  let orderQuery = {};
  let userQuery = {
      $or: [
          { isDiscovery: true },
          { isMember: true }
      ]
  };

  // 1. Search Logic
  let matchingUserIds = null;
  if (search) {
      // Find users matching search term
      const searchRegex = new RegExp(search, 'i');
      const users = await User.find({
          $or: [
              { firstName: searchRegex },
              { lastName: searchRegex },
              { email: searchRegex }
          ]
      }).select('_id');
      
      matchingUserIds = users.map(u => u._id);
      
      // Filter orders by these users
      orderQuery.user = { $in: matchingUserIds };
      
      // Filter user query for memberships
      userQuery._id = { $in: matchingUserIds };
  }

  // 2. Date Logic (Optional, kept for API flexibility)
  let startOfDay, endOfDay;
  if (dateStr) {
    startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);

    endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Apply date filter to Order query
    orderQuery.createdAt = { $gte: startOfDay, $lte: endOfDay };
  }
  
  // 3. Fetch Data
  
  // Fetch Orders (Class bookings)
  const orders = await Order.find(orderQuery)
      .populate('product')
      .populate('user')
      .sort({ createdAt: -1 });

  // Fetch Users with memberships/discovery
  // Create membership objects only for matching users
  const usersWithMemberships = await User.find(userQuery).populate('memberShipPlan.package');

  // Normalize User memberships into "Order" objects
  const membershipOrders = [];

  for (const user of usersWithMemberships) {
      // 1. Discovery Purchase
      if (user.isDiscovery) {
          const discoveryDate = user.memberShipPlan?.memberShipFrom || user.createdAt;
          
          // Apply date filter if exists
          if (!dateStr || (new Date(discoveryDate) >= startOfDay && new Date(discoveryDate) <= endOfDay)) {
               membershipOrders.push({
                  _id: `discovery-${user._id}`,
                  user: user,
                  product: null, 
                  membershipPackage: {
                      packageName: "Discovery Package",
                      ...(user.memberShipPlan?.package ? user.memberShipPlan.package.toObject() : {})
                  },
                  orderType: 'discovery',
                  status: 'active',
                  scheduledDate: discoveryDate, // The date they bought it
                  createdAt: discoveryDate,
                  amount: 0,
                  transactionId: user.discoveryPaymentId
              });
          }
      }

      // 2. Membership Purchase
      if (user.isMember && user.memberShipPlan?.package) {
          const membershipDate = user.memberShipPlan.registrationDate || user.createdAt;

          // Apply date filter if exists
          if (!dateStr || (new Date(membershipDate) >= startOfDay && new Date(membershipDate) <= endOfDay)) {
               membershipOrders.push({
                  _id: `membership-${user._id}`,
                  user: user,
                  product: null,
                  membershipPackage: user.memberShipPlan.package,
                  orderType: 'membership',
                  status: user.memberShipPlan.status || 'active',
                  scheduledDate: membershipDate,
                  createdAt: membershipDate,
                  amount: user.memberShipPlan.package.price,
                  transactionId: user.memberShipPlan.subscriptionId
              });
          }
      }
  }

  // Combine lists
  const allRecords = [...orders, ...membershipOrders];

  // Sort by createdAt descending (Latest First)
  allRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination
  const totalRecords = allRecords.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRecords = allRecords.slice(startIndex, endIndex);

  const hasMore = endIndex < totalRecords;

  sendResponse(res, 200, {
    data: paginatedRecords,
    pagination: {
      page,
      limit,
      total: totalRecords,
      hasMore,
      totalPages: Math.ceil(totalRecords / limit)
    }
  }, "Order history fetched successfully");
});


export const getSingleOrder = asyncHandler(async (req, res) => {

  const { orderId } = req.validatedData.params

  if (order.user.toString() !== req.user._id.toString()) {
    throw new ApiError("Unauthorized access to order", 403);
  }

  const order = await Order.findById(orderId).populate('product')
  if (!order) {
    throw new ApiError("Order not found", 404)
  }
  sendResponse(res, 200, order, "Order found")
})





