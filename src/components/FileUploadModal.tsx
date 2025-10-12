import { useState, useRef } from 'react';
import { Upload, X, FileAudio } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileSelect: (file: File) => void;
}

export function FileUploadModal({ open, onOpenChange, onFileSelect }: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/mp3', 'audio/aac'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|aac)$/i)) {
      toast.error('Invalid file type. Please upload MP3, WAV, AAC or M4A files.');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 50MB limit.');
      return false;
    }

    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleContinue = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
      onOpenChange(false);
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Import Audio File</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center gap-3
              cursor-pointer transition-all
              ${isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <div className="p-3 bg-muted rounded-full">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm">
                {isDragging ? 'Drop file here' : 'Click or drag to upload'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                MP3, WAV, M4A, AAC (Max 50MB)
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a,aac,audio/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Selected File */}
          {selectedFile && (
            <div className="bg-muted rounded-lg p-3 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileAudio className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setSelectedFile(null);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedFile}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
