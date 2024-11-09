const { Progress, Exercise, UserExercise } = require('../models');

/**
 * Controller function to retrieve all progress entries.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const progresses = await Progress.findAll();
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific progress entry by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to create or update progress using upsert.
 * This includes automatically calculating the total exercises and completed exercises by module.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.createOrUpdate = async (req, res) => {
  const { userId, moduleId } = req.body;
  try {
    const totalExercises = await Exercise.count({
      where: { moduleId }
    });

    if (totalExercises === 0) {
      return res.status(404).json({ message: 'No exercises found for this module.' });
    }

    const completedExercises = await UserExercise.count({
      where: { userId },
      include: [{ model: Exercise, where: { moduleId } }]
    });

    const progressPercentage = (completedExercises / totalExercises) * 100;

    const newProgress = await Progress.upsert({
      userId,
      moduleId,
      progressPercentage,
      updatedAt: new Date()
    });

    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to create a new progress entry.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
    const { userId, moduleId, progressPercentage } = req.body;
    try {
        const newProgress = await Progress.create({ userId, moduleId, progressPercentage });
        res.status(201).json(newProgress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Controller function to update an existing progress entry by its ID.
 * This includes recalculating the total and completed exercises by module.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { userId, moduleId } = req.body;

  try {
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const totalExercises = await Exercise.count({
      where: { moduleId }
    });

    if (totalExercises === 0) {
      return res.status(404).json({ message: 'No exercises found for this module.' });
    }

    const completedExercises = await UserExercise.count({
      where: { userId },
      include: [{ model: Exercise, where: { moduleId } }]
    });

    const progressPercentage = (completedExercises / totalExercises) * 100;

    await progress.update({ userId, moduleId, progressPercentage });
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to delete a progress entry by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    await progress.destroy();
    res.json({ message: 'Progress deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Endpoint para obtener el progreso de un usuario en un módulo específico.
 * @param {object} req - El objeto de solicitud.
 * @param {object} res - El objeto de respuesta.
 */
exports.getUserProgressInModule = async (req, res) => {
  const { userId, moduleId } = req.params;
  console.log('Received request for userId:', userId, 'moduleId:', moduleId); 
  try {
    const progress = await Progress.findOne({
      where: { userId, moduleId },
    });

    if (!progress) {
      console.log('No progress found for these parameters'); 
      return res.status(404).json({ 
        message: 'Progress not found for the specified module and user.',
        userId,
        moduleId 
      });
    }
    console.log('Found progress:', progress); 
    res.json(progress);
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: error.message });
  }
};
