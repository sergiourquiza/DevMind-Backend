const { Exercise, sequelize } = require('../models');

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
 * Controller function to retrieve an specific exercises by its difficultyID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getByDifficultyId = async (req, res) => {
  const { difficultyId } = req.params;
  try {
    const exercises = await Exercise.findAll({
      where: { difficultyId: difficultyId },
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
 * Controller function to create a new exercise.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
  const { moduleId, difficultyId, description, requiresInput } = req.body;
  try {
    const newExercise = await Exercise.create({ moduleId, difficultyId, description, requiresInput });
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
  const { moduleId, difficultyId, description, requiresInput } = req.body;
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.update({ moduleId, difficultyId, description, requiresInput });
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