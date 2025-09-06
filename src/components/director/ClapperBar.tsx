import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucidLogo } from "./LucidLogo";
import { 
  Camera, 
  Image, 
  Video, 
  AudioLines, 
  Circle,
  Save,
  Upload,
  User,
  Users,
  Download,
  Settings,
  FolderOpen,
  Share2
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
  
  // Clapper board sections with angled design - responsive
  const clapperButtons = [
    { 
      id: "lucid", 
      label: "LUCID", 
      color: "bg-[#000000]", 
      textColor: "text-white", 
      icon: Circle,
      onClick: () => {}
    },
    { 
      id: "audio", 
      label: "Audio", 
      color: "bg-[#22c55e]", 
      textColor: "text-black", 
      icon: AudioLines, 
      onClick: () => onModeChange?.("audio")
    },
    { 
      id: "image", 
      label: "Image", 
      color: "bg-[#eab308]", 
      textColor: "text-black", 
      icon: Image, 
      onClick: () => onModeChange?.("image")
    },
    { 
      id: "video", 
      label: "Video", 
      color: "bg-[#3b82f6]", 
      textColor: "text-white", 
      icon: Video, 
      onClick: () => onModeChange?.("video")
    },
    { 
      id: "record", 
      label: "Record", 
      color: "bg-[#ef4444]", 
      textColor: "text-white", 
      icon: Camera, 
      onClick: () => onModeChange?.("record")
    },
    { 
      id: "zen", 
      label: "🧘Zen", 
      color: "bg-[#ffffff]", 
      textColor: "text-black", 
      icon: Circle,
      onClick: () => onZenToggle?.()
    },
    { 
      id: "save", 
      label: "Save", 
      color: "bg-[#f3f4f6]", 
      textColor: "text-black", 
      icon: Save,
      onClick: () => {}
    },
    { 
      id: "export", 
      label: "Export", 
      color: "bg-[#9ca3af]", 
      textColor: "text-black", 
      icon: Download,
      onClick: () => {}
    },
    { 
      id: "signin", 
      label: "SignIn", 
      color: "bg-[#374151]", 
      textColor: "text-white", 
      icon: User,
      onClick: () => {}
    }
  ];

  return (
    <div className="clapper-bar relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
    }}>
      {/* Clapper board sections */}
      <div className="flex items-center h-16 relative">
        {clapperButtons.map((button, index) => {
          const Icon = button.icon;
          const isActive = activeMode === button.id;
          const isFirst = index === 0;
          
          return (
            <div
              key={section.label}
              className={`
                relative h-full flex items-center justify-center px-4 cursor-pointer
                transform transition-all duration-300 hover:scale-105
                ${section.color} ${section.textColor}
                ${isActive ? 'ring-2 ring-director-gold shadow-lg shadow-director-gold/30' : ''}
                ${!isFirst ? 'clip-path-angled' : ''}
              `}
              style={{
                minWidth: isFirst ? '120px' : '100px',
                clipPath: !isFirst ? 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' : undefined,
                marginLeft: !isFirst ? '-10px' : '0'
              }}
              onClick={() => {
                if (section.mode) {
                  onModeChange?.(section.mode);
                } else if (section.label === "Settings") {
                  onZenToggle?.();
                }
              }}
            >
              {isFirst ? (
                <div className="flex items-center space-x-2">
                  <LucidLogo className="w-6 h-6" />
                  <span className="font-bold text-lg bg-gradient-to-r from-director-gold to-director-gold-muted bg-clip-text text-transparent">
                    LUCID
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-1">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="text-xs font-medium">{section.label}</span>
                </div>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-director-gold" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Clapper hinge effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800" />
    </div>
  );
}
