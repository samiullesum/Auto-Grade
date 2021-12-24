const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  quizes: {
    type: Array,
    default: []
  },
  assignments: {
    type: Array,
    default: []
  },
  project: {
    type: Array,
    default: []
  },
  midterm: {
    type: Array,
    default: []
  },
  final: {
    type: Array,
    default: []
  }

  
  /* quizes: [
    {
      title: {
        type: String,
        required: true,
        default: "Quiz"
      },
      total_marks: {
        type: Number,
        default: 10,
        required: true
      },
      marks_obtained: {
        type: Number,
        default: 0,
        required: true
      }
    }
  ],
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
  ],
  project: [
    {
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
    }
  ],
  midterm: [
    {
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
    }
  ],
  final: [
    {
      title: {
        type: String,
        default: 'Final',
        required: true
      },
      total_marks: {
        type: Number,
      },
      marks_obtained: {
        type: Number,
      }
    }
  ] */
});

module.exports = Student = mongoose.model("students", StudentSchema);
