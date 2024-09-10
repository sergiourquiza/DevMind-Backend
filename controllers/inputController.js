const { Input } = require('../models');

/**
 * Controller function to retrieve all inputs.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const inputs = await Input.findAll();
    res.json(inputs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific input by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const input = await Input.findByPk(id);
    if (!input) {
      return res.status(404).json({ message: 'Input not found' });
    }
    res.json(input);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to create a new input.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
    const { exerciseId, input } = req.body;
    try {
        const newInput = await Input.create({ exerciseId, input });
        res.status(201).json(newInput);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Controller function to update an existing input by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { exerciseId, input } = req.body;
  try {
    const existingInput = await Input.findByPk(id);
    if (!existingInput) {
      return res.status(404).json({ message: 'Input not found' });
    }
    await existingInput.update({ exerciseId, input });
    res.json({ message: 'Input updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to delete an input by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const input = await Input.findByPk(id);
    if (!input) {
      return res.status(404).json({ message: 'Input not found' });
    }
    await input.destroy();
    res.json({ message: 'Input deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};