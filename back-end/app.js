// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controller/userController');
const imageRoutes = require('./controller/imageController');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Connecter à MongoDB (assurez-vous d'avoir un serveur MongoDB en cours d'exécution)
mongoose.connect('mongodb://localhost:27017/memory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Utilisation des routes
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur votre backend Express.js avec MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
