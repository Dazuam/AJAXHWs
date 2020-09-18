const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.post('/tasksDelete', tasksController.deleteTask);

router.put('/done', tasksController.done);

module.exports = router;
