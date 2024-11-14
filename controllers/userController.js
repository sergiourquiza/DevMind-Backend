const { User } = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Retrieves all users from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a user by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Creates a new user with encrypted password and checks if the user already exists based on email or username.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.create = async (req, res) => {
  const { googleId, fullName, username, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email },
          ...(googleId ? [{ googleId }] : []) // Solo buscar por googleId si existe
        ] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'The user already exists' });
    }

    // Crear objeto con datos base del usuario
    const userData = {
      googleId,
      fullName,
      username,
      email
    };

    // Solo agregar phoneNumber si no está vacío
    if (phoneNumber && phoneNumber.trim() !== '') {
      userData.phoneNumber = phoneNumber;
    }

    // Solo agregar password hasheado si se proporciona uno
    if (password) {
      userData.password = bcrypt.hashSync(password, 10);
    }

    const newUser = await User.create(userData);
    
    // Excluir el password de la respuesta
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
    
  } catch (error) {
    console.error('Error en create:', error); // Para depuración en el servidor
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};



/**
 * Update a user by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, phoneNumber, email, password } = req.body; // Agregamos 'email'
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Crear objeto con los datos a actualizar, incluyendo 'email'
    const updateData = {
      fullName,
      username,
      phoneNumber,
      email, // Incluir email
    };

    // Solo actualizar el password si se proporciona uno nuevo
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    await user.update(updateData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Updates the password of a user by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body; // Cambiar a newPassword
  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.update({ password: hashedPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Deletes a user account from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves the authenticated user's profile.
 * @param {object} req - The request object (must contain the authenticated user).
 * @param {object} res - The response object.
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.toJSON();

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
