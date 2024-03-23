const EnrollService = require('../service/enrollService');
const express = require('express');
const router = express.Router();

const enrollService = new EnrollService();

router.get('/', async (req, res) => {
  res.render(dirname + '/index.ejs');
});

router.get('/student_management', async (req, res) => {
  const result = await enrollService.findStudent();
  console.log(result[0]);
  res.render(dirname + '/student_management.ejs', { students: result[0] });
});

router.get('/course_management', async (req, res) => {
  const result = await enrollService.findCourse();
  res.render(dirname + '/course_management.ejs', { courses: result[0] });
});

router.get('/enrollment_management', async (req, res) => {
  const students = await enrollService.findStudent();
  const courses = await enrollService.findCourse();
  const enrollments = await enrollService.findEnroll();
  res.render(dirname + '/enrollment_management.ejs', {
    students: students[0],
    courses: courses[0],
    enrollments: enrollments[0],
  });
});

router.post('/register_enrollment', async (req, res) => {
  const enrollDto = req.body;
  await enrollService.postEnroll(enrollDto);
  setTimeout(async function () {
    res.redirect('/');
  }, 100);
});
router.post('/register_student', async (req, res) => {
  const regDto = req.body;
  await enrollService.postStudent(regDto);
  setTimeout(async function () {
    res.redirect('/student_management');
  }, 100);
});

router.post('/register_course', async (req, res) => {
  const regDto = req.body;
  await enrollService.postCourse(regDto);
  setTimeout(async function () {
    res.redirect('/course_management');
  }, 100);
});

router.post('/cancel_enrollment', async (req, res) => {
  const { enrollment_id } = req.body;
  await enrollService.deleteEnroll(enrollment_id);
  setTimeout(async function () {
    res.redirect('/enrollment_management');
  }, 100);
});

module.exports = router;
