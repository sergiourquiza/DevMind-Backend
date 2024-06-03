const { Progress } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const progresses = await Progress.findAll();
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.create = async (req, res) => {
    const { userId, moduleId, progressPercentage } = req.body;
    try {
        const newProgress = await Progress.create({ userId, moduleId, progressPercentage });
        res.status(201).json(newProgress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { userId, moduleId, progressPercentage } = req.body;
  try {
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    await progress.update({ userId, moduleId, progressPercentage });
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await Module.findByPk(id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    await progress.destroy();
    res.json({ message: 'Progress deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};