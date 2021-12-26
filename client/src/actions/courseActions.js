import axios from "axios";
import cogoToast from "cogo-toast";


// Create a new course 
export const createCourse = async (course) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/create-course", course);
    if (res.status === 200) {
      cogoToast.success('Course created successfully', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error("Unable to create course at this time! Please try again", {
      position: "top-right",
    });
  }
};


// upload course assessment marks
export const uploadQuizMarks = async (marksData) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/upload-quiz-marks", marksData);
    if (res.status === 200) {
      cogoToast.success('Quiz marks uploaded', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload quiz marks! Please try again', {
      position: "top-right",
    });
  }
};

export const uploadAssignmentMarks = async (marksData) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/upload-assignment-marks", marksData);
    if (res.status === 200) {
      cogoToast.success('Assignment marks uploaded', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload assignment marks! Please try again', {
      position: "top-right",
    });
  }
};

export const uploadProjectMarks = async (marksData) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/upload-project-marks", marksData);
    if (res.status === 200) {
      cogoToast.success('Project marks uploaded', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload project marks! Please try again', {
      position: "top-right",
    });
  }
};

export const uploadMidtermMarks = async (marksData) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/upload-midterm-marks", marksData);
    if (res.status === 200) {
      cogoToast.success('Midterm marks uploaded', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload midterm marks! Please try again', {
      position: "top-right",
    });
  }
};

export const uploadFinalMarks = async (marksData) => {
  //console.log(course);
  try {
    const res =  await axios.post("/api/course/upload-final-marks", marksData);
    if (res.status === 200) {
      cogoToast.success('Final exam marks uploaded', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload final exam marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateQuizData = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-quiz-data", data);
    if (res.status === 200) {
      cogoToast.success('Final exam marks updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload final exam marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateQuiz = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-quiz", data);
    if (res.status === 200) {
      cogoToast.success('Quiz mark updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload quiz marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateAssignment = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-assignment", data);
    if (res.status === 200) {
      cogoToast.success('Assignment mark updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload assignment marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateProject = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-project", data);
    if (res.status === 200) {
      cogoToast.success('Project marks updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload project marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateMidterm = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-midterm", data);
    if (res.status === 200) {
      cogoToast.success('Midterm marks updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload midterm marks! Please try again', {
      position: "top-right",
    });
  }
};

export const updateFinal = async (data) => {
  try {
    const res =  await axios.put("/api/course/update-Final", data);
    if (res.status === 200) {
      cogoToast.success('Final Exam mark updated', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to upload final exam marks! Please try again', {
      position: "top-right",
    });
  }
};

export const AddNewStudent = async (data) => {
  
  try {
    const res =  await axios.put("/api/course/add-student", data);
    if (res.status === 200) {
      cogoToast.success('Student Added', {
        position: "top-right",
      });
    }
  } catch(err) {
    cogoToast.error('Failed to add student! Please try again', {
      position: "top-right",
    });
  }
};




