const express = require('express');
const axios = require('axios');

const app = express();
const TOKEN = process.env.BOT_TOKEN || 'توکن_تلگرام_تو';

app.get('/getUpdates', async (req, res) => {
  try {
    const r = await axios.get(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    res.json(r.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get('/sendMessage', async (req, res) => {
  const chat_id = req.query.chat_id;
  const msg = req.query.msg || '';
  if (!chat_id) return res.status(400).send('chat_id missing');
  try {
    const r = await axios.get(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      params: { chat_id, text: msg }
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
