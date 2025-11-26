import { useState, useEffect } from 'react';
import { ProcessingResult } from './ProcessingScreen';
import { toast } from 'sonner@2.0.3';

interface WhisperTranscriptionProps {
  audioBlob: Blob | null;
  onComplete: (result: ProcessingResult) => void;
  onProgress: (progress: number) => void;
}

export function WhisperTranscriptionService({ audioBlob, onComplete, onProgress }: WhisperTranscriptionProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!audioBlob) return;

    const transcribeAudio = async () => {
      setIsProcessing(true);
      try {
        // Convert Blob to File for API
        const audioFile = new File([audioBlob], 'audio.webm', { type: audioBlob.type });

        // Prepare form data for API request
        const formData = new FormData();
        formData.append('file', audioFile);
        formData.append('model', 'whisper-1');
        formData.append('language', 'ur'); // Set language to Urdu
        formData.append('prompt', 'This is an Urdu conversation with potential audio distortions.');

        // Simulate progress updates (since Whisper API doesn't provide real-time progress)
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress = Math.min(progress + 10, 90);
          onProgress(progress);
        }, 500);

        // Make API call to your server endpoint
        const response = await fetch('/api/whisper-transcribe', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Securely handled server-side
          },
        });

        if (!response.ok) {
          throw new Error('Whisper API request failed');
        }

        const result = await response.json();
        clearInterval(progressInterval);
        onProgress(100);

        // Process Whisper result
        const rawTranscription = result.text;
        const predictedTranscription = rawTranscription; // Whisper provides a single transcription; no separate prediction needed

        onComplete({
          rawTranscription,
          predictedTranscription,
          audioUrl: URL.createObjectURL(audioBlob),
        });

        toast.success('Transcription completed successfully!');
      } catch (error) {
        console.error('Whisper transcription error:', error);
        toast.error('Failed to transcribe audio. Please try again.');
        onComplete({
          rawTranscription: '',
          predictedTranscription: '',
          audioUrl: undefined,
        });
      } finally {
        setIsProcessing(false);
      }
    };

    transcribeAudio();

    return () => {
      // Cleanup if component unmounts
    };
  }, [audioBlob, onComplete, onProgress]);

  return null; // This is a service component, no UI
}