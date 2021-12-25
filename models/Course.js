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
  quiz: {
    type: String,
    default: "0"
  },
  assignment: {
    type: String,
    default: "0"
  },
  project: {
    type: String,
    default: "0"
  },
  midterm: {
    type: String,
    default: "0"
  },
  final: {
    type: String,
    default: "0"
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
