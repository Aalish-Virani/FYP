# 🎧 AI Urdu Call Audio Analyzer & Transcriber

## Project Overview
A mobile-first React + Tailwind CSS application for analyzing and transcribing Urdu call recordings with AI-powered prediction of missing words.

## Design System

### Typography
- **Headings**: Poppins/Inter, 16-18px
- **Body**: Roboto/Inter, 14px
- **Small Text**: 12px for captions and metadata

### Color Palette
- **Primary**: Deep Blue `#1E3A8A`
- **Secondary**: Sky Blue `#0EA5E9`
- **Accent**: Emerald Green `#10B981`
- **Error**: Rose Red `#F43F5E`
- **Background**: Light Slate `#f8fafc` (Light) / Navy `#0f172a` (Dark)
- **Card**: White `#ffffff` (Light) / Slate `#1e293b` (Dark)
- **Border**: Slate `#cbd5e1` (Light) / with opacity (Dark)

### UI Theme
- Rounded corners: 10-12px (`rounded-xl`)
- Soft shadows on cards and buttons
- Compact spacing: 4-8px gaps
- Icon sizing: 24-32px
- Minimum tap target: 44px

## App Structure

### Screens
1. **SplashScreen** - Animated intro (2s)
2. **HomeScreen** - Main hub with Record/Import options (vertical layout)
3. **ModeSelection** - Choose Online (Gemini) or Offline mode (vertical layout, shown only if "Ask Always" is selected)
4. **ProcessingScreen** - Animated 3-step processing
5. **ResultsScreen** - Unified view with audio player and transcription toggle
6. **SettingsScreen** - User preferences with 3 mode options (Online/Offline/Ask Always)

### Modals
- **FileUploadModal** - Drag-and-drop file upload
- **RecordModal** - Live audio recording with waveform

## Mobile Optimization

### Viewport
- Optimized for 360-768px width
- Max width constraint with centered layout
- Prevents text size adjustment on orientation change

### Touch Interactions
- Tap highlight color removed
- Smooth scrolling enabled
- Touch-action manipulation
- 44px minimum touch targets

### Performance
- Font smoothing enabled
- Hardware-accelerated animations via Motion/React
- Lazy loading considerations for modals
- Smooth page transitions with AnimatePresence
- 60fps animations optimized for mobile

## Features

### Audio Processing
- Upload: MP3, WAV, M4A (max 50MB)
- Record: WebRTC-based recording with live preview
- Analysis: Mock detection of distortions and missing segments

### Transcription
- **Raw**: Shows original transcription with missing segments highlighted
- **Predicted**: AI-predicted words shown in green italics
- Toggle predictions on/off
- Copy and download functionality

### Privacy Modes
- **Online Mode**: Uses Gemini API for high accuracy (Urdu + English)
- **Offline Mode**: Local processing for privacy (Urdu only)
- **Ask Always**: Prompts user to select mode for each audio file

### Mode Selection Logic
- If user selects "Online" or "Offline" in settings, that mode is used automatically
- If user selects "Ask Always", mode selection screen appears after audio import/recording
- Users can switch modes from results screen with "Re-run with different mode" option

### Dark Mode
- Full dark theme support
- System preference detection possible
- Toggle in settings

## UI Enhancements

### Page Transitions
- Smooth fade and slide animations between screens
- 300ms duration with cubic-bezier easing
- AnimatePresence for exit animations
- Prevents layout shift during transitions

### Mode Selection Screen Design
- **Enhanced Card Design**:
  - Gradient overlays with animated background elements
  - Icon containers with gradient backgrounds and badges
  - Hover animations (rotation, scale effects)
  - Arrow indicators that appear on hover
  - Feature bullet points with detailed descriptions
  - Status badges (FAST for Online, PRIVATE for Offline)
- **Visual Hierarchy**:
  - Decorative header with sparkle icon and gradient lines
  - Centered layout with proper spacing
  - Color-coded cards (Secondary/blue for Online, Primary/navy for Offline)
  - Enhanced privacy modal with card-style information blocks
- **Micro-interactions**:
  - Hover state tracking for animated effects
  - Staggered entrance animations
  - Tap scale feedback
  - Smooth gradient transitions

### Processing Screen Animations
- **Enhanced Waveform**:
  - Multi-layer pulsing rings with radial gradients
  - Main circle with dual animation (scale + rotation)
  - 7-bar color-shifting waveform
  - Mode-specific color schemes (blue for online, navy for offline)
- **Header Information**:
  - Mode indicator with icon badge
  - Real-time percentage display
  - Backdrop blur effect
- **Step Progress System**:
  - 3 detailed steps with icons and descriptions
  - AnimatePresence for smooth state transitions
  - Completed: Green check with expanding pulse ring
  - Active: Rotating loader with breathing scale effect
  - Pending: Muted empty circles
  - Step-specific colors (Secondary, Primary, Accent)
- **Enhanced Progress Bar**:
  - Dual percentage display (top header + below progress)
  - Smooth percentage counting
  - Processing status text

### Light Theme Improvements
- Softer background color (#f8fafc)
- Better contrast for text and borders
- Enhanced card shadows for depth
- Improved muted colors for secondary elements
- Gradient overlays on interactive elements

## Component Architecture

### State Management
- Screen navigation via useState
- Mode selection (online/offline/ask)
- Default mode preference (persisted in settings)
- API key storage
- Dark mode preference
- Processing results storage

### Results Screen Layout
Based on mobile-optimized design:
1. **Audio Player** - Compact waveform with play controls at top
2. **Transcription Section** - Single view with AI Enhanced toggle
   - Toggle between Raw (with missing segments) and AI Enhanced (with predictions)
   - Copy, Download, Re-run buttons below transcription
3. **Bottom Actions**
   - Re-run with different mode (switches between Online/Offline)
   - Process Another Audio (returns to home)

### Key Components
- Mobile-first responsive design
- Reusable UI components from shadcn/ui
- Custom animations with Motion
- Toast notifications with Sonner

## Development Notes

### Dependencies
- React for UI framework
- Tailwind CSS v4 for styling
- Motion (Framer Motion) for animations
- Lucide React for icons
- shadcn/ui for UI components
- Sonner for toast notifications

### File Structure
```
/App.tsx                    - Main app with screen routing
/components/
  SplashScreen.tsx         - Animated intro
  HomeScreen.tsx           - Main upload/record hub
  ModeSelection.tsx        - Privacy mode selection
  ProcessingScreen.tsx     - Processing animation
  ResultsScreen.tsx        - Tabbed results view
  SettingsScreen.tsx       - User preferences
  FileUploadModal.tsx      - File upload dialog
  RecordModal.tsx          - Audio recording dialog
  /ui/                     - shadcn/ui components
/styles/globals.css        - Global styles and tokens
```

## Future Enhancements
- Real Gemini API integration
- Actual audio analysis algorithms
- Offline Urdu model integration
- User authentication
- Recording history
- Export in multiple formats
- Waveform visualization improvements
- Real-time transcription during recording
