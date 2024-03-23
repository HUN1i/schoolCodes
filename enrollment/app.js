const express = require('express');
const http = require('http');
const app = express();
const pool = require('./model/database');
const EnrollService = require('./service/enrollService');
const dirname = __dirname + '/view';
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './view');
pool.getConnection();
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const enrollService = new EnrollService();
app.get('/', async (req, res) => {
  res.render(dirname + '/index.ejs');
});
app.get('/student_management', async (req, res) => {
  const result = await enrollService.findStudent();
  console.log(result[0]);
  res.render(dirname + '/student_management.ejs', { students: result[0] });
});

app.get('/course_management', async (req, res) => {
  const result = await enrollService.findCourse();
  res.render(dirname + '/course_management.ejs', { courses: result[0] });
});

app.get('/enrollment_management', async (req, res) => {
  const students = await enrollService.findStudent();
  const courses = await enrollService.findCourse();
  const enrollments = await enrollService.findEnroll();
  res.render(dirname + '/enrollment_management.ejs', {
    students: students[0],
    courses: courses[0],
    enrollments: enrollments[0],
  });
});

app.post('/register_enrollment', async (req, res) => {
  const enrollDto = req.body;
  await enrollService.postEnroll(enrollDto);
  setTimeout(async function () {
    res.redirect('/enrollment_management');
  }, 100);
});
app.post('/register_student', async (req, res) => {
  const regDto = req.body;
  await enrollService.postStudent(regDto);
  setTimeout(async function () {
    res.redirect('/student_management');
  }, 100);
});

app.post('/register_course', async (req, res) => {
  const regDto = req.body;
  await enrollService.postCourse(regDto);
  setTimeout(async function () {
    res.redirect('/course_management');
  }, 100);
});

app.post('/cancel_enrollment', async (req, res) => {
  const { enrollment_id } = req.body;
  await enrollService.deleteEnroll(enrollment_id);
  setTimeout(async function () {
    res.redirect('/enrollment_management');
  }, 100);
});
server.listen('3001', 'localhost', () => {
  console.log(`Server running at http://localhost:3001`);
});
