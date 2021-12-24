const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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
        default: 'Project',
        required: true
    },
    total_marks: {
        type: Number,
    },
    marks_obtained: {
        type: Number,
    }

});

module.exports = User = mongoose.model("project", ProjectSchema);
