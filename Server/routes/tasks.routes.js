const express = require('express');
const validate = require('../middlewares/validate');
const taslValidations = require('../validations/tasks.validation');
const taskController = require('../controllers/task.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/add',validate(taslValidations.createTask),  taskController.createTask);
router.get('/all',auth(),  taskController.getAllTasks);

router
  .route('/:taskId')
  .patch(auth(), validate(taslValidations.updateTask), taskController.updateTask)
  .delete(auth(), validate(taslValidations.deleteTask), taskController.deleteTask);


module.exports = router;