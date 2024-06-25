import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";

//To register a new user
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;
  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const registeredUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(res, registeredUser, "Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  sendToken(res, user, `Welcome, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});
export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changeMyPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Your old password is incorrect", 400));
  }
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export const updateMyProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const updateMyProfilePicture = catchAsyncError(
  async (req, res, next) => {
    const file = req.file;
    if (!file) {
      return next(new ErrorHandler("Please choose an avatar", 400));
    }
    const user = await User.findById(req.user._id);

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
    });
  }
);

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(
      new ErrorHandler("Please enter you mail id to reset password", 400)
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const resetToken = await user.getResetToken();

  await user.save();
  //http://localhost:3000/resetpassword/xhsjxhsjjhjskxh
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const text = `  Click on the link below to reset your password

  ${url}
  
  Please ignore if you have not requested for this password reset`;

  //send token via email
  await sendEmail(user.email, "CourseBundle Password Reset", text);
  res.status(200).json({
    success: true,
    message: `Reset token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler("The token is either invalid or has expired", 401)
    );
  }
  const { password } = req.body;
  if (!password) {
    return next(new ErrorHandler("Please enter the password", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
});

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Invalid Course Id", 404));
  }

  const playlistItemExists = user.playlist.find(
    (item) => item.course.toString() === course._id.toString()
  );

  if (playlistItemExists) {
    return next(
      new ErrorHandler("Course has been already added to playlist", 409)
    );
  }

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: "Course has been added to playlist successfully",
  });
});
export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Invalid Course Id", 404));
  }

  const updatedPlaylist = user.playlist.filter(
    (item) => item.course.toString() !== course._id.toString()
  );

  user.playlist = updatedPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Course has been removed from playlist successfully",
  });
});

//Admin Controllers

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  if (user.role == "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "User role has been updated successfully",
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //Cancel Subscription
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User has been deleted successfully",
  });
});

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //Cancel Subscription
  await user.remove();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      //secure : true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "User profile has been deleted successfully",
    });
});

// User.watch().on("change", async () => {
//   const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
//   const subscription = await User.find({ "subscription.status": "active" });
//   stats[0].users = await User.countDocuments();
//   stats[0].subscriptions = subscription.length;
//   stats[0].createdAt = new Date(Date.now());
//   await stats[0].save();
// });

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "active" });

  // Checking if stats array is empty or undefined
  if (stats && stats.length > 0) {
    stats[0].users = await User.countDocuments();
    stats[0].subscriptions = subscription.length;
    stats[0].createdAt = new Date(Date.now());

    // Saving the updated stats document
    await stats[0].save();
  } else {
    console.error("No stats found or stats array is empty");
    // Handle the case where no stats are found or the array is empty
  }
});
