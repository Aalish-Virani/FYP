import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProcessingScreen, ProcessingResult } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { FileUploadModal } from './components/FileUploadModal';
import { RecordModal } from './components/RecordModal';
import { useAudioContext } from './context/AudioContext';

type Screen = 'splash' | 'home' | 'processing' | 'results' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [apiKey, setApiKey] = useState('');
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);

  const { setAudioFileName, setUploadedAudio } = useAudioContext();

  // Handle splash screen
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleRecordClick = () => {
    setShowRecorder(true);
  };

  const handleImportClick = () => {
    setShowFileUpload(true);
  };

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file);
    setUploadedAudio(file);
    setAudioFileName(file.name);
    setCurrentScreen('processing');
  };

  const handleRecordComplete = (blob: Blob) => {
    console.log('Recording complete:', blob);
    setUploadedAudio(blob);
    setAudioFileName('recording.webm');
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = (result: ProcessingResult) => {
    setProcessingResult(result);
    setCurrentScreen('results');
  };

  const handleProcessingCancel = () => {
    setCurrentScreen('home');
  };

  const handleResultsBack = () => {
    setCurrentScreen('home');
  };

  const handleRerun = () => {
    setCurrentScreen('processing');
  };

  const handleProcessAnother = () => {
    setCurrentScreen('home');
    setProcessingResult(null);
  };

  const handleProfileClick = () => {
    setCurrentScreen('settings');
  };

  const handleSettingsBack = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplashScreen />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen
              onRecordClick={handleRecordClick}
              onImportClick={handleImportClick}
              onProfileClick={handleProfileClick}
            />
          </motion.div>
        )}

        {currentScreen === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProcessingScreen
              onComplete={handleProcessingComplete}
              onCancel={handleProcessingCancel}
            />
          </motion.div>
        )}

        {currentScreen === 'results' && processingResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultsScreen
              result={processingResult}
              onBack={handleResultsBack}
              onRerun={handleRerun}
              onProcessAnother={handleProcessAnother}
            />
          </motion.div>
        )}

        {currentScreen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SettingsScreen
              onBack={handleSettingsBack}
              darkMode={darkMode}
              onDarkModeChange={setDarkMode}
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <FileUploadModal
        open={showFileUpload}
        onOpenChange={setShowFileUpload}
        onFileSelect={handleFileSelect}
      />

      <RecordModal
        open={showRecorder}
        onOpenChange={setShowRecorder}
        onRecordComplete={handleRecordComplete}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}