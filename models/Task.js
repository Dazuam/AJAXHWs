const knex = require('../database/connection');

exports.PENDING = 'pending';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id', id)
    .first();
}

exports.delete = (id) => {
  return knex
      .select('*')
      .from('tasks')
      .where('id', id)
      .first().del()
}

exports.update = (id) => {
  return knex('tasks')
          .update('status', 'done')
          .update('updated_at', knex.fn.now())
          .where('id', id)
}