import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Image, 
  Video, 
  AudioLines, 
  Circle,
  Save,
  Upload,
  User,
  Brain
} from "lucide-react";

interface ClapperBarProps {
  activeMode?: string;
  onModeChange?: (mode: string) => void;
  onZenToggle?: () => void;
  zenMode?: boolean;
}

export function ClapperBar({ 
  activeMode = "director", 
  onModeChange,
  onZenToggle,
  zenMode = false 
}: ClapperBarProps) {
  const modes = [
    { id: "audio", label: "Audio", icon: AudioLines, color: "audio" },
    { id: "image", label: "Image", icon: Image, color: "image" },
    { id: "video", label: "Video", icon: Video, color: "cinema" },
    { id: "record", label: "Record", icon: Camera, color: "record" },
  ];

  return (
    <div className="clapper-bar flex items-center justify-between px-6 py-3">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-director-gold to-director-gold-dark rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-studio-black" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-director-gold to-director-gold-muted bg-clip-text text-transparent">
            Director
          </span>
        </div>
        <Badge variant="outline" className="text-director-gold border-director-gold/30">
          FORGE
        </Badge>
      </div>

      {/* Mode Buttons */}
      <div className="flex items-center space-x-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          
          return (
            <Button
              key={mode.id}
              variant={isActive ? (mode.color as any) : "ghost"}
              size="sm"
              onClick={() => onModeChange?.(mode.id)}
              className={`transition-all duration-300 ${!isActive ? "text-foreground/70 hover:text-foreground" : ""}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {mode.label}
            </Button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZenToggle}
          className={`
            transition-all duration-300 
            ${zenMode ? "bg-director-gold/20 text-director-gold" : "text-foreground/70 hover:text-foreground"}
          `}
        >
          <Circle className="w-4 h-4 mr-2" />
          🧘 Zen
        </Button>
        
        <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button 
          variant="director" 
          size="sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </div>
    </div>
  );
}
