import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  audioFileName: string | null;
  setAudioFileName: (name: string | null) => void;
  uploadedAudio: Blob | null;  // Store the actual audio Blob/File
  setUploadedAudio: (audio: Blob | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<Blob | null>(null);

  const value: AudioContextType = {
    audioFileName,
    setAudioFileName,
    uploadedAudio,
    setUploadedAudio,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};