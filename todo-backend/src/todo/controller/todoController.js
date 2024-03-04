const express = require('express');
const { Todo } = require('../model');
const TodoService = require('../service/todoService');
const router = express.Router();

const todoService = new TodoService();

router.get('/', async (req, res) => {
  const results = await todoService.findAll();
  res.json(results);
});

router.post('/', async (req, res) => {
  const { todo } = req.body;
  await todoService.post(todo);
  res.send(200);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await todoService.save(id);
  res.send(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await todoService.destroy(id);
  res.send(200);
});

module.exports = router;
