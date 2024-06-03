const { Exercise } = require('../models');

// Crear un nuevo ejercicio
exports.create = async (req, res) => {
  const { moduleId, difficultyId, description } = req.body;
  try {
    const newExercise = await Exercise.create({ moduleId, difficultyId, description });
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los ejercicios
exports.getAll = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

// Obtener un ejercicio por ID
exports.getById = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un ejercicio por ID
exports.update = async (req, res) => {
  const { exerciseId } = req.params;
  const { moduleId, difficultyId, description } = req.body;
  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.update({ moduleId, difficultyId, description });
    res.status(200).json({ message: 'Exercise updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un ejercicio por ID
exports.delete = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.destroy();
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
