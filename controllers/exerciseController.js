const { Exercise, UserExercise, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * Controller function to retrieve all exercises.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

/**
 * Controller function to retrieve a specific exercise by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve an specific exercises by its moduleID and difficultyID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getByModuleIdAndDifficultyId = async (req, res) => {
  const { moduleId, difficultyId } = req.params;
  try {
    const exercises = await Exercise.findAll({
      where: { moduleId: moduleId, difficultyId: difficultyId },
      order: sequelize.random()
    });
    if (!exercises) {
      return res.status(404).json({ message: 'No exercises found' });
    }
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve pending exercises for a user by moduleId and difficultyId.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getPendingExercises = async (req, res) => {
  const { userId, moduleId, difficultyId } = req.params;
  
  try {
    const completedExercises = await UserExercise.findAll({
      where: { userId: userId },
      attributes: ['exerciseId'],
    });
    
    const completedExerciseIds = completedExercises.map(e => e.exerciseId);
    
    const incompleteExercises = await Exercise.findAll({
      where: {
        moduleId: moduleId,
        difficultyId: difficultyId,
        id: {
          [Op.notIn]: completedExerciseIds
        }
      },
    });

    res.status(200).json(incompleteExercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to create a new exercise.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
  const { moduleId, difficultyId, description, requiresInput, codeType, functionName } = req.body;
  try {
    const newExercise = await Exercise.create({ moduleId, difficultyId, description, requiresInput, codeType, functionName });
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to update an existing exercise by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { moduleId, difficultyId, description, requiresInput, codeType, functionName } = req.body;
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.update({ moduleId, difficultyId, description, requiresInput, codeType, functionName });
    res.status(200).json({ message: 'Exercise updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to delete an exercise by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.destroy();
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};