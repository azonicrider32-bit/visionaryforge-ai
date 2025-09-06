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

// Custom node types
const NodeComponent = ({ data, selected }: any) => {
  const getNodeStyle = (type: string) => {
    const baseStyle = "p-4 rounded-lg border-2 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer";
    
    switch (type) {
      case 'script':
        return `${baseStyle} bg-gradient-to-br from-primary to-primary-glow text-white border-primary-glow`;
      case 'character':
        return `${baseStyle} bg-gradient-to-br from-accent to-accent/80 text-white border-accent-glow`;
      case 'environment':
      case 'scene':
        return `${baseStyle} bg-gradient-to-br from-secondary to-secondary/80 text-white border-secondary-glow`;
      case 'prop':
        return `${baseStyle} bg-gradient-to-br from-muted to-muted/80 text-foreground border-border`;
      case 'video':
        return `${baseStyle} bg-gradient-to-br from-destructive to-destructive/80 text-white border-destructive`;
      case 'audio':
      case 'dialogue':
      case 'music':
      case 'sfx':
      case 'ambient':
        return `${baseStyle} bg-gradient-to-br from-green-600 to-green-500 text-white border-green-400`;
      case 'effect':
      case 'transition':
        return `${baseStyle} bg-gradient-to-br from-orange-600 to-orange-500 text-white border-orange-400`;
      case 'processing':
        return `${baseStyle} bg-gradient-to-br from-purple-600 to-purple-500 text-white border-purple-400`;
      case 'finalcut':
        return `${baseStyle} bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-400`;
      case 'master-timeline':
        return `${baseStyle} bg-gradient-to-r from-primary via-primary-glow to-secondary text-white border-primary-glow shadow-xl`;
      default:
        return `${baseStyle} bg-card text-card-foreground border-border`;
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
      default: return Circle;
    }
  };

  const Icon = getIcon(data.type);

  return (
    <div className={getNodeStyle(data.type)} style={{ minWidth: '200px' }}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1 truncate">{data.label}</div>
          {data.preview && (
            <img 
              src={data.preview} 
              alt={data.label} 
              className="w-full h-24 object-cover rounded border mb-2" 
            />
          )}
          {data.description && (
            <div className="text-xs opacity-80 mb-2 line-clamp-2">{data.description}</div>
          )}
          <div className="flex flex-wrap gap-1">
            {data.aiModel && (
              <Badge variant="secondary" className="text-xs px-1 py-0">{data.aiModel}</Badge>
            )}
            {data.duration && (
              <Badge variant="outline" className="text-xs px-1 py-0">{data.duration}</Badge>
            )}
            {data.status && (
              <Badge 
                variant={data.status === 'ready' ? 'default' : data.status === 'generating' ? 'destructive' : 'secondary'}
                className="text-xs px-1 py-0"
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

  // Massive nodes array with hundreds of production nodes
  const initialNodes: Node[] = [
    // SCRIPT ARCHITECTURE - Central nervous system (far left)
    {
      id: 'master-script',
      type: 'input',
      position: { x: 50, y: 400 },
      data: {
        label: 'Master Script - Neo Detective',
        type: 'script',
        description: 'Complete 120-page feature screenplay',
        aiModel: 'GPT-4',
        status: 'complete'
      }
    },

    // Script Chapters (Acts)
    { id: 'script-act1', position: { x: 200, y: 200 }, data: { label: 'Act I - Setup', type: 'script', description: 'Pages 1-30, Character introduction', status: 'complete' }},
    { id: 'script-act2a', position: { x: 200, y: 350 }, data: { label: 'Act IIA - Rising Action', type: 'script', description: 'Pages 31-60, Conflict escalation', status: 'complete' }},
    { id: 'script-act2b', position: { x: 200, y: 500 }, data: { label: 'Act IIB - Midpoint', type: 'script', description: 'Pages 61-90, Major revelation', status: 'complete' }},
    { id: 'script-act3', position: { x: 200, y: 650 }, data: { label: 'Act III - Resolution', type: 'script', description: 'Pages 91-120, Climax & ending', status: 'complete' }},

    // Scene Breakdown (Detailed script scenes)
    { id: 'scene-01-opening', position: { x: 350, y: 100 }, data: { label: 'Scene 1: Rain Opening', type: 'script', description: 'INT. NEO APARTMENT - NIGHT', status: 'complete' }},
    { id: 'scene-02-murder', position: { x: 350, y: 150 }, data: { label: 'Scene 2: Murder Discovery', type: 'script', description: 'EXT. ALLEY - NIGHT', status: 'complete' }},
    { id: 'scene-03-briefing', position: { x: 350, y: 200 }, data: { label: 'Scene 3: Police Briefing', type: 'script', description: 'INT. POLICE STATION - DAY', status: 'complete' }},
    { id: 'scene-04-first-clue', position: { x: 350, y: 250 }, data: { label: 'Scene 4: First Clue', type: 'script', description: 'INT. CRIME LAB - DAY', status: 'complete' }},
    { id: 'scene-05-chase', position: { x: 350, y: 300 }, data: { label: 'Scene 5: First Chase', type: 'script', description: 'EXT. NEON STREETS - NIGHT', status: 'complete' }},
    
    // CHARACTER DEPARTMENT (Main cast with full details)
    { id: 'char-neo-kane', position: { x: 500, y: 150 }, data: { 
      label: 'Detective Kane', 
      type: 'character', 
      description: 'Lead protagonist, cyberpunk detective with haunted past',
      preview: neoDetectiveImg,
      status: 'ready' 
    }},
    { id: 'char-aria-ai', position: { x: 500, y: 250 }, data: { 
      label: 'ARIA (AI Partner)', 
      type: 'character', 
      description: 'Holographic AI assistant with evolving consciousness',
      aiModel: 'Character.AI',
      status: 'ready' 
    }},
    { id: 'char-viktor-villain', position: { x: 500, y: 350 }, data: { 
      label: 'Viktor Nashimoto', 
      type: 'character', 
      description: 'Corporate crime syndicate leader, main antagonist',
      status: 'ready' 
    }},
    { id: 'char-ghost-hacker', position: { x: 500, y: 450 }, data: { 
      label: 'Ghost (Hacker)', 
      type: 'character', 
      description: 'Underground informant, androgynous tech expert',
      status: 'ready' 
    }},
    { id: 'char-dr-chen', position: { x: 500, y: 550 }, data: { 
      label: 'Dr. Sarah Chen', 
      type: 'character', 
      description: 'Murdered scientist, key to the mystery',
      status: 'ready' 
    }},

    // Supporting Characters
    { id: 'char-captain-torres', position: { x: 500, y: 650 }, data: { label: 'Captain Torres', type: 'character', description: 'Police captain, Kanes boss', status: 'ready' }},
    { id: 'char-lab-tech', position: { x: 500, y: 750 }, data: { label: 'Lab Technician Maya', type: 'character', description: 'Crime scene analyst', status: 'ready' }},
    { id: 'char-corpo-exec', position: { x: 500, y: 850 }, data: { label: 'Executive Williams', type: 'character', description: 'Corporate executive', status: 'ready' }},
    { id: 'char-street-vendor', position: { x: 500, y: 950 }, data: { label: 'Street Vendor', type: 'character', description: 'Witness to crime', status: 'ready' }},
    { id: 'char-security-guard', position: { x: 500, y: 1050 }, data: { label: 'Security Guard', type: 'character', description: 'Corporate tower security', status: 'ready' }},

    // ENVIRONMENT DEPARTMENT (Locations with full detail)
    { id: 'env-neo-apartment', position: { x: 700, y: 100 }, data: { 
      label: 'Neos Apartment', 
      type: 'environment', 
      description: 'Minimalist cyberpunk living space with city view',
      aiModel: 'SDXL',
      status: 'generated' 
    }},
    { id: 'env-police-station', position: { x: 700, y: 200 }, data: { 
      label: 'Police Station', 
      type: 'environment', 
      description: 'High-tech police facility with holographic displays',
      preview: policeStationImg,
      aiModel: 'DALL-E 3',
      status: 'generated' 
    }},
    { id: 'env-neon-alley', position: { x: 700, y: 300 }, data: { 
      label: 'Neon Alley', 
      type: 'environment', 
      description: 'Rain-soaked alley with neon signs and puddle reflections',
      preview: neonAlleyImg,
      aiModel: 'Midjourney',
      status: 'generated' 
    }},
    { id: 'env-cyber-city', position: { x: 700, y: 400 }, data: { 
      label: 'Cyber City Skyline', 
      type: 'environment', 
      description: 'Sprawling metropolis with flying cars and neon towers',
      preview: cyberCityImg,
      aiModel: 'Flux Pro',
      status: 'generated' 
    }},
    { id: 'env-corporate-tower', position: { x: 700, y: 500 }, data: { 
      label: 'Corporate Tower', 
      type: 'environment', 
      description: 'Glass corporate headquarters piercing smoggy sky',
      aiModel: 'Google Imagen',
      status: 'generating' 
    }},

    // More environments
    { id: 'env-underground-lab', position: { x: 700, y: 600 }, data: { label: 'Underground Lab', type: 'environment', description: 'Secret research facility', aiModel: 'SDXL', status: 'pending' }},
    { id: 'env-rooftop-chase', position: { x: 700, y: 700 }, data: { label: 'Rooftop Chase Area', type: 'environment', description: 'Building tops for action sequence', aiModel: 'RunwayML', status: 'pending' }},
    { id: 'env-nightclub', position: { x: 700, y: 800 }, data: { label: 'Underground Nightclub', type: 'environment', description: 'Where Ghost operates from', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'env-crime-scene', position: { x: 700, y: 900 }, data: { label: 'Crime Scene', type: 'environment', description: 'Where Dr. Chen was murdered', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'env-server-room', position: { x: 700, y: 1000 }, data: { label: 'Server Room', type: 'environment', description: 'Corporate data center', aiModel: 'Stable Diffusion', status: 'pending' }},

    // PROPS DEPARTMENT (Objects and items)
    { id: 'prop-hologram-evidence', position: { x: 900, y: 100 }, data: { label: 'Crime Hologram', type: 'prop', description: 'Flickering crime scene reconstruction', aiModel: 'Nano Banana', status: 'generated' }},
    { id: 'prop-neural-chip', position: { x: 900, y: 200 }, data: { label: 'Neural Interface Chip', type: 'prop', description: 'Advanced brain-computer interface', aiModel: 'SDXL', status: 'generated' }},
    { id: 'prop-plasma-gun', position: { x: 900, y: 300 }, data: { label: 'Plasma Pistol', type: 'prop', description: 'Futuristic sidearm with energy cells', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'prop-detective-badge', position: { x: 900, y: 400 }, data: { label: 'Detective Badge', type: 'prop', description: 'Holographic police identification', aiModel: 'Midjourney', status: 'generated' }},
    { id: 'prop-data-pad', position: { x: 900, y: 500 }, data: { label: 'Data Pad', type: 'prop', description: 'Transparent computing device', aiModel: 'Flux', status: 'pending' }},

    // More props
    { id: 'prop-flying-car', position: { x: 900, y: 600 }, data: { label: 'Police Flying Car', type: 'prop', description: 'Hover vehicle for chase scenes', aiModel: 'Google Veo', status: 'pending' }},
    { id: 'prop-evidence-case', position: { x: 900, y: 700 }, data: { label: 'Evidence Container', type: 'prop', description: 'Secure evidence storage', aiModel: 'SDXL', status: 'generated' }},
    { id: 'prop-holo-display', position: { x: 900, y: 800 }, data: { label: 'Holographic Display', type: 'prop', description: 'Floating interface screens', aiModel: 'Nano Banana', status: 'generated' }},
    { id: 'prop-rain-coat', position: { x: 900, y: 900 }, data: { label: 'Neo Detective Coat', type: 'prop', description: 'Iconic detective trench coat', aiModel: 'DALL-E 3', status: 'generated' }},
    { id: 'prop-cyber-glasses', position: { x: 900, y: 1000 }, data: { label: 'AR Glasses', type: 'prop', description: 'Augmented reality eyewear', aiModel: 'Midjourney', status: 'pending' }},

    // SCENE COMPOSITION NODES (Complex scene assembly)
    { id: 'scene-comp-opening', position: { x: 1200, y: 200 }, data: { 
      label: 'Opening Rain Scene', 
      type: 'scene', 
      description: 'Neo walking through neon-lit rain - character + environment + props',
      aiModel: 'Google Veo 3',
      status: 'ready' 
    }},
    { id: 'scene-comp-discovery', position: { x: 1200, y: 300 }, data: { 
      label: 'Crime Discovery Scene', 
      type: 'scene', 
      description: 'Neo finding the body + holographic evidence',
      aiModel: 'RunwayML Gen-4',
      status: 'generating' 
    }},
    { id: 'scene-comp-briefing', position: { x: 1200, y: 400 }, data: { 
      label: 'Police Briefing Scene', 
      type: 'scene', 
      description: 'Team meeting with captain and ARIA',
      aiModel: 'Pika Labs',
      status: 'pending' 
    }},
    { id: 'scene-comp-chase1', position: { x: 1200, y: 500 }, data: { 
      label: 'First Chase Scene', 
      type: 'scene', 
      description: 'High-speed pursuit through neon streets',
      aiModel: 'Google Veo 3',
      status: 'pending' 
    }},
    { id: 'scene-comp-hacker-meet', position: { x: 1200, y: 600 }, data: { 
      label: 'Ghost Meeting Scene', 
      type: 'scene', 
      description: 'Underground meeting with hacker informant',
      aiModel: 'RunwayML Gen-4',
      status: 'pending' 
    }},

    // More complex scenes
    { id: 'scene-comp-lab-infiltration', position: { x: 1200, y: 700 }, data: { label: 'Lab Infiltration', type: 'scene', description: 'Sneaking into corporate facility', aiModel: 'Minimax Hailuo', status: 'pending' }},
    { id: 'scene-comp-villain-reveal', position: { x: 1200, y: 800 }, data: { label: 'Villain Reveal', type: 'scene', description: 'Viktor exposing his master plan', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'scene-comp-rooftop-fight', position: { x: 1200, y: 900 }, data: { label: 'Rooftop Battle', type: 'scene', description: 'Final confrontation in the rain', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'scene-comp-resolution', position: { x: 1200, y: 1000 }, data: { label: 'Resolution Scene', type: 'scene', description: 'Neo walking away as dawn breaks', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'scene-comp-credits', position: { x: 1200, y: 1100 }, data: { label: 'End Credits Scene', type: 'scene', description: 'City skyline with credits overlay', aiModel: 'Stable Video', status: 'pending' }},

    // VIDEO GENERATION NODES (Converting scenes to video)
    { id: 'video-seq-001', position: { x: 1500, y: 150 }, data: { label: 'Sequence 001 - Opening', type: 'video', duration: '45.0s', aiModel: 'Google Veo 3', status: 'generating' }},
    { id: 'video-seq-002', position: { x: 1500, y: 220 }, data: { label: 'Sequence 002 - Discovery', type: 'video', duration: '38.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-003', position: { x: 1500, y: 290 }, data: { label: 'Sequence 003 - Briefing', type: 'video', duration: '42.0s', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'video-seq-004', position: { x: 1500, y: 360 }, data: { label: 'Sequence 004 - First Chase', type: 'video', duration: '52.0s', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'video-seq-005', position: { x: 1500, y: 430 }, data: { label: 'Sequence 005 - Hacker Meet', type: 'video', duration: '33.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-006', position: { x: 1500, y: 500 }, data: { label: 'Sequence 006 - Lab Break-in', type: 'video', duration: '47.0s', aiModel: 'Minimax Hailuo', status: 'pending' }},
    { id: 'video-seq-007', position: { x: 1500, y: 570 }, data: { label: 'Sequence 007 - Revelation', type: 'video', duration: '41.0s', aiModel: 'Google Veo 3', status: 'pending' }},
    { id: 'video-seq-008', position: { x: 1500, y: 640 }, data: { label: 'Sequence 008 - Rooftop Fight', type: 'video', duration: '67.0s', aiModel: 'RunwayML Gen-4', status: 'pending' }},
    { id: 'video-seq-009', position: { x: 1500, y: 710 }, data: { label: 'Sequence 009 - Resolution', type: 'video', duration: '29.0s', aiModel: 'Pika Labs', status: 'pending' }},
    { id: 'video-seq-010', position: { x: 1500, y: 780 }, data: { label: 'Sequence 010 - Credits', type: 'video', duration: '35.0s', aiModel: 'Stable Video', status: 'pending' }},

    // AUDIO DEPARTMENT (Comprehensive sound design)
    { id: 'audio-neo-dialogue', position: { x: 1800, y: 100 }, data: { label: 'Neo Dialogue Track', type: 'dialogue', duration: '18.5min', aiModel: 'ElevenLabs', status: 'generated' }},
    { id: 'audio-aria-voice', position: { x: 1800, y: 170 }, data: { label: 'ARIA AI Voice', type: 'dialogue', duration: '8.2min', aiModel: 'ElevenLabs AI', status: 'generated' }},
    { id: 'audio-viktor-dialogue', position: { x: 1800, y: 240 }, data: { label: 'Viktor Dialogue', type: 'dialogue', duration: '5.7min', aiModel: 'ElevenLabs', status: 'pending' }},
    { id: 'audio-ghost-dialogue', position: { x: 1800, y: 310 }, data: { label: 'Ghost Dialogue', type: 'dialogue', duration: '3.2min', aiModel: 'ElevenLabs', status: 'pending' }},
    { id: 'audio-captain-dialogue', position: { x: 1800, y: 380 }, data: { label: 'Captain Dialogue', type: 'dialogue', duration: '2.8min', aiModel: 'ElevenLabs', status: 'pending' }},

    // Music tracks
    { id: 'audio-main-theme', position: { x: 1800, y: 480 }, data: { label: 'Main Theme', type: 'music', duration: '272.0s', aiModel: 'Suno AI', status: 'generated' }},
    { id: 'audio-tension-music', position: { x: 1800, y: 550 }, data: { label: 'Tension Underscore', type: 'music', duration: '145.0s', aiModel: 'Suno AI', status: 'pending' }},
    { id: 'audio-action-music', position: { x: 1800, y: 620 }, data: { label: 'Action Sequences', type: 'music', duration: '98.0s', aiModel: 'Udio', status: 'pending' }},
    { id: 'audio-emotional-music', position: { x: 1800, y: 690 }, data: { label: 'Emotional Moments', type: 'music', duration: '67.0s', aiModel: 'Suno AI', status: 'pending' }},
    { id: 'audio-credits-music', position: { x: 1800, y: 760 }, data: { label: 'End Credits Theme', type: 'music', duration: '120.0s', aiModel: 'Udio', status: 'pending' }},

    // Sound effects
    { id: 'audio-rain-sfx', position: { x: 1800, y: 860 }, data: { label: 'Rain & Thunder', type: 'sfx', duration: '272.0s', aiModel: 'AudioGen', status: 'generated' }},
    { id: 'audio-city-ambient', position: { x: 1800, y: 930 }, data: { label: 'City Ambience', type: 'ambient', duration: '272.0s', aiModel: 'AudioGen', status: 'generated' }},
    { id: 'audio-tech-sfx', position: { x: 1800, y: 1000 }, data: { label: 'Tech Sounds', type: 'sfx', duration: 'Various', aiModel: 'AudioGen', status: 'generated' }},
    { id: 'audio-vehicle-sfx', position: { x: 1800, y: 1070 }, data: { label: 'Vehicle Sounds', type: 'sfx', duration: 'Various', aiModel: 'AudioGen', status: 'pending' }},
    { id: 'audio-weapon-sfx', position: { x: 1800, y: 1140 }, data: { label: 'Weapon & Combat', type: 'sfx', duration: 'Various', aiModel: 'AudioGen', status: 'pending' }},

    // EFFECTS & TRANSITIONS
    { id: 'fx-rain-transition', position: { x: 2100, y: 100 }, data: { label: 'Rain Wipe Transition', type: 'transition', duration: '2.0s', status: 'ready' }},
    { id: 'fx-hologram-glitch', position: { x: 2100, y: 170 }, data: { label: 'Hologram Glitch', type: 'effect', duration: '0.5s', status: 'ready' }},
    { id: 'fx-neon-glow', position: { x: 2100, y: 240 }, data: { label: 'Neon Color Grade', type: 'effect', duration: 'Continuous', status: 'ready' }},
    { id: 'fx-slow-motion', position: { x: 2100, y: 310 }, data: { label: 'Bullet Time', type: 'effect', duration: '3.5s', status: 'ready' }},
    { id: 'fx-digital-distortion', position: { x: 2100, y: 380 }, data: { label: 'Digital Distortion', type: 'effect', duration: '1.2s', status: 'ready' }},
    { id: 'fx-fade-to-black', position: { x: 2100, y: 450 }, data: { label: 'Dramatic Fade', type: 'transition', duration: '2.0s', status: 'ready' }},
    { id: 'fx-lens-flare', position: { x: 2100, y: 520 }, data: { label: 'Neon Lens Flare', type: 'effect', duration: '0.8s', status: 'ready' }},
    { id: 'fx-motion-blur', position: { x: 2100, y: 590 }, data: { label: 'Speed Motion Blur', type: 'effect', duration: 'Variable', status: 'ready' }},
    { id: 'fx-chromatic-aberration', position: { x: 2100, y: 660 }, data: { label: 'Chromatic Aberration', type: 'effect', duration: 'Continuous', status: 'ready' }},
    { id: 'fx-particle-system', position: { x: 2100, y: 730 }, data: { label: 'Rain Particles', type: 'effect', duration: 'Continuous', status: 'ready' }},

    // PROCESSING NODES
    { id: 'proc-color-grade', position: { x: 2400, y: 200 }, data: { label: 'Cyberpunk Color Grading', type: 'processing', status: 'active' }},
    { id: 'proc-4k-upscale', position: { x: 2400, y: 280 }, data: { label: '4K AI Upscaling', type: 'processing', status: 'pending' }},
    { id: 'proc-stabilization', position: { x: 2400, y: 360 }, data: { label: 'Motion Stabilization', type: 'processing', status: 'active' }},
    { id: 'proc-noise-reduction', position: { x: 2400, y: 440 }, data: { label: 'Noise Reduction', type: 'processing', status: 'active' }},
    { id: 'proc-audio-master', position: { x: 2400, y: 520 }, data: { label: 'Audio Mastering', type: 'processing', status: 'pending' }},
    { id: 'proc-conform', position: { x: 2400, y: 600 }, data: { label: 'Format Conform', type: 'processing', status: 'pending' }},
    { id: 'proc-compression', position: { x: 2400, y: 680 }, data: { label: 'Final Compression', type: 'processing', status: 'pending' }},

    // FINAL CUT NODES
    { id: 'final-act1', position: { x: 2700, y: 250 }, data: { label: 'Act I Final Cut', type: 'finalcut', duration: '83.0s', status: 'ready' }},
    { id: 'final-act2', position: { x: 2700, y: 350 }, data: { label: 'Act II Final Cut', type: 'finalcut', duration: '93.0s', status: 'rendering' }},
    { id: 'final-act3', position: { x: 2700, y: 450 }, data: { label: 'Act III Final Cut', type: 'finalcut', duration: '96.0s', status: 'pending' }},

    // MASTER TIMELINE NODE (Bottom center as wide film strip)
    {
      id: 'neo-detective-timeline',
      type: 'output',
      position: { x: 1400, y: 1400 },
      data: {
        label: (
          <div className="w-full">
            <div className="flex items-center gap-4 mb-4">
              <Film className="w-8 h-8" />
              <div>
                <div className="font-bold text-xl">NEO DETECTIVE EPISODE</div>
                <div className="text-sm opacity-80">Master Timeline - 272.0s runtime</div>
              </div>
            </div>
            <div className="w-full h-32 bg-black/30 rounded-lg border-2 border-white/40 p-4">
              <div className="flex gap-2 h-full overflow-x-auto">
                {[
                  { name: 'Opening', time: '0:00-0:45', color: 'bg-blue-500/40' },
                  { name: 'Discovery', time: '0:45-1:23', color: 'bg-red-500/40' },
                  { name: 'Briefing', time: '1:23-2:05', color: 'bg-green-500/40' },
                  { name: 'Chase 1', time: '2:05-2:57', color: 'bg-orange-500/40' },
                  { name: 'Ghost Meet', time: '2:57-3:30', color: 'bg-purple-500/40' },
                  { name: 'Infiltration', time: '3:30-4:17', color: 'bg-yellow-500/40' },
                  { name: 'Revelation', time: '4:17-4:58', color: 'bg-pink-500/40' },
                  { name: 'Final Fight', time: '4:58-6:05', color: 'bg-red-600/40' },
                  { name: 'Resolution', time: '6:05-6:34', color: 'bg-green-600/40' },
                  { name: 'Credits', time: '6:34-7:09', color: 'bg-gray-500/40' },
                ].map((segment, i) => (
                  <div key={i} className={`flex-shrink-0 w-48 h-full ${segment.color} border border-white/30 rounded-lg p-2 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform`}>
                    <div className="text-xs font-semibold text-white">{segment.name}</div>
                    <div className="text-xs text-white/80">{segment.time}</div>
                    <div className="flex gap-1">
                      {Array.from({length: 12}).map((_, j) => (
                        <div key={j} className="w-1 h-6 bg-white/30 border border-white/20"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
        type: 'master-timeline',
        totalDuration: '272.0s',
        acts: 3,
        scenes: 10,
        status: 'active'
      }
    }
  ];

  // Comprehensive edge connections showing proper workflow
  const initialEdges: Edge[] = [
    // Script to script breakdown
    { id: 'e1', source: 'master-script', target: 'script-act1', style: { stroke: 'hsl(var(--primary))' } },
    { id: 'e2', source: 'master-script', target: 'script-act2a', style: { stroke: 'hsl(var(--primary))' } },
    { id: 'e3', source: 'master-script', target: 'script-act2b', style: { stroke: 'hsl(var(--primary))' } },
    { id: 'e4', source: 'master-script', target: 'script-act3', style: { stroke: 'hsl(var(--primary))' } },

    // Script acts to individual scenes
    { id: 'e5', source: 'script-act1', target: 'scene-01-opening', style: { stroke: 'hsl(var(--primary))' } },
    { id: 'e6', source: 'script-act1', target: 'scene-02-murder', style: { stroke: 'hsl(var(--primary))' } },
    { id: 'e7', source: 'script-act1', target: 'scene-03-briefing', style: { stroke: 'hsl(var(--primary))' } },

    // Characters feeding into relevant scenes
    { id: 'e8', source: 'char-neo-kane', target: 'scene-comp-opening', animated: true, style: { stroke: 'hsl(var(--accent))' } },
    { id: 'e9', source: 'char-neo-kane', target: 'scene-comp-discovery', animated: true, style: { stroke: 'hsl(var(--accent))' } },
    { id: 'e10', source: 'char-aria-ai', target: 'scene-comp-briefing', animated: true, style: { stroke: 'hsl(var(--accent))' } },
    { id: 'e11', source: 'char-viktor-villain', target: 'scene-comp-villain-reveal', animated: true, style: { stroke: 'hsl(var(--accent))' } },
    { id: 'e12', source: 'char-ghost-hacker', target: 'scene-comp-hacker-meet', animated: true, style: { stroke: 'hsl(var(--accent))' } },

    // Environments to scenes
    { id: 'e13', source: 'env-neo-apartment', target: 'scene-comp-opening', style: { stroke: 'hsl(var(--secondary))' } },
    { id: 'e14', source: 'env-neon-alley', target: 'scene-comp-discovery', style: { stroke: 'hsl(var(--secondary))' } },
    { id: 'e15', source: 'env-police-station', target: 'scene-comp-briefing', style: { stroke: 'hsl(var(--secondary))' } },
    { id: 'e16', source: 'env-cyber-city', target: 'scene-comp-chase1', style: { stroke: 'hsl(var(--secondary))' } },

    // Props to scenes
    { id: 'e17', source: 'prop-hologram-evidence', target: 'scene-comp-discovery', style: { stroke: '#fbbf24' } },
    { id: 'e18', source: 'prop-neural-chip', target: 'scene-comp-hacker-meet', style: { stroke: '#fbbf24' } },
    { id: 'e19', source: 'prop-plasma-gun', target: 'scene-comp-rooftop-fight', style: { stroke: '#fbbf24' } },

    // Scene compositions to video sequences
    { id: 'e20', source: 'scene-comp-opening', target: 'video-seq-001', style: { stroke: '#ef4444' } },
    { id: 'e21', source: 'scene-comp-discovery', target: 'video-seq-002', style: { stroke: '#ef4444' } },
    { id: 'e22', source: 'scene-comp-briefing', target: 'video-seq-003', style: { stroke: '#ef4444' } },
    { id: 'e23', source: 'scene-comp-chase1', target: 'video-seq-004', style: { stroke: '#ef4444' } },
    { id: 'e24', source: 'scene-comp-hacker-meet', target: 'video-seq-005', style: { stroke: '#ef4444' } },

    // Audio to video sequences
    { id: 'e25', source: 'audio-neo-dialogue', target: 'video-seq-001', style: { stroke: '#22c55e' } },
    { id: 'e26', source: 'audio-aria-voice', target: 'video-seq-003', style: { stroke: '#22c55e' } },
    { id: 'e27', source: 'audio-main-theme', target: 'video-seq-001', style: { stroke: '#22c55e' } },
    { id: 'e28', source: 'audio-rain-sfx', target: 'video-seq-001', style: { stroke: '#22c55e' } },

    // Effects to video sequences
    { id: 'e29', source: 'fx-rain-transition', target: 'video-seq-001', style: { stroke: '#f97316' } },
    { id: 'e30', source: 'fx-hologram-glitch', target: 'video-seq-002', style: { stroke: '#f97316' } },
    { id: 'e31', source: 'fx-neon-glow', target: 'video-seq-004', style: { stroke: '#f97316' } },

    // Processing workflow
    { id: 'e32', source: 'video-seq-001', target: 'proc-color-grade', style: { stroke: '#8b5cf6' } },
    { id: 'e33', source: 'video-seq-002', target: 'proc-4k-upscale', style: { stroke: '#8b5cf6' } },
    { id: 'e34', source: 'audio-main-theme', target: 'proc-audio-master', style: { stroke: '#8b5cf6' } },

    // Final cuts
    { id: 'e35', source: 'video-seq-001', target: 'final-act1', style: { stroke: '#3b82f6' } },
    { id: 'e36', source: 'video-seq-002', target: 'final-act1', style: { stroke: '#3b82f6' } },
    { id: 'e37', source: 'video-seq-003', target: 'final-act1', style: { stroke: '#3b82f6' } },

    // Final cuts to master timeline (all sequences flow to timeline)
    { id: 'e38', source: 'final-act1', target: 'neo-detective-timeline', style: { stroke: 'hsl(var(--primary))', strokeWidth: 3 } },
    { id: 'e39', source: 'final-act2', target: 'neo-detective-timeline', style: { stroke: 'hsl(var(--primary))', strokeWidth: 3 } },
    { id: 'e40', source: 'final-act3', target: 'neo-detective-timeline', style: { stroke: 'hsl(var(--primary))', strokeWidth: 3 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsExpanded(true);
  }, []);

  const nodeTypes = {
    default: NodeComponent,
  };

  return (
    <div className="relative w-full h-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-background"
        defaultViewport={{ x: 0, y: 0, zoom: 0.4 }}
        minZoom={0.1}
        maxZoom={2}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          className="opacity-20"
          color="hsl(var(--muted-foreground))"
        />
        <Controls 
          position="bottom-left"
          className="bg-card border border-border rounded-lg shadow-lg"
        />
        <MiniMap 
          position="bottom-right"
          className="bg-card border border-border rounded-lg shadow-lg"
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'script': return 'hsl(var(--primary))';
              case 'character': return 'hsl(var(--accent))';
              case 'environment': case 'scene': return 'hsl(var(--secondary))';
              case 'video': return '#ef4444';
              case 'audio': return '#22c55e';
              default: return 'hsl(var(--muted))';
            }
          }}
        />
      </ReactFlow>

      {/* Node Expansion Panel */}
      <NodeExpansionPanel 
        node={selectedNode}
        isOpen={isExpanded}
        onClose={() => {
          setIsExpanded(false);
          setSelectedNode(null);
        }}
      />

      {/* Timeline Navigation Helper */}
      <div className="absolute bottom-20 left-4 right-4 h-16 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5" />
          <span className="font-semibold">Timeline Navigation</span>
        </div>
        <div className="flex-1 h-4 bg-muted rounded-full relative cursor-pointer hover:bg-muted/80">
          <div className="absolute inset-0 flex items-center">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pos) => (
              <div key={pos} className="absolute w-1 h-full bg-primary/30" style={{ left: `${pos}%` }} />
            ))}
          </div>
          <div className="absolute top-0 left-[15%] w-2 h-4 bg-primary rounded-full" />
        </div>
        <div className="text-sm text-muted-foreground">
          Click to navigate to timeline section
        </div>
      </div>
    </div>
  );
}