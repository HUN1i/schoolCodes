// const { Todo } = require('../model');

const pool = require('../model/database');

class BlogService {
  findAll() {
    const result = pool.query('select * from blog');
    return result;
  }
  findOne(id) {
    const result = pool.query(`select * from blog where id = ${id}`);
    return result;
  }

  save(id, data) {
    pool.query(
      `UPDATE blog SET title = '${data.title}', author = '${data.author}', content ='${data.content}' WHERE id = ${id} `
    );
    return;
  }
  post(blog) {
    pool.query(
      `INSERT INTO blog (title, content, author, date) VALUES ('${blog.title}','${blog.content}', '${blog.author}', now())`
    );

    return;
  }
  destroy(id) {
    pool.query(`DELETE FROM blog WHERE id = ${id}`);
    return;
  }
}

module.exports = BlogService;
