const { UserExercise } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const userExercises = await UserExercise.findAll();
    res.json(userExercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.create = async (req, res) => {
    const { userId, exerciseId } = req.body;
    try {
        const newUserExercise = await UserExercise.create({ userId, exerciseId });
        res.status(201).json(newUserExercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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