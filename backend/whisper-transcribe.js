const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();

router.post('/whisper-transcribe', async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.files.file.data, {
      filename: req.files.file.name,
      contentType: req.files.file.mimetype,
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'ur');
    formData.append('prompt', 'This is an Urdu conversation with potential audio distortions.');

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Whisper API error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

module.exports = router;