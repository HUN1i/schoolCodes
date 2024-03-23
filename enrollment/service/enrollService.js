const pool = require('../model/database');

class EnrollService {
  async findStudent() {
    return await pool.query('SELECT * FROM student');
  }

  async postStudent(stuDto) {
    const { number, name, gender } = stuDto;
    return await pool.query(
      `INSERT INTO student(number, name, gender)
        SELECT * FROM (SELECT ${number}, '${name}', '${gender}') AS tmp
        WHERE NOT EXISTS (
            SELECT number FROM student WHERE number = ${number}
        ) LIMIT 1`
    );
  }

  async postEnroll(enrollDto) {
    const { student_id, course_id } = enrollDto;
    return await pool.query(`INSERT INTO enrollment(student_id, course_id)
    SELECT * FROM (SELECT ${student_id}, ${course_id}) AS tmp
    WHERE NOT EXISTS (
        SELECT * FROM enrollment WHERE student_id = ${student_id} and course_id = ${course_id}
    ) LIMIT 1`);
  }

  async postCourse(couDto) {
    const { name, professor, credit } = couDto;
    return await pool.query(
      `insert into course(name, professor, credit) values ('${name}','${professor}',${credit})`
    );
  }
  async findCourse() {
    return await pool.query('SELECT * FROM course');
  }

  async findEnroll() {
    return await pool.query(`
        SELECT enrollment.id, 
        student.number AS student_number, 
        student.name AS student_name, 
        student.gender AS student_gender, 
        course.name AS course_name, 
        course.professor AS professor, 
        course.credit AS credit
        FROM enrollment
        JOIN student ON enrollment.student_id = student.id
        JOIN course ON enrollment.course_id = course.id;
 `);
  }

  async deleteEnroll(id) {
    return await pool.query(`
    DELETE FROM enrollment WHERE id = ${id}`);
  }
}

module.exports = EnrollService;
