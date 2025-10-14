import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, Loader2, Cpu, FileText, Sparkles, Cloud } from 'lucide-react';
import { Progress } from './ui/progress';

interface ProcessingScreenProps {
  onComplete: (result: ProcessingResult) => void;
  onCancel: () => void;
}

export interface ProcessingResult {
  rawTranscription: string;
  predictedTranscription: string;
  audioUrl?: string;
}

export function ProcessingScreen({ onComplete, onCancel }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      label: 'Audio Analysis', 
      icon: Cpu,
      description: 'Analyzing audio quality & distortions',
      color: 'text-secondary'
    },
    { 
      label: 'Transcription', 
      icon: FileText,
      description: 'Converting speech to text',
      color: 'text-secondary'
    },
    { 
      label: 'AI Prediction', 
      icon: Sparkles,
      description: 'Predicting missing segments',
      color: 'text-secondary'
    },
  ];

  useEffect(() => {
    // Simulate processing steps
    const stepDuration = 2000;
    
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 2) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(stepTimer);
          
          // Complete processing after a short delay
          setTimeout(() => {
            onComplete({
              rawTranscription: "السلام علیکم، میں آج آپ سے [missing] کے بارے میں بات کرنا چاہتا ہوں۔ کیا آپ [missing] کر سکتے ہیں؟ یہ بہت ضروری ہے۔",
              predictedTranscription: "السلام علیکم، میں آج آپ سے پراجیکٹ کے بارے میں بات کرنا چاہتا ہوں۔ کیا آپ مدد کر سکتے ہیں؟ یہ بہت ضروری ہے۔",
              audioUrl: undefined
            });
          }, 500);
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Cloud className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h2 className="text-sm">Processing Audio</h2>
              {/* <p className="text-xs text-muted-foreground">
                Google Gemini AI Model
              </p> */}
            </div>
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            {progress}%
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm space-y-8">
          {/* Enhanced Waveform Animation */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer Pulse Rings */}
              <motion.div
                className="absolute inset-0 w-36 h-36 -m-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute inset-0 w-36 h-36 -m-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main Circle */}
              <motion.div
                className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284c7]"
                animate={{
                  scale: [1, 1.05, 1],
                  // rotate: [0, 180, 360],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }
                }}
              >
                {/* Inner Circle with Waveform */}
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-inner">
                  <motion.div
                    className="flex items-end gap-0.5 h-12"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {[...Array(7)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-gradient-to-t from-[#0EA5E9] to-[#0284c7]"
                        animate={{
                          height: ['15px', '45px', '15px'],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-[10px] font-medium text-white/80"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {progress}%
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Current Step Info */}
          <motion.div 
            className="text-center space-y-2"
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2">
              {React.createElement(steps[currentStep].icon, {
                className: `w-5 h-5 ${steps[currentStep].color}`
              })}
              <h3 className="text-foreground">{steps[currentStep].label}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Processing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Enhanced Step Indicators */}
          <div className="flex justify-between items-start gap-4 px-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {index < currentStep ? (
                      // Completed
                      <motion.div
                        key="completed"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        className="relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-accent rounded-full -m-1"
                          animate={{
                            scale: [1, 1.5, 1.5],
                            opacity: [0.5, 0, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        />
                        <div className="relative bg-accent rounded-full p-2 shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    ) : index === currentStep ? (
                      // Active
                      <motion.div
                        key="active"
                        className="relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-secondary rounded-full -m-1"
                          animate={{
                            scale: [1, 1.4, 1.4],
                            opacity: [0.5, 0, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                        <motion.div 
                          className="relative bg-secondary rounded-full p-2 shadow-lg"
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <Loader2 className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      // Pending
                      <motion.div
                        key="pending"
                        className="bg-muted/50 rounded-full p-2 border-2 border-border"
                      >
                        <div className="w-5 h-5 rounded-full bg-muted" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className={`text-[10px] text-center max-w-[70px] leading-tight transition-colors ${
                  index <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-muted/50 text-muted-foreground rounded-lg hover:bg-muted transition-colors active:scale-95 border border-border"
            >
              <XCircle className="w-4 h-4" />
              <span className="text-sm">Cancel</span>
            </button>
            <button
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-muted/50 text-muted-foreground rounded-lg hover:bg-muted transition-colors active:scale-95 border border-border"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Retry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}