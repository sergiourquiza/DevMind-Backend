const { User } = require('../models');
const bcrypt = require('bcryptjs');

//LLamar todos los usuarios
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener un usuario por su id
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'No encontramos el usuario' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear un usuario con contraseña encriptada y verificar si el usuario ya existe
exports.create = async (req, res) => {
    const { username, email, password, googleId } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    try {
      // Verificar si el usuario ya existe por email o username
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ingresado ya existe' });
      }
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        googleId
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Acutualizar contraseña
    exports.update = async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.update({ password: hashedPassword });
        res.json({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    };

    //Eliminar cuenta de usuario 
    exports.delete = async (req, res) => {
        const { id } = req.params;
        try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado satisfactoriamente de la base de datos' });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    };
