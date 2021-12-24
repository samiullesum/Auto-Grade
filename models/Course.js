const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  course_title: {
    type: String,
    required: true
  },
  section: {
    type: Number,
    required: true
  },
  noOfStudents: {
    type: Number,
    required: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
});

module.exports = Course = mongoose.model("course", CourseSchema);
