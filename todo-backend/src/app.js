const express = require('express');
const app = express();
const port = 3001;
const main = require('./todo/controller/todoController');
const db = require('./todo/model');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/todo', main);

db.sequelize.sync().then(() => {
  console.log('db 연결 성공 ');
});

app.listen(port, () => {
  console.log(`listening  at http://localhost:${port}`);
});
