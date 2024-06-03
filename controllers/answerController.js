const { Answer } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
    const { exerciseId, answer } = req.body;
    try {
        const newAnswer = await Answer.create({ exerciseId, answer });
        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { exerciseId, answer } = req.body;
  try {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await answer.update({ exerciseId, answer });
    res.json({ message: 'Answer updated successfully' });
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