import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Minimize2,
  Settings
} from "lucide-react";

interface TimelineProps {
  height?: "mini" | "medium" | "full";
  onHeightChange?: (height: "mini" | "medium" | "full") => void;
}

export function Timeline({ height = "medium", onHeightChange }: TimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes
  const [volume, setVolume] = useState([75]);

  const tracks = [
    {
      id: 1,
      name: "Video Track 1",
      type: "video",
      color: "cinema-blue",
      clips: [
        { id: 1, start: 0, duration: 30, name: "Opening Scene" },
        { id: 2, start: 35, duration: 25, name: "Character Intro" },
        { id: 3, start: 65, duration: 40, name: "Action Sequence" }
      ]
    },
    {
      id: 2, 
      name: "Audio Track 1",
      type: "audio",
      color: "audio-green",
      clips: [
        { id: 4, start: 0, duration: 60, name: "Background Music" },
        { id: 5, start: 30, duration: 20, name: "Dialogue" },
        { id: 6, start: 70, duration: 35, name: "Sound Effects" }
      ]
    },
    {
      id: 3,
      name: "Effects Track",
      type: "effects", 
      color: "image-purple",
      clips: [
        { id: 7, start: 15, duration: 10, name: "Fade In" },
        { id: 8, start: 90, duration: 15, name: "Color Grade" }
      ]
    }
  ];

  const getHeightClass = () => {
    switch (height) {
      case "mini": return "h-[60px]";
      case "medium": return "h-[120px]"; 
      case "full": return "h-[200px]";
      default: return "h-[120px]";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timeline ${getHeightClass()} flex flex-col`}>
      {/* Transport Controls */}
      <div className="flex items-center justify-between p-3 border-b border-studio-accent">
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-director-gold hover:bg-director-gold/20"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button size="sm" variant="ghost" className="text-foreground/70 hover:text-foreground">
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button size="sm" variant="ghost" className="text-foreground/70 hover:text-foreground">
            <SkipForward className="w-4 h-4" />
          </Button>
          
          <div className="text-sm font-mono text-director-gold">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-foreground/70" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>

          {/* Timeline Controls */}
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onHeightChange?.("mini")}
              className={height === "mini" ? "text-director-gold" : "text-foreground/70"}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onHeightChange?.("full")}
              className={height === "full" ? "text-director-gold" : "text-foreground/70"}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button size="sm" variant="ghost" className="text-foreground/70 hover:text-foreground">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline Tracks */}
      {height !== "mini" && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-2">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center space-x-2">
                {/* Track Label */}
                <div className="w-32 flex-shrink-0">
                  <Card className="glass-panel p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{track.name}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getTrackColor(track.color)}`}
                      >
                        {track.type}
                      </Badge>
                    </div>
                  </Card>
                </div>

                {/* Track Timeline */}
                <div className="flex-1 relative h-8 bg-studio-dark rounded border border-studio-accent">
                  {/* Time ruler (simplified) */}
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 border-r border-studio-accent/30 text-xs text-muted-foreground flex items-center justify-center"
                      >
                        {i * 10}s
                      </div>
                    ))}
                  </div>

                  {/* Track Clips */}
                  {track.clips.map((clip) => (
                    <div
                      key={clip.id}
                      className={`absolute top-1 bottom-1 rounded bg-gradient-to-r ${getClipGradient(track.color)} border border-opacity-50 cursor-pointer hover:scale-105 transition-transform`}
                      style={{
                        left: `${(clip.start / duration) * 100}%`,
                        width: `${(clip.duration / duration) * 100}%`
                      }}
                    >
                      <div className="p-1 h-full flex items-center">
                        <span className="text-xs font-medium text-studio-black truncate">
                          {clip.name}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Playhead */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-director-gold shadow-lg"
                    style={{
                      left: `${(currentTime / duration) * 100}%`
                    }}
                  >
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-director-gold rounded-full shadow-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini Mode Progress Bar */}
      {height === "mini" && (
        <div className="p-2">
          <Slider
            value={[currentTime]}
            onValueChange={([value]) => setCurrentTime(value)}
            max={duration}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

function getTrackColor(color: string): string {
  switch (color) {
    case "cinema-blue": return "text-cinema-blue border-cinema-blue/30";
    case "audio-green": return "text-audio-green border-audio-green/30";
    case "image-purple": return "text-image-purple border-image-purple/30";
    default: return "text-foreground/50 border-foreground/20";
  }
}

function getClipGradient(color: string): string {
  switch (color) {
    case "cinema-blue": return "from-cinema-blue to-cinema-blue-dark";
    case "audio-green": return "from-audio-green to-audio-green-dark"; 
    case "image-purple": return "from-image-purple to-image-purple-dark";
    default: return "from-muted to-muted-foreground";
  }
}