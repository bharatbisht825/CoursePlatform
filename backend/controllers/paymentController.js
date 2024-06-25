import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/errorHandler.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

export const createSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role == "admin") {
    return next(new ErrorHandler("Admin can't create a subscription", 400));
  }
  const plan_id = process.env.PLAN_ID;
  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  const user = await User.findById(req.user._id);
  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id , "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;
  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfailure`);

  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorpayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const subscription_id = user.subscription.id;

  //cancel sunscription
  await instance.subscriptions.cancel(subscription_id);

  //Check if refund is applicable
  let refund = false;
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscription_id,
  });

  if (!payment) {
    return next(
      new ErrorHandler("No payment found with this subscription id", 404)
    );
  }

  const timeGap = Date.now() - payment.createdAt;
  const refundTimeGap = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;
  if (timeGap <= refundTimeGap) {
    refund = true;
    await instance.payments.refund(payment.razorpay_payment_id);
  }

  user.subscription.id = undefined;
  user.subscription.status = undefined;

  await user.save()
  await payment.remove();

  res.status(200).json({
    success: true,
    message: refund
      ? "Your subscription has been cancelled. You will receive full refund within 5 to 7 working days"
      : "Your subscription has been cancelled. No refund initiated as subscription was cancelled after 7 days",
  });
});
