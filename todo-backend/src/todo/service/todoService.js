const { Todo } = require('../model');

class TodoService {
  async findAll() {
    return await Todo.findAll();
  }

  async save(id) {
    const result = await Todo.findOne({ where: { id } });
    result.complete = 'true';
    await result.save();
    return;
  }
  async post(todo) {
    await Todo.create({ todo, complete: 'false' });
    return;
  }
  async destroy(id) {
    await Todo.destroy({ where: { id } });
    return;
  }
}

module.exports = TodoService;
