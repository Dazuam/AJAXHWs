const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.deleteTask = (req, res) => {
  Task.delete(req.body.id).then(() => {
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
          res.json(req.body.id);
          console.log('Task with id: ', req.body.id, ' deleted');
      } else {
          res.redirect('/');
      }

  });
}