const express = require('express');
const axios = require('axios');

const app = express();

// Bot token can be set as an environment variable or hardcoded (not recommended for production)
const TOKEN = process.env.BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE';

// Endpoint for retrieving Telegram bot updates
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Endpoint for sending a message to a Telegram chat
app.get('/sendMessage', async (req, res) => {
  const chat_id = req.query.chat_id;
  const msg = req.query.msg || '';

  if (!chat_id) {
    return res.status(400).send('Error: chat_id parameter is required');
  }

  try {
    const response = await axios.get(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      params: { chat_id, text: msg }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Dynamic port binding for deployment environments (Render, Heroku, etc.)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Telegram bridge server running on port ${port}`);
});
