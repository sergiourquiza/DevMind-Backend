const { Difficulty } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const difficulties = await Difficulty.findAll();
    res.json(difficulties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const difficulty = await Difficulty.findByPk(id);
    if (!difficulty) {
      return res.status(404).json({ message: 'Difficulty not found' });
    }
    res.json(difficulty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
    const { name } = req.body;
    console.log("NOMBRE: ", req.body.name);
    try {
        const newDifficulty = await Difficulty.create({ name });
        res.status(201).json(newDifficulty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const difficulty = await Difficulty.findByPk(id);
    if (!difficulty) {
      return res.status(404).json({ message: 'Difficulty not found' });
    }
    await difficulty.update({ name });
    res.json({ message: 'Difficulty updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const difficulty = await Difficulty.findByPk(id);
    if (!difficulty) {
      return res.status(404).json({ message: 'Difficulty not found' });
    }
    await difficulty.destroy();
    res.json({ message: 'Difficulty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};