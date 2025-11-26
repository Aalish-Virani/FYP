import express from 'express';
import multer from 'multer';
import { join, extname } from 'path';
import { mkdirSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import whisper from 'whisper-node';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const port = process.env.PORT || 5000;
const tempDir = process.env.TEMP_DIR || join(__dirname, 'temp');

// Create temp dir if not exists
mkdirSync(tempDir, { recursive: true });

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow frontend origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${extname(file.originalname)}`),
});
const upload = multer({ storage });

// Transcription Endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  const { mode } = req.body; // 'custom', 'whisper', 'gemini'
  const audioPath = req.file?.path;

  if (!audioPath || !mode) {
    return res.status(400).json({ error: 'Missing audio file or mode' });
  }

  try {
    let rawTranscription = '';
    let predictedTranscription = '';

    switch (mode) {
      case 'custom':
        // Offline Whisper via whisper-node (multilingual model for Urdu)
        const options = {
          modelName: 'small', // Multilingual model (supports Urdu)
          whisperOptions: {
            language: 'ur', // Urdu
            word_timestamps: true,
          },
        };
        const transcript = await whisper(audioPath, options);
        rawTranscription = transcript.map(segment => segment.speech).join(' ');
        predictedTranscription = rawTranscription; // Placeholder; add prediction logic if needed
        break;

      case 'whisper':
        // Online OpenAI Whisper API
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const fileBuffer = readFileSync(audioPath);
        const file = new File([fileBuffer], 'audio.webm', { type: 'audio/webm' });
        const response = await openai.audio.transcriptions.create({
          file,
          model: 'whisper-1',
          language: 'ur', // Urdu
          prompt: 'This is an Urdu conversation with potential audio distortions.',
        });
        rawTranscription = response.text;
        predictedTranscription = rawTranscription;
        break;

      case 'gemini':
        // Online Google Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // For small files: Inline base64
        const base64Audio = readFileSync(audioPath, { encoding: 'base64' });
        const contents = [
          { text: 'Generate a transcript in Urdu script of this Urdu audio, handling any distortions or missing parts by predicting likely words.' },
          {
            inlineData: {
              mimeType: req.file.mimetype || 'audio/webm',
              data: base64Audio,
            },
          },
        ];

        const geminiResponse = await model.generateContent(contents);
        rawTranscription = geminiResponse.response.text();
        predictedTranscription = rawTranscription;
        break;

      default:
        throw new Error('Invalid mode');
    }

    res.json({
      rawTranscription,
      predictedTranscription,
      // audioUrl not returned; handle in frontend if needed
    });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  } finally {
    // Cleanup temp file
    if (audioPath) unlinkSync(audioPath);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});