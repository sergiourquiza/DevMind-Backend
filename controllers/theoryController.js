const { Theory } = require('../models');

/**
 * Controller function to create a new theory.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
  const { moduleId, description } = req.body;
  try {
    const newTheory = await Theory.create({ moduleId, description });
    res.status(201).json(newTheory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve all theories.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const theories = await Theory.findAll();
    res.status(200).json(theories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific theory by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const theory = await Theory.findByPk(id);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    res.status(200).json(theory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific theory by its module ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getByModuleId = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const theory = await Theory.findOne({
      where: { moduleId: moduleId }
    });
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found by its module id' });
    }
    res.status(200).json(theory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to update an existing theory by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { moduleId, description } = req.body;
  try {
    const theory = await Theory.findByPk(id);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    await theory.update({ moduleId, description });
    res.status(200).json({ message: 'Theory updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to delete a theory by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const theory = await Theory.findByPk(id);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    await theory.destroy();
    res.status(200).json({ message: 'Theory deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};