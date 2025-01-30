const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

/**
 * Create a task
 * @param {Object} payload
 * @returns {Promise<Task>}
 */
const createTask = async (payload) => {
  return prisma.task.create({
    data: payload,
  });
};

/**
 * Get all tasks
 * @param {Object} payload
 * @returns {Promise<Task[]>}
 */
const getAllTasks = async (payload) => {
  return prisma.task.findMany();
};

/**
 * Get task by id
 * @param {string} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Update task by id
 * @param {string} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: updateBody,
  });
  return updatedTask;
};

/**
 * Delete task by id
 * @param {string} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  await prisma.task.delete({
    where: { id: taskId },
  });
  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTaskById,
  updateTaskById,
};
