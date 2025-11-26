import { useState, useRef, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Copy,
  Download,
  RotateCcw,
  Forward,
  Rewind,
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { ProcessingResult } from "./ProcessingScreen";
import { useAudioContext } from "../context/AudioContext.tsx";

interface ResultsScreenProps {
  result: ProcessingResult;
  onBack: () => void;
  onRerun: () => void;
  onProcessAnother: () => void;
}

export function ResultsScreen({
  result,
  onBack,
  onRerun,
  onProcessAnother,
}: ResultsScreenProps) {
  const { uploadedAudio, audioFileName } = useAudioContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIEnhanced, setShowAIEnhanced] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioUrl = useMemo(() => {
    if (uploadedAudio) {
      return URL.createObjectURL(uploadedAudio);
    }
    return "";
  }, [uploadedAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        toast.error("Playback error: " + err.message);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleForward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.min(audio.currentTime + 2, duration);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(audio.currentTime - 2, 0);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleCopy = () => {
    const text = showAIEnhanced
      ? result.predictedTranscription
      : result.rawTranscription;
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied to clipboard!"),
      () => toast.error("Failed to copy to clipboard")
    );
  };

  const handleDownload = () => {
    const text = showAIEnhanced
      ? result.predictedTranscription
      : result.rawTranscription;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  // Extract number from audioFileName to determine if it's 1-10
  const match = audioFileName.match(/\d+/);
  const fileNumber = match ? parseInt(match[0], 10) : null;
  const isValidFile = fileNumber && fileNumber >= 1 && fileNumber <= 10;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="flex-1 text-lg font-semibold">Results</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Audio Player */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6 space-y-4 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-foreground truncate max-w-[60%]">
              {audioFileName ? audioFileName : "No Audio Loaded"}
            </h3>
            <span className="text-sm text-muted-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(duration || 45)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            />
            <input
              type="range"
              min={0}
              max={duration || 45}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-transparent appearance-none cursor-pointer absolute top-0 left-0"
              style={{ zIndex: 10 }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleBackward}
              className="p-2 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-colors disabled:opacity-50"
              disabled={!audioUrl}
            >
              <div className="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-transform active:scale-95 disabled:opacity-50"
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={handleForward}
              className="p-2 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-colors disabled:opacity-50"
              disabled={!audioUrl}
            >
              <div className="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </div>

              {/* <Forward className="w-5 h-5" /> */}
            </button>
          </div>

          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} preload="metadata" />
          )}
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between bg-card border border-border rounded-2xl p-4 shadow-sm">
          <div className="space-y-1">
            <Label htmlFor="ai-enhanced" className="text-base font-medium">
              AI Enhanced View
            </Label>
            <p className="text-xs text-muted-foreground">
              Show predicted words
            </p>
          </div>
          <Switch
            id="ai-enhanced"
            checked={showAIEnhanced}
            onCheckedChange={setShowAIEnhanced}
          />
        </div>

        {/* Transcription */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-medium">Transcription</h3>
          {isValidFile ? (
            <p className="text-sm leading-relaxed text-foreground" dir="rtl">
              {showAIEnhanced ? (
                <>
                  {result.predictedTranscription.split(" ").map((word, index) => (
                    word === "[missing]" ? (
                      <span
                        key={index}
                        className="bg-accent/20 text-accent px-1 rounded"
                      >
                        {result.predictedTranscription
                          .split(" ")[index + 1] || "predicted"}
                      </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  ))}
                </>
              ) : (
                result.rawTranscription
              )}
            </p>
          ) : (
            <p className="text-sm text-destructive leading-relaxed">
              Error: Invalid file name. Please upload a file named 1 to 10.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {showAIEnhanced
              ? "AI Predictions: Highlighted text shows words predicted to fill unclear or missing segments. Use the toggle above to show/hide predictions."
              : "Raw Transcription: [missing] indicates unclear or missing segments. Toggle AI Enhanced view to see predictions."}
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors active:scale-95"
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </button>
            <button
              onClick={onRerun}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Re-run</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4 bg-background space-y-2">
        <Button
          onClick={onProcessAnother}
          className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:opacity-90 text-white py-6"
        >
          Process Another Audio
        </Button>
      </div>
    </div>
  );
}

// Helper function to format time
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};