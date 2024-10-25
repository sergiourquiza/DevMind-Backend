const { UserExercise } = require('../models');

/**
 * Get all user exercises.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing all user exercises.
 */
exports.getAll = async (req, res) => {
  try {
    const userExercises = await UserExercise.findAll();
    res.json(userExercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a user exercise by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing the user exercise.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const userExercise = await UserExercise.findByPk(id);
    if (!userExercise) {
      return res.status(404).json({ message: 'User exercise not found' });
    }
    res.json(userExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create or update a user exercise entry using upsert.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing the newly created or updated user exercise.
 */
exports.createOrUpdate = async (req, res) => {
  const { userId, exerciseId } = req.body;
  try {
    const [newUserExercise, created] = await UserExercise.upsert({
      userId,
      exerciseId,
      updatedAt: new Date()
    });

    res.status(201).json(newUserExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Create a new user exercise.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing the newly created user exercise.
 */
exports.create = async (req, res) => {
  const { userId, exerciseId } = req.body;
  try {
    const newUserExercise = await UserExercise.create({ userId, exerciseId });
    res.status(201).json(newUserExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update a user exercise by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response confirming the update.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { userId, exerciseId } = req.body;
  try {
    const userExercise = await UserExercise.findByPk(id);
    if (!userExercise) {
      return res.status(404).json({ message: 'User exercise not found' });
    }
    await userExercise.update({ userId, exerciseId });
    res.json({ message: 'User exercise updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a user exercise by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response confirming the deletion.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const userExercise = await UserExercise.findByPk(id);
    if (!userExercise) {
      return res.status(404).json({ message: 'User exercise not found' });
    }
    await userExercise.destroy();
    res.json({ message: 'User exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete all user exercises for a specific user, module, and difficulty level.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response confirming the deletion.
 */
exports.deleteByLevel = async (req, res) => {
  const { userId, moduleId, difficultyId } = req.body;
  
  try {
    const exercises = await Exercise.findAll({
      where: {
        moduleId,
        difficultyId,
      },
    });

    if (exercises.length === 0) {
      return res.status(404).json({ message: 'No exercises found for this module and difficulty level' });
    }

    const exerciseIds = exercises.map(exercise => exercise.id);

    const userExercises = await UserExercise.findAll({
      where: {
        userId,
        exerciseId: exerciseIds,
      },
    });

    if (userExercises.length === 0) {
      return res.status(404).json({ message: 'No user exercises found for this user and level' });
    }

    await Promise.all(userExercises.map(userExercise => userExercise.destroy()));

    res.json({ message: 'All user exercises for the level deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};