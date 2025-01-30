const {
	StatusCodes
} =  require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(StatusCodes.CREATED).send({ task });

});


const getAllTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.status(StatusCodes.CREATED).send({ tasks });

});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req.params.taskId, req.body);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(StatusCodes.OK).send();
});

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
};
