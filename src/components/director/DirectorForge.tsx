import { useState } from "react";
import { ClapperBar } from "./ClapperBar";
import { LeftToolbar } from "./LeftToolbar";
import { RightToolbar } from "./RightToolbar";
import { MassiveNodeWorkspace } from "./MassiveNodeWorkspace";
import { Timeline } from "./Timeline";
import { Button } from "@/components/ui/button";
import {
  Package,
  Settings,
  FileText,
  Target,
  Folder,
  Bot,
  Users,
  Database,
  User,
  BarChart3,
  HelpCircle
} from "lucide-react";

const leftSections = [
  { id: "library", label: "Library", icon: Package },
  { id: "apis", label: "APIs", icon: Bot },
  { id: "scripts", label: "Scripts", icon: FileText },
  { id: "nodes", label: "Nodes", icon: Target },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "settings", label: "Settings", icon: Settings }
];

const rightSections = [
  { id: "ai", label: "AI Chat", icon: Bot },
  { id: "collaboration", label: "Collaborate", icon: Users },
  { id: "memory", label: "Memory", icon: Database },
  { id: "profile", label: "Profile", icon: User },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "help", label: "Help", icon: HelpCircle }
];

export function DirectorForge() {
  const [activeMode, setActiveMode] = useState("director");
  const [zenMode, setZenMode] = useState(false);
  const [leftActiveSection, setLeftActiveSection] = useState<string | null>(null);
  const [rightActiveSection, setRightActiveSection] = useState<string | null>(null);
  const [timelineHeight, setTimelineHeight] = useState<"mini" | "medium" | "full">("medium");

  const handleZenToggle = () => {
    setZenMode(!zenMode);
    if (!zenMode) {
      // Entering zen mode - minimize UI
      setLeftActiveSection(null);
      setRightActiveSection(null);
      setTimelineHeight("mini");
    } else {
      // Exiting zen mode - restore UI
      setTimelineHeight("medium");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Clapper Bar */}
      <ClapperBar
        activeMode={activeMode}
        onModeChange={setActiveMode}
        zenMode={zenMode}
        onZenToggle={handleZenToggle}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Horizontal Toolbar */}
        {!zenMode && (
          <div className="w-12 bg-studio-gray border-r border-studio-accent flex flex-col items-center py-4 space-y-2">
            {leftSections.map((section) => {
              const Icon = section.icon;
              const isActive = leftActiveSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setLeftActiveSection(isActive ? null : section.id)}
                  className={`
                    w-8 h-8 p-0 flex items-center justify-center
                    ${isActive ? "bg-director-gold/20 text-director-gold" : "text-foreground/70 hover:text-director-gold"}
                  `}
                  title={section.label}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        )}

        {/* Left Drawer */}
        <LeftToolbar
          activeSection={leftActiveSection}
          onSectionChange={setLeftActiveSection}
        />

        {/* Central Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Node Graph Workspace */}
          <div className="flex-1 relative">
            <MassiveNodeWorkspace />
            
            {/* Zen Mode Overlay */}
            {zenMode && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="glass-panel px-4 py-2 pointer-events-auto">
                    <p className="text-sm text-director-gold">
                      🧘 Zen Mode Active - Focus on your creativity
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline */}
          <Timeline 
            height={timelineHeight}
            onHeightChange={setTimelineHeight}
          />
        </div>

        {/* Right Drawer */}
        <RightToolbar
          activeSection={rightActiveSection}
          onSectionChange={setRightActiveSection}
        />

        {/* Right Horizontal Toolbar */}
        {!zenMode && (
          <div className="w-12 bg-studio-gray border-l border-studio-accent flex flex-col items-center py-4 space-y-2">
            {rightSections.map((section) => {
              const Icon = section.icon;
              const isActive = rightActiveSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightActiveSection(isActive ? null : section.id)}
                  className={`
                    w-8 h-8 p-0 flex items-center justify-center
                    ${isActive ? "bg-director-gold/20 text-director-gold" : "text-foreground/70 hover:text-director-gold"}
                  `}
                  title={section.label}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}