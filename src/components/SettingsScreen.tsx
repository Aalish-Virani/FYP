import { ArrowLeft, User, Moon, Trash2, Key } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenProps {
  onBack: () => void;
  darkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
  defaultMode: 'online' | 'offline' | 'ask';
  onDefaultModeChange: (mode: 'online' | 'offline' | 'ask') => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export function SettingsScreen({ 
  onBack, 
  darkMode, 
  onDarkModeChange,
  defaultMode,
  onDefaultModeChange,
  apiKey,
  onApiKeyChange
}: SettingsScreenProps) {

  const handleClearCache = () => {
    toast.success('Cache cleared successfully!');
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      onApiKeyChange(apiKey);
      toast.success('API key saved successfully!');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

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
        <h2 className="flex-1">Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#0EA5E9] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p>User Account</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onDarkModeChange}
            />
          </div>
        </div>

        {/* Default Mode */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div>
            <Label>Default Processing Mode</Label>
            <p className="text-xs text-muted-foreground mb-3">
              Choose default mode for processing
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onDefaultModeChange('online')}
              className={`w-full p-3 rounded-lg border-2 transition-all text-sm ${
                defaultMode === 'online'
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-border hover:border-muted-foreground/20'
              }`}
            >
              Online Mode
            </button>
            <button
              onClick={() => onDefaultModeChange('offline')}
              className={`w-full p-3 rounded-lg border-2 transition-all text-sm ${
                defaultMode === 'offline'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-muted-foreground/20'
              }`}
            >
              Offline Mode
            </button>
            <button
              onClick={() => onDefaultModeChange('ask')}
              className={`w-full p-3 rounded-lg border-2 transition-all text-sm ${
                defaultMode === 'ask'
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border hover:border-muted-foreground/20'
              }`}
            >
              Ask Always
            </button>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <Label htmlFor="api-key">Gemini API Key</Label>
              <p className="text-xs text-muted-foreground">For online mode</p>
            </div>
          </div>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="bg-input-background"
          />
          <Button
            onClick={handleSaveApiKey}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Save API Key
          </Button>
        </div>

        {/* Clear Cache */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <Label>Clear Cache</Label>
                <p className="text-xs text-muted-foreground">
                  Remove all cached data
                </p>
              </div>
            </div>
            <Button
              onClick={handleClearCache}
              variant="outline"
              size="sm"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
