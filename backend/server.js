require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Model
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date },
  duration: { type: Number } // in Sekunden
});
const Session = mongoose.model('Session', sessionSchema);

// Tracking: Start
app.post('/api/track/start', async (req, res) => {
  try {
    const sessionId = uuidv4();
    const startedAt = new Date();
    await Session.create({ sessionId, startedAt });
    res.json({ sessionId });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Starten der Session.' });
  }
});

// Tracking: End
app.post('/api/track/end', async (req, res) => {
  try {
    const { sessionId, duration } = req.body;
    const endedAt = new Date();
    await Session.findOneAndUpdate(
      { sessionId },
      { endedAt, duration },
      { new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Beenden der Session.' });
  }
});

// Statistiken
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Session.countDocuments();
    const finished = await Session.find({ duration: { $exists: true } });
    const avgDuration = finished.length
      ? finished.reduce((sum, s) => sum + (s.duration || 0), 0) / finished.length
      : 0;
    res.json({ total, avgDuration });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Statistik.' });
  }
});

// PDF direct download redirect
app.get('/api/pdf', (req, res) => {
  const directLink = 'https://link.storjshare.io/raw/jwmzhtx6kerqip2yxwltyd3aeg7q/aaa/Llebenslauf_Ehinger_252.pdf';
  res.redirect(302, directLink);
});

// MongoDB Connect & Server Start
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB-Verbindung fehlgeschlagen:', err);
  });