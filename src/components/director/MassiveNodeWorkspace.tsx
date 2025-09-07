import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { NodeExpansionPanel } from './NodeExpansionPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Image, Video, Music, FileText, Users, Zap, Download, Play, Camera, Palette,
  TreePine, Car, Crown, Sword, Castle, Mountain, Scissors, Settings, Mic, Film,
  Sparkles, Eye, Clock, Target, Layers, Volume2, Search, Globe, Building,
  Coffee, Phone, Monitor, Keyboard, Lightbulb, Shield, Star, BookOpen,
  Calendar, MapPin, Briefcase, User, Clapperboard, Wand2, Cpu, Database,
  Cloud, Network, GitBranch, Code, Brain, Gamepad2, Headphones, Smartphone,
  Tablet, Laptop, Tv, Wifi, Bluetooth, Usb, HardDrive, Server, Router, Circle
} from 'lucide-react';

// Import assets
import neoDetectiveImg from '@/assets/neo-detective.jpg';
import policeStationImg from '@/assets/police-station.jpg';
import neonAlleyImg from '@/assets/neon-alley.jpg';
import cyberCityImg from '@/assets/cyber-city.jpg';
import storyboardOpeningImg from '@/assets/storyboard-opening.jpg';
import storyboardDiscoveryImg from '@/assets/storyboard-discovery.jpg';
import storyboardBriefingImg from '@/assets/storyboard-briefing.jpg';

// Custom node types
const NodeComponent = ({ data, selected }: any) => {
  const getNodeStyle = (type: string, isHighlighted: boolean = false) => {
    const baseStyle = "p-3 rounded-xl border-2 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md relative overflow-hidden";
    const highlightStyle = isHighlighted ? "ring-4 ring-yellow-400/60 ring-offset-2 ring-offset-transparent scale-110 z-50" : "";
    
    switch (type) {
      case 'script':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-blue-500/20 to-blue-700/30 text-white border-blue-400/50 shadow-blue-500/20`;
      case 'character':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-purple-500/20 to-purple-700/30 text-white border-purple-400/50 shadow-purple-500/20`;
      case 'environment':
      case 'scene':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-emerald-500/20 to-emerald-700/30 text-white border-emerald-400/50 shadow-emerald-500/20`;
      case 'prop':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-amber-500/20 to-amber-700/30 text-white border-amber-400/50 shadow-amber-500/20`;
      case 'video':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-red-500/20 to-red-700/30 text-white border-red-400/50 shadow-red-500/20`;
      case 'audio':
      case 'dialogue':
      case 'music':
      case 'sfx':
      case 'ambient':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-green-500/20 to-green-700/30 text-white border-green-400/50 shadow-green-500/20`;
      case 'effect':
      case 'transition':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-orange-500/20 to-orange-700/30 text-white border-orange-400/50 shadow-orange-500/20`;
      case 'processing':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-violet-500/20 to-violet-700/30 text-white border-violet-400/50 shadow-violet-500/20`;
      case 'finalcut':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-cyan-500/20 to-cyan-700/30 text-white border-cyan-400/50 shadow-cyan-500/20`;
      case 'master-timeline':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-r from-slate-700/30 via-slate-600/40 to-slate-700/30 text-white border-slate-300/60 shadow-2xl shadow-slate-500/30`;
      case 'storyboard':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-pink-500/20 to-pink-700/30 text-white border-pink-400/50 shadow-pink-500/20`;
      case 'timeline-section':
        return `${baseStyle} ${highlightStyle} bg-gradient-to-br from-indigo-500/20 to-indigo-700/30 text-white border-indigo-400/50 shadow-indigo-500/20`;
      default:
        return `${baseStyle} ${highlightStyle} bg-slate-700/20 text-white border-slate-400/50 shadow-slate-500/20`;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'script': return BookOpen;
      case 'character': return User;
      case 'environment': case 'scene': return Image;
      case 'prop': return Crown;
      case 'video': return Video;
      case 'audio': case 'dialogue': case 'music': case 'sfx': case 'ambient': return Volume2;
      case 'effect': case 'transition': return Sparkles;
      case 'processing': return Cpu;
      case 'finalcut': return Scissors;
      case 'master-timeline': return Film;
      case 'storyboard': return Clapperboard;
      case 'timeline-section': return Clock;
      default: return Circle;
    }
  };

  const Icon = getIcon(data.type);

  const isHighlighted = data.isHighlighted || false;

  return (
    <div 
      className={getNodeStyle(data.type, isHighlighted)} 
      style={{ 
        minWidth: data.type === 'master-timeline' ? '800px' : data.type === 'timeline-section' ? '120px' : '180px', 
        minHeight: data.type === 'master-timeline' ? '120px' : '100px' 
      }}
      onClick={() => data.onClick?.(data.id)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative flex items-start gap-2">
        <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-90" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs mb-1 truncate text-white">{data.label}</div>
          {data.preview && (
            <img 
              src={data.preview} 
              alt={data.label} 
              className="w-full h-16 object-cover rounded border border-white/20 mb-1 shadow-lg" 
            />
          )}
          {data.description && (
            <div className="text-xs opacity-90 mb-1 line-clamp-2 text-gray-100">{data.description}</div>
          )}
          <div className="flex flex-wrap gap-1">
            {data.aiModel && (
              <Badge variant="secondary" className="text-xs px-1 py-0 bg-black/40 text-white border-white/20">{data.aiModel}</Badge>
            )}
            {data.duration && (
              <Badge variant="outline" className="text-xs px-1 py-0 border-white/30 text-white bg-white/10">{data.duration}</Badge>
            )}
            {data.status && (
              <Badge 
                variant={data.status === 'ready' ? 'default' : data.status === 'generating' ? 'destructive' : 'secondary'}
                className="text-xs px-1 py-0 bg-black/40 text-white border-white/20"
              >
                {data.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function MassiveNodeWorkspace() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  // MASSIVE STORYBOARD SECTION (Top level - hundreds of visual planning nodes)
  const storyboardNodes = [
    // Act I Storyboards
    { id: 'storyboard-act1-overview', position: { x: 100, y: 50 }, data: { label: 'Act I Overview', type: 'storyboard', description: 'Complete Act 1 visual breakdown', preview: storyboardOpeningImg, status: 'complete' }},
    { id: 'storyboard-opening-rain', position: { x: 300, y: 50 }, data: { label: 'Opening Rain Shot', type: 'storyboard', description: 'Neo walking in neon-lit rain', preview: storyboardOpeningImg, status: 'complete' }},
    { id: 'storyboard-apartment-view', position: { x: 500, y: 50 }, data: { label: 'Apartment Skyline', type: 'storyboard', description: 'Neo looking out at city', preview: storyboardOpeningImg, status: 'complete' }},
    { id: 'storyboard-murder-discovery', position: { x: 700, y: 50 }, data: { label: 'Murder Discovery', type: 'storyboard', description: 'Finding Dr. Chen in alley', preview: storyboardDiscoveryImg, status: 'complete' }},
    { id: 'storyboard-crime-scene', position: { x: 900, y: 50 }, data: { label: 'Crime Scene Analysis', type: 'storyboard', description: 'Holographic evidence scan', preview: storyboardDiscoveryImg, status: 'complete' }},
    { id: 'storyboard-police-arrival', position: { x: 1100, y: 50 }, data: { label: 'Police Arrival', type: 'storyboard', description: 'Squad cars in alley', preview: storyboardBriefingImg, status: 'complete' }},
    { id: 'storyboard-briefing-room', position: { x: 1300, y: 50 }, data: { label: 'Briefing Room', type: 'storyboard', description: 'Team meeting setup', preview: storyboardBriefingImg, status: 'complete' }},
    { id: 'storyboard-aria-intro', position: { x: 1500, y: 50 }, data: { label: 'ARIA Introduction', type: 'storyboard', description: 'AI hologram materializes', status: 'complete' }},
    { id: 'storyboard-first-clue', position: { x: 1700, y: 50 }, data: { label: 'First Clue', type: 'storyboard', description: 'Neural chip evidence', status: 'complete' }},
    { id: 'storyboard-chase-begin', position: { x: 1900, y: 50 }, data: { label: 'Chase Begins', type: 'storyboard', description: 'Suspect flees scene', status: 'complete' }},
    
    // Act II Storyboards  
    { id: 'storyboard-act2-overview', position: { x: 100, y: 150 }, data: { label: 'Act II Overview', type: 'storyboard', description: 'Mid-film tension build', status: 'complete' }},
    { id: 'storyboard-underground-meet', position: { x: 300, y: 150 }, data: { label: 'Underground Meeting', type: 'storyboard', description: 'Ghost hacker contact', status: 'complete' }},
    { id: 'storyboard-corpo-tower', position: { x: 500, y: 150 }, data: { label: 'Corporate Tower', type: 'storyboard', description: 'Infiltration planning', status: 'complete' }},
    { id: 'storyboard-server-room', position: { x: 700, y: 150 }, data: { label: 'Server Room Break-in', type: 'storyboard', description: 'Data extraction scene', status: 'complete' }},
    { id: 'storyboard-revelation', position: { x: 900, y: 150 }, data: { label: 'Major Revelation', type: 'storyboard', description: 'Viktor conspiracy exposed', status: 'complete' }},
    { id: 'storyboard-aria-evolution', position: { x: 1100, y: 150 }, data: { label: 'ARIA Evolution', type: 'storyboard', description: 'AI gains consciousness', status: 'complete' }},
    { id: 'storyboard-betrayal', position: { x: 1300, y: 150 }, data: { label: 'Betrayal Scene', type: 'storyboard', description: 'Trusted ally turns', status: 'complete' }},
    { id: 'storyboard-chase-extended', position: { x: 1500, y: 150 }, data: { label: 'Extended Chase', type: 'storyboard', description: 'Multi-level pursuit', status: 'complete' }},
    { id: 'storyboard-near-death', position: { x: 1700, y: 150 }, data: { label: 'Near Death', type: 'storyboard', description: 'Neo almost killed', status: 'complete' }},
    { id: 'storyboard-ghost-sacrifice', position: { x: 1900, y: 150 }, data: { label: 'Ghost Sacrifice', type: 'storyboard', description: 'Hacker saves Neo', status: 'complete' }},

    // Act III Storyboards
    { id: 'storyboard-act3-overview', position: { x: 100, y: 250 }, data: { label: 'Act III Overview', type: 'storyboard', description: 'Final confrontation prep', status: 'complete' }},
    { id: 'storyboard-final-approach', position: { x: 300, y: 250 }, data: { label: 'Final Approach', type: 'storyboard', description: 'Viktor tower infiltration', status: 'complete' }},
    { id: 'storyboard-elevator-tension', position: { x: 500, y: 250 }, data: { label: 'Elevator Tension', type: 'storyboard', description: 'Rising to final floor', status: 'complete' }},
    { id: 'storyboard-penthouse-reveal', position: { x: 700, y: 250 }, data: { label: 'Penthouse Reveal', type: 'storyboard', description: 'Viktor awaiting Neo', status: 'complete' }},
    { id: 'storyboard-final-dialogue', position: { x: 900, y: 250 }, data: { label: 'Final Dialogue', type: 'storyboard', description: 'Truth about Dr. Chen', status: 'complete' }},
    { id: 'storyboard-rooftop-fight', position: { x: 1100, y: 250 }, data: { label: 'Rooftop Battle', type: 'storyboard', description: 'Rain-soaked combat', status: 'complete' }},
    { id: 'storyboard-aria-assist', position: { x: 1300, y: 250 }, data: { label: 'ARIA Assists', type: 'storyboard', description: 'AI helps in fight', status: 'complete' }},
    { id: 'storyboard-viktor-fall', position: { x: 1500, y: 250 }, data: { label: 'Viktor Falls', type: 'storyboard', description: 'Villain defeat scene', status: 'complete' }},
    { id: 'storyboard-dawn-break', position: { x: 1700, y: 250 }, data: { label: 'Dawn Breaks', type: 'storyboard', description: 'Neo walks away at sunrise', status: 'complete' }},
    { id: 'storyboard-credits-prep', position: { x: 1900, y: 250 }, data: { label: 'Credits Setup', type: 'storyboard', description: 'Final city panorama', status: 'complete' }},
  ];

  // MASSIVE Production nodes with proper spacing
  const initialNodes: Node[] = [
    ...storyboardNodes,

    // SCRIPT ARCHITECTURE - Central nervous system (far left)
    {
      id: 'master-script',
      type: 'input',
      position: { x: 50, y: 500 },
      data: {
        label: 'Master Script - Neo Detective',
        type: 'script',
        description: 'Complete 120-page feature screenplay',
        aiModel: 'GPT-4',
        status: 'complete'
      }
    },

    // Script Chapters (Acts) - Proper spacing
    { id: 'script-act1', position: { x: 250, y: 400 }, data: { label: 'Act I - Setup', type: 'script', description: 'Pages 1-30, Character introduction', status: 'complete' }},
    { id: 'script-act2a', position: { x: 250, y: 550 }, data: { label: 'Act IIA - Rising Action', type: 'script', description: 'Pages 31-60, Conflict escalation', status: 'complete' }},
    { id: 'script-act2b', position: { x: 250, y: 700 }, data: { label: 'Act IIB - Midpoint', type: 'script', description: 'Pages 61-90, Major revelation', status: 'complete' }},
    { id: 'script-act3', position: { x: 250, y: 850 }, data: { label: 'Act III - Resolution', type: 'script', description: 'Pages 91-120, Climax & ending', status: 'complete' }},

    // Scene Breakdown (Detailed script scenes) - Better spacing
    { id: 'scene-01-opening', position: { x: 450, y: 350 }, data: { label: 'Scene 1: Rain Opening', type: 'script', description: 'INT. NEO APARTMENT - NIGHT', status: 'complete' }},
    { id: 'scene-02-murder', position: { x: 450, y: 450 }, data: { label: 'Scene 2: Murder Discovery', type: 'script', description: 'EXT. ALLEY - NIGHT', status: 'complete' }},
    { id: 'scene-03-briefing', position: { x: 450, y: 550 }, data: { label: 'Scene 3: Police Briefing', type: 'script', description: 'INT. POLICE STATION - DAY', status: 'complete' }},
    { id: 'scene-04-first-clue', position: { x: 450, y: 650 }, data: { label: 'Scene 4: First Clue', type: 'script', description: 'INT. CRIME LAB - DAY', status: 'complete' }},
    { id: 'scene-05-chase', position: { x: 450, y: 750 }, data: { label: 'Scene 5: First Chase', type: 'script', description: 'EXT. NEON STREETS - NIGHT', status: 'complete' }},
    { id: 'scene-06-ghost-meet', position: { x: 450, y: 850 }, data: { label: 'Scene 6: Ghost Meeting', type: 'script', description: 'INT. UNDERGROUND CLUB - NIGHT', status: 'complete' }},
    { id: 'scene-07-infiltration', position: { x: 450, y: 950 }, data: { label: 'Scene 7: Corporate Infiltration', type: 'script', description: 'INT. CORPORATE TOWER - DAY', status: 'complete' }},
    { id: 'scene-08-revelation', position: { x: 450, y: 1050 }, data: { label: 'Scene 8: Major Revelation', type: 'script', description: 'INT. SERVER ROOM - NIGHT', status: 'complete' }},
    { id: 'scene-09-final-chase', position: { x: 450, y: 1150 }, data: { label: 'Scene 9: Final Chase', type: 'script', description: 'EXT. CITY ROOFTOPS - DAWN', status: 'complete' }},
    { id: 'scene-10-confrontation', position: { x: 450, y: 1250 }, data: { label: 'Scene 10: Final Confrontation', type: 'script', description: 'EXT. TOWER ROOFTOP - DAWN', status: 'complete' }},
    
    // CHARACTER DEPARTMENT (Main cast with full details) - Better spacing
    { id: 'char-neo-kane', position: { x: 700, y: 350 }, data: { 
      label: 'Detective Kane', 
      type: 'character', 
      description: 'Lead protagonist, cyberpunk detective with haunted past',
      preview: neoDetectiveImg,
      status: 'ready' 
    }},
    { id: 'char-aria-ai', position: { x: 700, y: 500 }, data: { 
      label: 'ARIA (AI Partner)', 
      type: 'character', 
      description: 'Holographic AI assistant with evolving consciousness',
      aiModel: 'Character.AI',
      status: 'ready' 
    }},
    { id: 'char-viktor-villain', position: { x: 700, y: 650 }, data: { 
      label: 'Viktor Nashimoto', 
      type: 'character', 
      description: 'Corporate crime syndicate leader, main antagonist',
      status: 'ready' 
    }},
    { id: 'char-ghost-hacker', position: { x: 700, y: 800 }, data: { 
      label: 'Ghost (Hacker)', 
      type: 'character', 
      description: 'Underground informant, androgynous tech expert',
      status: 'ready' 
    }},
    { id: 'char-dr-chen', position: { x: 700, y: 950 }, data: { 
      label: 'Dr. Sarah Chen', 
      type: 'character', 
      description: 'Murdered scientist, key to the mystery',
      status: 'ready' 
    }},

    // Supporting Characters - Spaced out properly
    { id: 'char-captain-torres', position: { x: 700, y: 1100 }, data: { label: 'Captain Torres', type: 'character', description: 'Police captain, Kanes boss', status: 'ready' }},
    { id: 'char-lab-tech', position: { x: 700, y: 1250 }, data: { label: 'Lab Technician Maya', type: 'character', description: 'Crime scene analyst', status: 'ready' }},
    { id: 'char-corpo-exec', position: { x: 700, y: 1400 }, data: { label: 'Executive Williams', type: 'character', description: 'Corporate executive', status: 'ready' }},
    { id: 'char-street-vendor', position: { x: 700, y: 1550 }, data: { label: 'Street Vendor', type: 'character', description: 'Witness to crime', status: 'ready' }},
    { id: 'char-security-guard', position: { x: 700, y: 1700 }, data: { label: 'Security Guard', type: 'character', description: 'Corporate tower security', status: 'ready' }},

    // ENVIRONMENT DEPARTMENT (Locations with full detail) - Better spacing
    { id: 'env-neo-apartment', position: { x: 950, y: 350 }, data: { 
      label: 'Neos Apartment', 
      type: 'environment', 
      description: 'Minimalist cyberpunk living space with city view',
      aiModel: 'SDXL',
      status: 'generated' 
    }},
    { id: 'env-police-station', position: { x: 950, y: 500 }, data: { 
      label: 'Police Station', 
      type: 'environment', 
      description: 'High-tech police facility with holographic displays',
      preview: policeStationImg,
      aiModel: 'DALL-E 3',
      status: 'generated' 
    }},
    { id: 'env-neon-alley', position: { x: 950, y: 650 }, data: { 
      label: 'Neon Alley', 
      type: 'environment', 
      description: 'Rain-soaked alley with neon signs and puddle reflections',
      preview: neonAlleyImg,
      aiModel: 'Midjourney',
      status: 'generated' 
    }},
    { id: 'env-cyber-city', position: { x: 950, y: 800 }, data: { 
      label: 'Cyber City Skyline', 
      type: 'environment', 
      description: 'Sprawling metropolis with flying cars and neon towers',
      preview: cyberCityImg,
      aiModel: 'Flux Pro',
      status: 'generated' 
    }},
    { id: 'env-corporate-tower', position: { x: 950, y: 950 }, data: { 
      label: 'Corporate Tower', 
      type: 'environment', 
      description: 'Glass corporate headquarters piercing smoggy sky',
      aiModel: 'Google Imagen',
      status: 'generating' 
    }},

    // More environments - Spaced out
    { id: 'env-underground-lab', position: { x: 950, y: 1100 }, data: { label: 'Underground Lab', type: 'environment', description: 'Secret research facility', aiModel: 'SDXL', status: 'pending' }},
    { id: 'env-rooftop-chase', position: { x: 950, y: 1250 }, data: { label: 'Rooftop Chase Area', type: 'environment', description: 'Building tops for action sequence', aiModel: 'RunwayML', status: 'pending' }},
    { id: 'env-nightclub', position: { x: 950, y: 1400 }, data: { label: 'Underground Nightclub', type: 'environment', description: 'Where Ghost operates from', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'env-crime-scene', position: { x: 950, y: 1550 }, data: { label: 'Crime Scene', type: 'environment', description: 'Where Dr. Chen was murdered', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'env-server-room', position: { x: 950, y: 1700 }, data: { label: 'Server Room', type: 'environment', description: 'Corporate data center', aiModel: 'Stable Diffusion', status: 'pending' }},

    // PROPS DEPARTMENT (Objects and items) - Better spacing
    { id: 'prop-hologram-evidence', position: { x: 1200, y: 350 }, data: { label: 'Crime Hologram', type: 'prop', description: 'Flickering crime scene reconstruction', aiModel: 'Nano Banana', status: 'generated' }},
    { id: 'prop-neural-chip', position: { x: 1200, y: 500 }, data: { label: 'Neural Interface Chip', type: 'prop', description: 'Advanced brain-computer interface', aiModel: 'SDXL', status: 'generated' }},
    { id: 'prop-plasma-gun', position: { x: 1200, y: 650 }, data: { label: 'Plasma Pistol', type: 'prop', description: 'Futuristic sidearm with energy cells', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'prop-detective-badge', position: { x: 1200, y: 800 }, data: { label: 'Detective Badge', type: 'prop', description: 'Holographic police identification', aiModel: 'Midjourney', status: 'generated' }},
    { id: 'prop-data-pad', position: { x: 1200, y: 950 }, data: { label: 'Data Pad', type: 'prop', description: 'Transparent computing device', aiModel: 'Flux', status: 'pending' }},

    // More props - Spaced out
    { id: 'prop-flying-car', position: { x: 1200, y: 1100 }, data: { label: 'Police Flying Car', type: 'prop', description: 'Hover vehicle for chase scenes', aiModel: 'Google Veo', status: 'pending' }},
    { id: 'prop-evidence-case', position: { x: 1200, y: 1250 }, data: { label: 'Evidence Container', type: 'prop', description: 'Secure evidence storage', aiModel: 'SDXL', status: 'generated' }},
    { id: 'prop-holo-display', position: { x: 1200, y: 1400 }, data: { label: 'Holographic Display', type: 'prop', description: 'Floating interface screens', aiModel: 'Nano Banana', status: 'generated' }},
    { id: 'prop-rain-coat', position: { x: 1200, y: 1550 }, data: { label: 'Neo Detective Coat', type: 'prop', description: 'Iconic detective trench coat', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'prop-cyber-glasses', position: { x: 1200, y: 1700 }, data: { label: 'AR Glasses', type: 'prop', description: 'Augmented reality eyewear', aiModel: 'Midjourney', status: 'pending' }},

    // SCENE COMPOSITION NODES (Complex scene assembly) - Better spacing
    { id: 'scene-comp-opening', position: { x: 1450, y: 350 }, data: { 
      label: 'Opening Rain Scene', 
      type: 'scene', 
      description: 'Neo walking through neon-lit rain - character + environment + props',
      aiModel: 'Google Veo 3',
      status: 'ready' 
    }},
    { id: 'scene-comp-discovery', position: { x: 1450, y: 500 }, data: { 
      label: 'Crime Discovery Scene', 
      type: 'scene', 
      description: 'Neo finding the body + holographic evidence',
      aiModel: 'RunwayML Gen-4',
      status: 'generating' 
    }},
    { id: 'scene-comp-briefing', position: { x: 1450, y: 650 }, data: { 
      label: 'Police Briefing Scene', 
      type: 'scene', 
      description: 'Team meeting with captain and ARIA',
      aiModel: 'Pika Labs',
      status: 'pending' 
    }},
    { id: 'scene-comp-chase1', position: { x: 1450, y: 800 }, data: { 
      label: 'First Chase Scene', 
      type: 'scene', 
      description: 'High-speed pursuit through neon streets',
      aiModel: 'Google Veo 3',
      status: 'pending' 
    }},
    { id: 'scene-comp-hacker-meet', position: { x: 1450, y: 950 }, data: { 
      label: 'Ghost Meeting Scene', 
      type: 'scene', 
      description: 'Underground meeting with hacker informant',
      aiModel: 'RunwayML Gen-4',
      status: 'pending' 
    }},

    // More complex scenes - Spaced out
    { id: 'scene-comp-lab-infiltration', position: { x: 1450, y: 1100 }, data: { label: 'Lab Infiltration', type: 'scene', description: 'Sneaking into corporate facility', aiModel: 'Minimax Hailuo', status: 'pending' }},
    { id: 'scene-comp-villain-reveal', position: { x: 1450, y: 1250 }, data: { label: 'Villain Reveal', type: 'scene', description: 'Viktor exposing his master plan', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'scene-comp-rooftop-fight', position: { x: 1450, y: 1400 }, data: { label: 'Rooftop Battle', type: 'scene', description: 'Final confrontation in the rain', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'scene-comp-resolution', position: { x: 1450, y: 1550 }, data: { label: 'Resolution Scene', type: 'scene', description: 'Neo walking away as dawn breaks', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'scene-comp-credits', position: { x: 1450, y: 1700 }, data: { label: 'End Credits Scene', type: 'scene', description: 'City skyline with credits overlay', aiModel: 'Stable Video', status: 'pending' }},

    // VIDEO GENERATION NODES (Converting scenes to video) - Better spacing
    { id: 'video-seq-001', position: { x: 1700, y: 350 }, data: { label: 'Sequence 001 - Opening', type: 'video', duration: '45.0s', aiModel: 'Google Veo 3', status: 'generating' }},
    { id: 'video-seq-002', position: { x: 1700, y: 500 }, data: { label: 'Sequence 002 - Discovery', type: 'video', duration: '38.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-003', position: { x: 1700, y: 650 }, data: { label: 'Sequence 003 - Briefing', type: 'video', duration: '42.0s', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'video-seq-004', position: { x: 1700, y: 800 }, data: { label: 'Sequence 004 - First Chase', type: 'video', duration: '52.0s', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'video-seq-005', position: { x: 1700, y: 950 }, data: { label: 'Sequence 005 - Hacker Meet', type: 'video', duration: '33.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-006', position: { x: 1700, y: 1100 }, data: { label: 'Sequence 006 - Lab Break-in', type: 'video', duration: '47.0s', aiModel: 'Minimax Hailuo', status: 'pending' }},
    { id: 'video-seq-007', position: { x: 1700, y: 1250 }, data: { label: 'Sequence 007 - Revelation', type: 'video', duration: '41.0s', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'video-seq-008', position: { x: 1700, y: 1400 }, data: { label: 'Sequence 008 - Rooftop Fight', type: 'video', duration: '67.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-009', position: { x: 1700, y: 1550 }, data: { label: 'Sequence 009 - Resolution', type: 'video', duration: '29.0s', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'video-seq-010', position: { x: 1700, y: 1700 }, data: { label: 'Sequence 010 - Credits', type: 'video', duration: '120.0s', aiModel: 'Stable Video', status: 'pending' }},

    // MASTER TIMELINE AT BOTTOM (Film strip style)
    {
      id: 'master-timeline',
      position: { x: 100, y: 1900 },
      data: {
        label: 'MASTER TIMELINE - Neo Detective Episode',
        type: 'master-timeline',
        description: 'Complete 120-minute feature film timeline with all sequences',
        duration: '120min',
        status: 'assembling'
      }
    },

    // Timeline sections (clickable film strip sections)
    { id: 'timeline-act1', position: { x: 100, y: 2050 }, data: { label: 'ACT I', type: 'timeline-section', description: '0-30min', duration: '30min', status: 'complete' }},
    { id: 'timeline-act2a', position: { x: 250, y: 2050 }, data: { label: 'ACT IIA', type: 'timeline-section', description: '30-60min', duration: '30min', status: 'complete' }},
    { id: 'timeline-act2b', position: { x: 400, y: 2050 }, data: { label: 'ACT IIB', type: 'timeline-section', description: '60-90min', duration: '30min', status: 'complete' }},
    { id: 'timeline-act3', position: { x: 550, y: 2050 }, data: { label: 'ACT III', type: 'timeline-section', description: '90-120min', duration: '30min', status: 'complete' }},
  ];

  // Massive edge connections showing proper workflow
  const initialEdges: Edge[] = [
    // Storyboard to script connections
    { id: 'storyboard-to-script-1', source: 'storyboard-opening-rain', target: 'scene-01-opening', type: 'straight' },
    { id: 'storyboard-to-script-2', source: 'storyboard-murder-discovery', target: 'scene-02-murder', type: 'straight' },
    { id: 'storyboard-to-script-3', source: 'storyboard-briefing-room', target: 'scene-03-briefing', type: 'straight' },

    // Script to character connections
    { id: 'script-to-char-1', source: 'master-script', target: 'char-neo-kane', type: 'straight' },
    { id: 'script-to-char-2', source: 'master-script', target: 'char-aria-ai', type: 'straight' },
    { id: 'script-to-char-3', source: 'master-script', target: 'char-viktor-villain', type: 'straight' },
    { id: 'script-to-char-4', source: 'master-script', target: 'char-ghost-hacker', type: 'straight' },

    // Script to environment connections
    { id: 'script-to-env-1', source: 'scene-01-opening', target: 'env-neo-apartment', type: 'straight' },
    { id: 'script-to-env-2', source: 'scene-02-murder', target: 'env-neon-alley', type: 'straight' },
    { id: 'script-to-env-3', source: 'scene-03-briefing', target: 'env-police-station', type: 'straight' },

    // Character and environment to scene composition
    { id: 'char-env-to-scene-1', source: 'char-neo-kane', target: 'scene-comp-opening', type: 'straight' },
    { id: 'char-env-to-scene-2', source: 'env-neo-apartment', target: 'scene-comp-opening', type: 'straight' },
    { id: 'char-env-to-scene-3', source: 'prop-rain-coat', target: 'scene-comp-opening', type: 'straight' },

    // Scene composition to video
    { id: 'scene-to-video-1', source: 'scene-comp-opening', target: 'video-seq-001', type: 'straight' },
    { id: 'scene-to-video-2', source: 'scene-comp-discovery', target: 'video-seq-002', type: 'straight' },
    { id: 'scene-to-video-3', source: 'scene-comp-briefing', target: 'video-seq-003', type: 'straight' },

    // Video sequences to timeline sections
    { id: 'video-to-timeline-1', source: 'video-seq-001', target: 'timeline-act1', type: 'straight' },
    { id: 'video-to-timeline-2', source: 'video-seq-002', target: 'timeline-act1', type: 'straight' },
    { id: 'video-to-timeline-3', source: 'video-seq-003', target: 'timeline-act1', type: 'straight' },

    // Timeline sections to master timeline
    { id: 'timeline-to-master-1', source: 'timeline-act1', target: 'master-timeline', type: 'straight' },
    { id: 'timeline-to-master-2', source: 'timeline-act2a', target: 'master-timeline', type: 'straight' },
    { id: 'timeline-to-master-3', source: 'timeline-act2b', target: 'master-timeline', type: 'straight' },
    { id: 'timeline-to-master-4', source: 'timeline-act3', target: 'master-timeline', type: 'straight' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsExpanded(true);
    
    // Highlight connected nodes when clicking timeline sections
    if (node.data.type === 'timeline-section') {
      const connectedNodes = edges
        .filter(edge => edge.target === node.id || edge.source === node.id)
        .map(edge => edge.source === node.id ? edge.target : edge.source);
      setHighlightedNodes(connectedNodes);
      
      // Update nodes to show highlight state
      setNodes(currentNodes => 
        currentNodes.map(n => ({
          ...n,
          data: {
            ...n.data,
            isHighlighted: connectedNodes.includes(n.id) || n.id === node.id
          }
        }))
      );
    } else {
      setHighlightedNodes([]);
      // Clear all highlights
      setNodes(currentNodes => 
        currentNodes.map(n => ({
          ...n,
          data: {
            ...n.data,
            isHighlighted: false
          }
        }))
      );
    }
  }, [edges, setNodes]);

  const nodeTypes = {
    default: NodeComponent,
  };

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Grid overlay background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#60a5fa', strokeWidth: 2 },
          markerEnd: {
            type: 'arrowclosed',
            color: '#60a5fa',
          },
        }}
        connectionLineStyle={{ stroke: '#60a5fa', strokeWidth: 2 }}
      >
        <Controls className="bg-slate-900/90 border-slate-700" />
        <MiniMap 
          className="bg-slate-900/90 border-slate-700" 
          nodeColor={(node) => {
            if (highlightedNodes.includes(node.id)) return '#fbbf24';
            switch (node.data.type) {
              case 'script': return '#3b82f6';
              case 'character': return '#8b5cf6';
              case 'environment': case 'scene': return '#10b981';
              case 'prop': return '#f59e0b';
              case 'video': return '#ef4444';
              case 'audio': return '#22c55e';
              case 'storyboard': return '#ec4899';
              case 'timeline-section': return '#6366f1';
              case 'master-timeline': return '#64748b';
              default: return '#64748b';
            }
          }}
        />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} className="opacity-30" />
      </ReactFlow>

      {/* Node expansion panel */}
      {isExpanded && selectedNode && (
        <NodeExpansionPanel
          node={selectedNode}
          isOpen={isExpanded}
          onClose={() => {
            setIsExpanded(false);
            setSelectedNode(null);
            setHighlightedNodes([]);
          }}
        />
      )}

      {/* Timeline Navigation Helper */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
        <div className="text-white text-sm font-semibold mb-2">Timeline Navigation</div>
        <div className="text-slate-300 text-xs">
          Click timeline sections to highlight connected nodes
        </div>
      </div>
    </div>
  );
}