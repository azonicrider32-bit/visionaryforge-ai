import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Package,
  Settings,
  FileText,
  Target,
  Folder,
  Users,
  Bot,
  Layers,
  Music,
  Filter,
  Cpu,
  X
} from "lucide-react";

interface LeftToolbarProps {
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
}

export function LeftToolbar({ activeSection, onSectionChange }: LeftToolbarProps) {

  const sections = [
    {
      id: "library",
      label: "Library",
      icon: Package,
      items: [
        { id: "characters", label: "Characters", icon: Users, count: 12 },
        { id: "objects", label: "Objects", icon: Layers, count: 45 },
        { id: "environments", label: "Environments", icon: Bot, count: 8 },
        { id: "audio", label: "Audio Assets", icon: Music, count: 23 },
        { id: "effects", label: "Effects & Filters", icon: Filter, count: 67 }
      ]
    },
    {
      id: "apis",
      label: "APIs",
      icon: Cpu,
      items: [
        { id: "model-atlas", label: "Model Atlas", icon: Bot, status: "active" },
        { id: "api-keys", label: "API Management", icon: Settings, status: "configured" },
        { id: "usage", label: "Usage Monitoring", icon: Target, status: "monitoring" },
        { id: "cost", label: "Cost Management", icon: Settings, status: "active" }
      ]
    },
    {
      id: "scripts",
      label: "Scripts",
      icon: FileText,
      items: [
        { id: "editor", label: "DirectorScript Editor", icon: FileText, status: "ready" },
        { id: "library", label: "Script Library", icon: Folder, count: 5 },
        { id: "templates", label: "Templates", icon: Layers, count: 12 },
        { id: "tools", label: "Production Tools", icon: Settings, status: "active" }
      ]
    },
    {
      id: "nodes",
      label: "Nodes",
      icon: Target,
      items: [
        { id: "input", label: "Input Nodes", icon: Target, count: 8 },
        { id: "generation", label: "Generation Nodes", icon: Bot, count: 15 },
        { id: "processing", label: "Processing Nodes", icon: Cpu, count: 12 },
        { id: "output", label: "Output Nodes", icon: Package, count: 6 }
      ]
    },
    {
      id: "projects",
      label: "Projects", 
      icon: Folder,
      items: [
        { id: "current", label: "Current Project", icon: Folder, status: "active" },
        { id: "recent", label: "Recent Projects", icon: Folder, count: 3 },
        { id: "templates", label: "Project Templates", icon: Layers, count: 8 }
      ]
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      items: [
        { id: "preferences", label: "Preferences", icon: Settings },
        { id: "performance", label: "Performance", icon: Cpu },
        { id: "shortcuts", label: "Shortcuts", icon: Target }
      ]
    }
  ];

  if (!activeSection) return null;

  const currentSection = sections.find(s => s.id === activeSection);
  if (!currentSection) return null;

  return (
    <div className="toolbar-panel h-full flex flex-col slide-in-left">
      {/* Header with close button */}
      <div className="p-4 border-b border-studio-accent flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <currentSection.icon className="w-5 h-5 text-director-gold" />
          <h3 className="font-semibold">{currentSection.label}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onSectionChange(null)}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Active Section Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {currentSection.items.map((item) => {
            const Icon = item.icon;
            
            return (
              <Card 
                key={item.id} 
                className="glass-panel hover:bg-studio-light/30 transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <Badge variant="secondary" className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                    {item.status && (
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    {getItemDescription(item.id)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "active": return "text-audio-green border-audio-green/30";
    case "configured": return "text-cinema-blue border-cinema-blue/30";
    case "monitoring": return "text-director-gold border-director-gold/30";
    case "ready": return "text-image-purple border-image-purple/30";
    default: return "text-foreground/50 border-foreground/20";
  }
}

function getItemDescription(id: string): string {
  const descriptions: Record<string, string> = {
    characters: "Digital actors with personality profiles",
    objects: "3D assets and props for scenes",
    environments: "Virtual locations and backdrops",
    audio: "Music, effects, and ambient sounds",
    effects: "Visual effects and post-processing",
    "model-atlas": "AI model management hub",
    "api-keys": "External service integrations",
    usage: "Real-time resource monitoring",
    cost: "Budget tracking and optimization",
    editor: "Visual script editor with AI assistance",
    library: "Saved scripts and projects",
    templates: "Pre-built script frameworks",
    tools: "Production pipeline tools",
    input: "Data input and source nodes",
    generation: "AI-powered content creation",
    processing: "Data transformation nodes",
    output: "Export and delivery nodes",
    current: "Active project workspace",
    recent: "Previously opened projects",
    preferences: "Application settings",
    performance: "System optimization",
    shortcuts: "Keyboard shortcuts"
  };
  
  return descriptions[id] || "Professional production tools";
}