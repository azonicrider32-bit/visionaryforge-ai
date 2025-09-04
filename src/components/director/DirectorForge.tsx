import { useState } from "react";
import { ClapperBar } from "./ClapperBar";
import { LeftToolbar } from "./LeftToolbar";
import { RightToolbar } from "./RightToolbar";
import { NodeWorkspace } from "./NodeWorkspace";
import { Timeline } from "./Timeline";

export function DirectorForge() {
  const [activeMode, setActiveMode] = useState("director");
  const [zenMode, setZenMode] = useState(false);
  const [leftToolbarOpen, setLeftToolbarOpen] = useState(true);
  const [rightToolbarOpen, setRightToolbarOpen] = useState(true);
  const [timelineHeight, setTimelineHeight] = useState<"mini" | "medium" | "full">("medium");

  const handleZenToggle = () => {
    setZenMode(!zenMode);
    if (!zenMode) {
      // Entering zen mode - minimize UI
      setLeftToolbarOpen(false);
      setRightToolbarOpen(false);
      setTimelineHeight("mini");
    } else {
      // Exiting zen mode - restore UI
      setLeftToolbarOpen(true);
      setRightToolbarOpen(true);
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
        {/* Left Toolbar */}
        {leftToolbarOpen && (
          <LeftToolbar
            isOpen={leftToolbarOpen}
            onClose={() => setLeftToolbarOpen(false)}
          />
        )}

        {/* Central Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Node Graph Workspace */}
          <div className="flex-1 relative">
            <NodeWorkspace />
            
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

        {/* Right Toolbar */}
        {rightToolbarOpen && (
          <RightToolbar
            isOpen={rightToolbarOpen}
            onClose={() => setRightToolbarOpen(false)}
          />
        )}
      </div>

      {/* Toolbar Toggle Buttons (when closed) */}
      {!leftToolbarOpen && !zenMode && (
        <button
          onClick={() => setLeftToolbarOpen(true)}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-studio-gray hover:bg-studio-light border border-studio-accent rounded-r-lg p-2 transition-all duration-300 z-50"
        >
          <div className="w-1 h-6 bg-director-gold rounded"></div>
        </button>
      )}

      {!rightToolbarOpen && !zenMode && (
        <button
          onClick={() => setRightToolbarOpen(true)}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-studio-gray hover:bg-studio-light border border-studio-accent rounded-l-lg p-2 transition-all duration-300 z-50"
        >
          <div className="w-1 h-6 bg-director-gold rounded"></div>
        </button>
      )}
    </div>
  );
}