import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { ModeSelection } from './components/ModeSelection';
import { ProcessingScreen, ProcessingResult } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { FileUploadModal } from './components/FileUploadModal';
import { RecordModal } from './components/RecordModal';
import { useAudioContext } from './context/AudioContext';  // Corrected path (assuming context/ is in src/)

type Screen = 'splash' | 'home' | 'mode' | 'processing' | 'results' | 'settings';
type Mode = 'custom' | 'gemini';  // Aligned with other components
type DefaultMode = 'online' | 'offline' | 'ask';  // Kept as-is for SettingsScreen

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedMode, setSelectedMode] = useState<Mode>('gemini');  // Default to 'gemini' (online)
  const [defaultMode, setDefaultMode] = useState<DefaultMode>('ask');
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
    setUploadedAudio(file);  // Store the File (which is a Blob)
    setAudioFileName(file.name);  // Store name
    if (defaultMode === 'ask') {
      setCurrentScreen('mode');
    } else {
      setSelectedMode(defaultMode === 'online' ? 'gemini' : 'custom');  // Map to correct mode
      setCurrentScreen('processing');
    }
  };

  const handleRecordComplete = (blob: Blob) => {
    console.log('Recording complete:', blob);
    setUploadedAudio(blob);  // Store the Blob
    setAudioFileName('recording.webm');  // Default name for recordings
    if (defaultMode === 'ask') {
      setCurrentScreen('mode');
    } else {
      setSelectedMode(defaultMode === 'online' ? 'gemini' : 'custom');  // Map to correct mode
      setCurrentScreen('processing');
    }
  };

  const handleProcessAnother = () => {
    setCurrentScreen('home');
    setUploadedAudio(null);  // Clear audio
    setAudioFileName(null);  // Clear name
  };

  const handleResultsBack = () => {
    setCurrentScreen('processing');
  };

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentScreen('processing');
  };

  const handleModeBack = () => {
    setCurrentScreen('home');
  };

  const handleProcessingComplete = (result: ProcessingResult) => {
    setProcessingResult(result);
    setCurrentScreen('results');
  };

  const handleProcessingCancel = () => {
    setCurrentScreen('home');
  };

  const handleRerun = () => {
    setCurrentScreen('processing');
  };

  const handleRerunWithDifferentMode = () => {
    setSelectedMode(selectedMode === 'custom' ? 'gemini' : 'custom');
    setCurrentScreen('processing');
  };

  const handleSettingsBack = () => {
    setCurrentScreen('home');
  };

  // ... (Add any other handlers if truncated in your original)

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SplashScreen />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HomeScreen
              onRecordClick={handleRecordClick}
              onImportClick={handleImportClick}
              onProfileClick={() => setCurrentScreen('settings')}
            />
          </motion.div>
        )}

        {currentScreen === 'mode' && (
          <motion.div
            key="mode"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ModeSelection
              onModeSelect={handleModeSelect}
              onBack={handleModeBack}
            />
          </motion.div>
        )}

        {currentScreen === 'processing' && (
          <motion.div
            key="processing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProcessingScreen
              onComplete={handleProcessingComplete}
              onCancel={handleProcessingCancel}
              mode={selectedMode}
            />
          </motion.div>
        )}

        {currentScreen === 'results' && processingResult && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultsScreen
              result={processingResult}
              onBack={handleResultsBack}
              onRerun={handleRerun}
              onRerunWithDifferentMode={handleRerunWithDifferentMode}
              onProcessAnother={handleProcessAnother}
              currentMode={selectedMode}
            />
          </motion.div>
        )}

        {currentScreen === 'settings' && (
          <motion.div
            key="settings"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SettingsScreen
              onBack={handleSettingsBack}
              darkMode={darkMode}
              onDarkModeChange={setDarkMode}
              defaultMode={defaultMode}
              onDefaultModeChange={setDefaultMode}
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