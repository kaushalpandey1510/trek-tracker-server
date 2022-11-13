require('./models/User');
require('./models/Tracks');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const router = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://database:database@cluster0.erpgoic.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to the mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`You email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
