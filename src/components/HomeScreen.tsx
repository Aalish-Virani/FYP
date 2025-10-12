import { Mic, Upload, User, Headphones } from 'lucide-react';
import { Button } from './ui/button';

interface HomeScreenProps {
  onRecordClick: () => void;
  onImportClick: () => void;
  onProfileClick: () => void;
}

export function HomeScreen({ onRecordClick, onImportClick, onProfileClick }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Headphones className="w-5 h-5 text-primary" />
          <span className="text-foreground">AI Transcriber</span>
        </div>
        <button
          onClick={onProfileClick}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <User className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md space-y-4">
          {/* Action Buttons - Vertical Layout */}
          <button
            onClick={onRecordClick}
            className="w-full flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#1E3A8A] to-[#0EA5E9] text-white rounded-xl shadow-soft-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <div className="bg-white/20 p-4 rounded-full">
              <Mic className="w-8 h-8" />
            </div>
            <span className="text-sm">Record Call</span>
          </button>

          <button
            onClick={onImportClick}
            className="w-full flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#0EA5E9] to-[#10B981] text-white rounded-xl shadow-soft-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <div className="bg-white/20 p-4 rounded-full">
              <Upload className="w-8 h-8" />
            </div>
            <span className="text-sm">Import Audio</span>
          </button>

          {/* Info Text */}
          <p className="text-center text-muted-foreground text-xs">
            Supported: MP3, WAV, M4A
          </p>

          {/* Continue Button */}
          <Button
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            disabled
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
