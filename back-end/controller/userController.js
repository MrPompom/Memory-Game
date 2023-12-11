// controllers/UserController.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Route pour s'inscrire (créer un nouvel utilisateur)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.json({ user: savedUser, message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour se connecter
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.json({ user, message: 'Connexion réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
