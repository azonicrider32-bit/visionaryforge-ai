import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bot,
  Users,
  Database,
  User,
  BarChart3,
  HelpCircle,
  Send,
  UserPlus,
  MessageSquare,
  Phone,
  Monitor,
  X
} from "lucide-react";

interface RightToolbarProps {
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
}

export function RightToolbar({ activeSection, onSectionChange }: RightToolbarProps) {
  const [chatMessage, setChatMessage] = useState("");

  const sections = [
    { id: "ai", label: "AI Chat", icon: Bot },
    { id: "collaboration", label: "Collaborate", icon: Users },
    { id: "memory", label: "Memory", icon: Database },
    { id: "profile", label: "Profile", icon: User },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "help", label: "Help", icon: HelpCircle }
  ];

  const collaborators = [
    { id: 1, name: "Sarah Chen", role: "Director", avatar: "/avatars/sarah.jpg", status: "online" },
    { id: 2, name: "Mike Rodriguez", role: "Editor", avatar: "/avatars/mike.jpg", status: "online" },
    { id: 3, name: "Emma Wilson", role: "Producer", avatar: "/avatars/emma.jpg", status: "away" },
    { id: 4, name: "David Kim", role: "Sound Designer", avatar: "/avatars/david.jpg", status: "offline" }
  ];

  if (!activeSection) return null;

  const currentSection = sections.find(s => s.id === activeSection);
  if (!currentSection) return null;

  return (
    <div className="toolbar-panel h-full flex flex-col slide-in-right">
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
        <div className="p-4">
          {activeSection === "ai" && (
            <div className="space-y-4">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Bot className="w-4 h-4 text-director-gold" />
                    <span>AI Assistant</span>
                    <Badge variant="outline" className="text-audio-green border-audio-green/30">
                      Online
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-studio-dark rounded-lg p-3 text-sm">
                    <p className="text-director-gold font-medium mb-1">Director AI:</p>
                    <p>Ready to help with your production! I can assist with script analysis, character development, workflow optimization, and creative suggestions.</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask anything about your project..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 bg-studio-light border-studio-accent"
                    />
                    <Button size="sm" className="btn-director">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "collaboration" && (
            <div className="space-y-4">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-cinema-blue" />
                      <span>Team Members</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <UserPlus className="w-3 h-3 mr-1" />
                      Invite
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {collaborators.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-director-gold text-studio-black text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                        <span className="text-xs text-muted-foreground">{member.status}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Live Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Team Chat
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Voice Call
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Monitor className="w-4 h-4 mr-2" />
                    Screen Share
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "memory" && (
            <div className="space-y-4">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Database className="w-4 h-4 text-image-purple" />
                    <span>Memory Bank</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="bg-studio-dark rounded p-2">
                      <p className="font-medium text-director-gold">Recent Patterns</p>
                      <p className="text-xs text-muted-foreground">Character consistency improved by 23%</p>
                    </div>
                    <div className="bg-studio-dark rounded p-2">
                      <p className="font-medium text-cinema-blue">Team Preferences</p>
                      <p className="text-xs text-muted-foreground">Cinematic style, 24fps, 4K export</p>
                    </div>
                    <div className="bg-studio-dark rounded p-2">
                      <p className="font-medium text-audio-green">Workflow Optimization</p>
                      <p className="text-xs text-muted-foreground">Audio sync automation enabled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "analytics" && (
            <div className="space-y-4">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <BarChart3 className="w-4 h-4 text-director-gold" />
                    <span>Project Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-studio-dark rounded p-2 text-center">
                      <p className="text-director-gold font-bold text-lg">47</p>
                      <p className="text-xs text-muted-foreground">Assets Created</p>
                    </div>
                    <div className="bg-studio-dark rounded p-2 text-center">
                      <p className="text-cinema-blue font-bold text-lg">12m</p>
                      <p className="text-xs text-muted-foreground">Content Duration</p>
                    </div>
                    <div className="bg-studio-dark rounded p-2 text-center">
                      <p className="text-audio-green font-bold text-lg">96%</p>
                      <p className="text-xs text-muted-foreground">Quality Score</p>
                    </div>
                    <div className="bg-studio-dark rounded p-2 text-center">
                      <p className="text-image-purple font-bold text-lg">$24</p>
                      <p className="text-xs text-muted-foreground">AI Cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "online": return "bg-audio-green";
    case "away": return "bg-director-gold";
    case "offline": return "bg-muted-foreground";
    default: return "bg-muted-foreground";
  }
}