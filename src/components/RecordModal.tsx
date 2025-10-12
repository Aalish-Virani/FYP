import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Trash2, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface RecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecordComplete: (blob: Blob) => void;
}

export function RecordModal({ open, onOpenChange, onRecordComplete }: RecordModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      toast.error('Could not access microphone');
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleDiscard = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];
  };

  const handleContinue = () => {
    if (audioBlob) {
      onRecordComplete(audioBlob);
      onOpenChange(false);
      handleDiscard();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle>Record Audio</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recording Visualizer */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              {isRecording && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-destructive/20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`
                  relative w-20 h-20 rounded-full flex items-center justify-center
                  transition-all active:scale-95
                  ${isRecording 
                    ? 'bg-destructive text-white' 
                    : 'bg-gradient-to-br from-[#1E3A8A] to-[#0EA5E9] text-white'
                  }
                `}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" fill="currentColor" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Timer */}
            <div className="mt-6 text-center">
              <div className="text-3xl tabular-nums">
                {formatTime(recordingTime)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isRecording ? 'Recording...' : audioBlob ? 'Recording complete' : 'Tap to start'}
              </p>
            </div>

            {/* Waveform when recording */}
            {isRecording && (
              <div className="flex items-center gap-1 h-12 mt-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-destructive rounded-full"
                    animate={{
                      height: ['8px', '32px', '8px'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {audioBlob ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  className="flex-1 gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Discard
                </Button>
                <Button
                  onClick={handleContinue}
                  className="flex-1 gap-2 bg-accent hover:bg-accent/90"
                >
                  <Check className="w-4 h-4" />
                  Continue
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Tips */}
          {!isRecording && !audioBlob && (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💡 <strong>Tip:</strong> Ensure you're in a quiet environment for best transcription results.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
