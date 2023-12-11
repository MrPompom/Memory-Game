// controllers/ImageController.js
const express = require('express');
const router = express.Router();
const ImageModel = require('../models/imageModel');

// Route pour obtenir toutes les images
router.get('/', async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
