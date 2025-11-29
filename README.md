# Audio Call Transcription with Intelligent Gap Filling

## Demo

[![Demo Short Video](https://img.youtube.com/vi/CKvAdDEQiuI/maxresdefault.jpg)](https://youtube.com/shorts/CKvAdDEQiuI)

## Overview

This project is a Final Year Project (FYP) developed as part of Bachelors Degree in Computer Systems Engineering at Mehran University of Engineering & Technology, Jamshoro.
The system addresses the challenge of poor audio quality in Urdu phone calls, common in Pakistan due to network issues, signal drops, and background noise. 
It uses AI to transcribe Urdu audio calls and intelligently fill in missing or distorted segments, ensuring clear and complete communication.

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) for a user-friendly web interface. It integrates advanced AI models:
- Fine-tuned OpenAI Whisper - for Urdu speech-to-text transcription.
- Bi-directional LSTM (Bi-LSTM) - for next-word prediction to restore missing words based on context.

Key datasets used:
- Mozilla Common Voice Urdu Dataset (for ASR fine-tuning).
- Custom Urdu Call Conversation Corpus (~90,000 words, created by simulating real-life call scenarios).

The project aligns with Sustainable Development Goals (SDGs) by improving communication in education, healthcare, business, and emergency services.

## Features

-  Audio Upload and Processing : Users can upload recorded audio calls (e.g., .wav, .mp3) via the web interface.
-  Frequency Analysis : Detects defective audio segments (e.g., voice dropouts, distortion, or loud background noise) using spectrogram and signal energy analysis.
-  Raw Transcription : Generates an initial Urdu transcription with placeholders for missing segments using fine-tuned OpenAI Whisper.
-  Intelligent Gap Filling : Predicts and restores missing words/phrases using a trained Bi-LSTM model, ensuring semantic coherence.
-  Enhanced Transcription View : Displays raw and AI-enhanced transcripts side-by-side, with predicted words highlighted.
-  Real-time Feedback : Visual indicators for processing stages, including spectrograms for defective segments.
-  User Authentication : Secure login for storing and retrieving past transcriptions (stored in MongoDB).
-  Export Options : Download transcripts as text or PDF.

## Technologies Used

-  Frontend : React.js (with hooks, state management via Redux/Context API), TailwindCSS and Framer Motion for styling.
-  Backend : Node.js with Express.js for API endpoints.
-  Database : MongoDB for storing user data, transcripts, and custom datasets.
-  AI/ML Libraries :
  - OpenAI Whisper (fine-tuned for Urdu).
  - Python integration for Bi-LSTM model.
  - Librosa for audio processing and frequency analysis.
-  Other Tools : Git for version control, Docker for containerization.

## Project Workflow

The system follows a hybrid deep-learning pipeline to process audio from upload to final transcription. Below is the complete workflow:

### 1.  User Interaction (Frontend - React.js) 
   - Uploads audio file via a drag-and-drop interface or file picker.
   - Frontend sends the audio file to the backend API endpoint (`/api/process-audio`) using FormData or Axios.

### 2.  Data Acquisition and Preparation (Backend - Node.js/Express) 
   - Receive audio file and store temporarily.
   - If needed, convert audio format (e.g., using FFmpeg).
   - Load datasets (Mozilla Common Voice for ASR, Custom Corpus for NWP) from MongoDB or local files.
   - Preprocess audio: Normalize volume, apply noise reduction filters if applicable.

### 3.  Audio Diagnosis (Frequency Analysis) 
   - Use Librosa to generate waveform and spectrogram.
   - Perform Short-Time Fourier Transform (STFT) to analyze frequency bands (e.g., 300-3000 Hz for speech).
   - Detect anomalies:
     -  Voice Dropouts : Flat gaps or sudden dips in spectral density.
     -  Distortion/Jitter : Irregular patterns or high-frequency bursts.
     -  Background Noise : Overlapping energy in high frequencies (>3500 Hz).
   - Output: Time-stamped list of Suspect Audio Segments (SAS) where words are likely missing.
   - Log results and visualize spectrograms (sent back to frontend for display).

### 4.  Base Transcription (Speech-to-Text) 
   - Segment audio into clear and unclear chunks based on SAS.
   - Feed clear segments to fine-tuned OpenAI Whisper model (integrated via Python subprocess or API call).
   - Generate raw Urdu transcription with placeholders like `[missing]` for defective segments.

### 5.  Intelligent Gap Filling (Next Word Prediction) 
   - Extract context around each `[missing]` placeholder (preceding and following words).
   - Use trained Bi-LSTM model:
     - Input: Tokenized context (preprocessed with stemming/tokenization).
     - Model predicts semantically fitting words/phrases based on custom conversational corpus.
     - Training details: 60 epochs on ~ 90,000-word corpus, achieving high accuracy (85%).
   - Integrate predictions into the raw transcript to create an enhanced version.
   - Highlight predicted words (e.g., in green) for transparency.

### 6.  System Integration and Output (Frontend/Backend) 
   - Backend returns processed results: Raw transcript, enhanced transcript, spectrograms, and logs.
   - Frontend displays:
     - Audio player with highlighted SAS timestamps.
     - Side-by-side views: Raw vs. AI-Enhanced Transcription.
     - Download buttons for export.
   - Store final transcript in MongoDB for user history.

### 7.  Error Handling and Optimization 
   - Handle edge cases: Non-Urdu audio, very short files, or excessive noise.
   - Optimize for performance: Process in batches, use caching for model inferences.
   - Logging: Track errors, processing time, and accuracy metrics.

### Architecture Diagram
```mermaid
flowchart TD
    A[User Uploads Audio] --> B[Frontend: React.js]
    B --> C[Backend API: Express.js]
    C --> D[Audio Preprocessing: Librosa/FFmpeg]
    D --> E[Frequency Analysis: Detect SAS]
    E --> F[Speech-to-Text: Fine-tuned Whisper]
    F --> G[Next Word Prediction: Bi-LSTM]
    G --> H[Generate Enhanced Transcript]
    H --> I[Store in MongoDB]
    I --> J[Return to Frontend: Display Results]
