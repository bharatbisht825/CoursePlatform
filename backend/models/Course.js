import mongoose from "mongoose";
const schema = mongoose.Schema({
  // Title type, required, minLength, maxLength
  // Description type, required, minLength
  // Lectures title,description,videos { public_id,url }
  // Poster public_id, url
  // Views type, default
  // NumOfVideos type, default
  // Category type, required
  // CreatedBy type, required
  // CreatedAt type, default
  title: {
    type: String,
    required: [true, "Please enter the course title"],
    minLength: [4, "Course title must have atleast 4 characters"],
    maxLength: [80, "Course title should not exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the course description"],
    minLength: [20, "Course description must have atleast 20 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfLectures: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required : [true,"Category is mandatory"],
    default: "Web Development",
  },
  createdBy: {
    type: String,
    required: [true,"Please enter the course creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Course = mongoose.model("Course", schema);
