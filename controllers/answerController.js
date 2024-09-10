const { Answer } = require('../models');

/**
 * Controller function to retrieve all answers.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to retrieve a specific answer by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller function to create a new answer.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
    const { exerciseId, inputId, answer } = req.body;
    try {
        const newAnswer = await Answer.create({ exerciseId, inputId, answer });
        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Controller function to update an existing answer by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { exerciseId, inputId, answer } = req.body;
  try {
    const existingAnswer = await Answer.findByPk(id);
    if (!existingAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await existingAnswer.update({ exerciseId, inputId, answer });
    res.json({ message: 'Answer updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller function to delete an answer by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await answer.destroy();
    res.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};