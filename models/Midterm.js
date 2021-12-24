const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MidtermSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    title: {
        type: String,
        default: 'Midterm',
        required: true
    },
    total_marks: {
        type: Number,
    },
    marks_obtained: {
        type: Number,
    }

});

module.exports = User = mongoose.model("midterm", MidtermSchema);
