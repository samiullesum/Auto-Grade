const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course'
    },
    assignments: [
      {
        title: {
          type: String,
          required: true
        },
        total_marks: {
          type: Number,
        },
        marks_obtained: {
          type: Number,
        }
      }
    ]
  });
  
  module.exports = User = mongoose.model("quizes", QuizSchema);
  