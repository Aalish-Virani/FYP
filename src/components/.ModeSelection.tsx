import { Cloud, Shield, Info, ArrowLeft, Sparkles, Lock, Zap, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';  // Corrected import assuming it's framer-motion
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface ModeSelectionProps {
  onModeSelect: (mode: 'custom' | 'gemini') => void;
  onBack: () => void;
}

export function ModeSelection({ onModeSelect, onBack }: ModeSelectionProps) {
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<'custom' | 'gemini' | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="flex-1">Select Transcription Model</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md space-y-8">
          {/* Title Section */}
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              <Sparkles className="w-5 h-5 text-primary" />
              <div className="w-8 h-1 bg-gradient-to-r from-primary via-transparent to-transparent rounded-full" />
            </div>
            <h3 className="text-foreground">Choose Your Transcription Model</h3>
            <p className="text-muted-foreground text-xs max-w-xs mx-auto">
              Select the AI model to analyze and transcribe your audio
            </p>
          </motion.div>

          {/* Mode Cards - Enhanced Vertical Layout */}
          <div className="space-y-4">
            {/* Custom Model */}
            <motion.button
              onClick={() => onModeSelect('custom')}
              onHoverStart={() => setHoveredMode('custom')}
              onHoverEnd={() => setHoveredMode(null)}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-card to-card border-2 border-border hover:border-primary shadow-soft hover:shadow-soft-lg transition-all duration-300 active:scale-[0.97]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated Background Dots */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div 
                    className="bg-gradient-to-br from-primary to-primary/80 p-3.5 rounded-2xl shadow-lg"
                    animate={hoveredMode === 'custom' ? { scale: 1.05, rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 bg-accent p-1.5 rounded-full shadow-md">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Custom Trained Model</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-primary font-medium">SPECIALIZED</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Optimized for Urdu audio with distortions
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Best for conversational Urdu with missing words
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Our core innovation for accurate predictions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>

            {/* Gemini Model */}
            <motion.button
              onClick={() => onModeSelect('gemini')}
              onHoverStart={() => setHoveredMode('gemini')}
              onHoverEnd={() => setHoveredMode(null)}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-card to-card border-2 border-border hover:border-secondary shadow-soft hover:shadow-soft-lg transition-all duration-300 active:scale-[0.97]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated Background Dots */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div 
                    className="bg-gradient-to-br from-secondary to-secondary/80 p-3.5 rounded-2xl shadow-lg"
                    animate={hoveredMode === 'gemini' ? { scale: 1.05, rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Cloud className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 bg-accent p-1.5 rounded-full shadow-md">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Google LLM</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded-full">
                      <Zap className="w-3 h-3 text-accent" />
                      <span className="text-[10px] text-accent font-medium">ENHANCED</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Powered by Google Gemini AI
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Best for Urdu-English mix and bilingual audio
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Ideal for factual or educational content
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Privacy Info Link */}
          <motion.button
            onClick={() => setShowPrivacyInfo(true)}
            className="flex items-center justify-center gap-2 text-xs text-secondary hover:text-secondary/80 transition-colors mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Info className="w-4 h-4" />
            <span className="underline">Learn more about models & processing</span>
          </motion.button>
        </div>
      </div>

      {/* Model Info Modal */}
      <Dialog open={showPrivacyInfo} onOpenChange={setShowPrivacyInfo}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Model Information
            </DialogTitle>
            <DialogDescription className="text-sm space-y-3 pt-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <strong className="text-foreground text-sm">Custom Trained Model</strong>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our specialized model, trained for Urdu call audio. Handles distortions and predicts missing words in conversations. Core feature of our project.
                </p>
              </div>
              <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="flex items-start gap-2 mb-2">
                  <Cloud className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <strong className="text-foreground text-sm">Gemini API Model</strong>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enhanced feature using Google Gemini API. Optimized for Urdu-English mixed or educational content with advanced AI predictions.
                </p>
              </div>
              <div className="pt-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-xs text-muted-foreground">
                  💡 <strong className="text-accent">Tip:</strong> Use Custom Model for pure Urdu calls, Gemini for mixed language or factual audio.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}