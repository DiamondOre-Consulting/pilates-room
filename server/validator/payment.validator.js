import {z} from "zod";



export const checkoutPaymentQuerySchema = z.object({
    membershipPackageId  : z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid product ID format" }).optional(),
});










export const verifyPaymentBodySchema = z.object({
    razorpay_payment_id: z.string().nonempty("Payment ID is required"),
    razorpay_order_id: z.string().nonempty("Order ID is required"),
    razorpay_signature: z.string().nonempty("Signature is required"),
});