const express = require('express');
const BlogService = require('../service/blogService');
const router = express.Router();

const blogService = new BlogService();

router.get('/', async (req, res) => {
  const results = await blogService.findAll();
  res.json(results[0]);
});

router.post('/', async (req, res) => {
  await blogService.post(req.body);
  res.send(200);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await blogService.save(id);
  res.send(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await blogService.destroy(id);
  res.send(200);
});

module.exports = router;
