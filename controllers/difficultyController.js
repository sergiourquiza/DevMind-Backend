const { Difficulty } = require('../models');

/**
 * Controller function to retrieve all difficulties.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const difficulties = await Difficulty.findAll();
    res.json(difficulties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific difficulty by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
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

/**
 * Controller function to create a new difficulty.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        const newDifficulty = await Difficulty.create({ name });
        res.status(201).json(newDifficulty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Controller function to update an existing difficulty by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
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

/**
 * Controller function to delete a difficulty by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
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