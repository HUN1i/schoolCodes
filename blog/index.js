const express = require('express');
const http = require('http');
const app = express();
const pool = require('./model/database');
const BlogService = require('./service/blogService');
const dirname = __dirname + '/views';
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
pool.getConnection();
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

const blogService = new BlogService();

app.get('/', async function (req, res) {
  const data = await blogService.findAll();
  res.render(dirname + '/', { posts: data[0] });
});

app.get('/new_post', function (req, res) {
  res.render(dirname + '/create');
});

app.get('/update/:id', async function (req, res) {
  const { id } = req.params;
  const data = await blogService.findOne(id);
  res.render(dirname + '/update', { post: data[0][0] });
});

app.post('/create', async (req, res) => {
  blogService.post(req.body);
  setTimeout(function () {
    res.redirect('/');
  }, 100);
});

app.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  blogService.save(id, data);
  setTimeout(function () {
    res.redirect('/');
  }, 100);
});

app.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  blogService.destroy(id);
  setTimeout(function () {
    res.redirect('/');
  }, 100);
});

server.listen('3001', 'localhost', () => {
  console.log(`Server running at http://localhost:3001`);
});
