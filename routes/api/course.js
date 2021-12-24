const express = require("express");
const router = express.Router();
require('dotenv').config();



const User = require("../../models/User");
const Student = require("../../models/Student");
const Course = require("../../models/Course");

router.post("/create-course", async (req, res) => {
  const student = req.body.student;
  const user = await User.findById(req.body.faculty);

  Course.findOne({ course_title: req.body.title }).then(course => {
    if (course) {
      return res.status(400).json({ course: "Course already exists" });
    } else {
      const newCourse = new Course({
        course_title: req.body.title,
        section: req.body.section,
        noOfStudents: req.body.noOfStudents,
        faculty: req.body.faculty
      });

      try {
        newCourse.save();
        Student.insertMany(student, (err, res) => {
          if (err) throw err;
        });
        user.courses.push(newCourse);
        user.save();

        res.sendStatus(200);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
});

router.post("/upload-quiz-marks", async (req, res) => {
  const marks = req.body.Quiz;
  const course = req.body.course_title;
  const section = req.body.section;
  
  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if(student) {
      const newQuiz = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.quizes.push(newQuiz);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/upload-assignment-marks", async (req, res) => {
  const marks = req.body.Assignment;
  const course = req.body.course_title;
  const section = req.body.section;
  
  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if(student) {
      const newAssignment = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.assignments.push(newAssignment);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-project-marks", async (req, res) => {
  const marks = req.body.Project;
  const course = req.body.course_title;
  const section = req.body.section;
  
  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if(student) {
      const newProject = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.project.push(newProject);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-midterm-marks", async (req, res) => {
  const marks = req.body.Midterm;
  const course = req.body.course_title;
  const section = req.body.section;
  
  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if(student) {
      const newMidterm = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.midterm.push(newMidterm);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-final-marks", async (req, res) => {
  const marks = req.body.Final;
  const course = req.body.course_title;
  const section = req.body.section;
  
  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if(student) {
      const newFinal = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.final.push(newFinal);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get("/get-courses/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.courses);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-quiz-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.body.faculty, section: req.body.section, course: req.body.course });
    const course = await Course.findOne({ course_title: req.body.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }
    let quizes = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        quizes: students[i].quizes
      }
      quizes.push(data)
    }
    if (quizes.length < 1) {
      res.json("No quiz data found for this course!")
    }
    res.json(quizes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-assignment-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.body.faculty, section: req.body.section, course: req.body.course });
    const course = await Course.findOne({ course_title: req.body.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let assignments = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        assignments: students[i].assignments
      }
      assignments.push(data)
    }
    if (assignments.length < 1) {
      res.json("No assignment data found for this course or assignment marks has not been uploded yet!")
    }
    res.json(assignments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-project-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.body.faculty, section: req.body.section, course: req.body.course });
    const course = await Course.findOne({ course_title: req.body.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let project = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        project: students[i].project
      }
      project.push(data)
    }
    if (project.length < 1) {
      res.json("No project data found for this course or project marks has not been uploaded yet!")
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-midterm-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.body.faculty, section: req.body.section, course: req.body.course });
    const course = await Course.findOne({ course_title: req.body.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let midterm = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        midterm: students[i].midterm
      }
      midterm.push(data)
    }
    if (midterm.length < 1) {
      res.json("No midterm data found for this course or midterm marks has not been uploaded yet!")
    }
    res.json(midterm);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-final-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.body.faculty, section: req.body.section, course: req.body.course });
    const course = await Course.findOne({ course_title: req.body.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let final = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        final: students[i].final
      }
      final.push(data)
    }
    if (final.length < 1) {
      res.json("No final exam data found for this course or final exam marks has not been uploaded yet!")
    }
    res.json(final);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.put("/update-quiz-data", async (req, res) => {
  const students = req.body.student;
  const index = 1;

  for (let i = 1; i < students.length; i++) {
    const student = await Student.findOne({id: students[i].id});
    if(student) {
      student.updateOne({ $set: { [`quizes.${index}.title`]: 'Quiz2' }}).exec();
    }
    
  
  }
})






module.exports = router;
