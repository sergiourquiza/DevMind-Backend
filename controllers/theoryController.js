const Theory = require('../models/Theory');

// Crear una nueva teoría
exports.create = async (req, res) => {
  const {moduleId,description} = req.body;
  try {
    const newTheory = await Theory.create({ moduleId,description });
    res.status(201).json(newTheory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las teorías
exports.findAll = async (req, res) => {
  try {
    const theories = await Theory.findAll();
    res.status(200).json(theories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una teoría por ID
exports.findOne = async (req, res) => {
  const { theoryId } = req.params;
  try {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    res.status(200).json(theory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una teoría por ID
exports.update = async (req, res) => {
  const { theoryId } = req.params;
  const { moduleId,description } = req.body;
  try {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    await theory.update({ moduleId,description });
    res.status(200).json({ message: 'Theory updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una teoría por ID
exports.delete = async (req, res) => {
  const { theoryId } = req.params;
  try {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) {
      return res.status(404).json({ message: 'Theory not found' });
    }
    await theory.destroy();
    res.status(200).json({ message: 'Theory deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
