import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { getDataUri } from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";

//Get all courses without lectures
export const getAllCourses = catchAsyncError(async (req, res, next) => {
  console.log(req.query);
  const keyword = req.query.keyword || "";
  let category = req.query.category || "";
  if (category === "All Courses") {
    category = "";
  }
  const courses = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});
//Create a course - admin
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
  if (!title || !description || !category || !createdBy || !file) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const file = req.file;

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.numOfLectures = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture has been added to course successfully",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (const lecture of course.lectures) {
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.remove();
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const course = await Course.findById(courseId);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const lecture = course.lectures.find(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  if (!lecture) {
    return next(new ErrorHandler("Lecture not found", 404));
  }

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter(
    (lecture) => lecture._id.toString() !== lectureId.toString()
  );
  course.numOfLectures = course.lectures.length;

  await course.save();
  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});

// Course.watch().on("change",async()=>{
//   const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(1);
//   const courses = await Course.find({})

//   let totalViews = 0;
//   for(let i=0;i<courses.length;i++){
//     totalViews+=courses[i].views
//   }
//   stats[0].views=totalViews
//   stats[0].createdAt = new Date(Date.now())
//   await stats[0].save()
// })

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const courses = await Course.find({});

  if (stats && stats.length > 0) {
    let totalViews = 0;

    // Calculate total views from all courses
    for (let i = 0; i < courses.length; i++) {
      totalViews += courses[i].views || 0; // Safely access course.views
    }

    // Update properties of the stats[0] document
    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());

    // Save the updated stats[0] document
    await stats[0].save();
  } else {
    console.error("Stats array is empty or undefined");
    // Handle this case, e.g., by creating a new Stats document or logging an error
  }
});
