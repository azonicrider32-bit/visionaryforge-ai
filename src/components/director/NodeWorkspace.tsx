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

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Image, 
  Video, 
  Music, 
  FileText, 
  Users,
  Zap,
  Download,
  Play,
  Camera,
  Palette,
  TreePine,
  Car,
  Crown,
  Sword,
  Castle,
  Mountain,
  Scissors,
  Settings,
  Mic,
  Film,
  Sparkles,
  Eye,
  Clock,
  Target,
  Layers,
  Volume2,
  Search,
  Globe,
  Building,
  Coffee,
  Phone,
  Monitor,
  Keyboard,
  Lightbulb,
  Shield,
  Star,
  BookOpen,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';

// Import assets
import neoDetectiveImg from '@/assets/neo-detective.jpg';
import policeStationImg from '@/assets/police-station.jpg';
import neonAlleyImg from '@/assets/neon-alley.jpg';
import cyberCityImg from '@/assets/cyber-city.jpg';

// Massive complex node network for Neo Detective Episode
const initialNodes: Node[] = [
  // SCRIPT NODES - Opening
  { id: 'script-opening', type: 'scriptNode', position: { x: 50, y: 50 }, data: { label: 'Opening Monologue', type: 'script', content: 'FADE IN: Rain falls on neon-lit streets...', status: 'complete' }},
  { id: 'script-setup', type: 'scriptNode', position: { x: 50, y: 150 }, data: { label: 'Character Setup', type: 'script', content: 'Detective Kane, 35, weathered by the city...', status: 'complete' }},
  { id: 'script-inciting', type: 'scriptNode', position: { x: 50, y: 250 }, data: { label: 'Inciting Incident', type: 'script', content: 'A hologram flickers in the rain...', status: 'complete' }},

  // CHARACTER NODES - Main Cast
  { id: 'char-neo-detective', type: 'characterNode', position: { x: 200, y: 100 }, data: { label: 'Detective Kane', type: 'character', description: 'Cyberpunk detective, haunted past', castingInfo: 'Age 30-40, Noir aesthetic', references: [neoDetectiveImg], status: 'ready' }},
  { id: 'char-ai-partner', type: 'characterNode', position: { x: 200, y: 200 }, data: { label: 'AI Partner ARIA', type: 'character', description: 'Holographic AI assistant', castingInfo: 'Digital character, ethereal voice', status: 'ready' }},
  { id: 'char-crime-boss', type: 'characterNode', position: { x: 200, y: 300 }, data: { label: 'Viktor Nashimoto', type: 'character', description: 'Corporate crime syndicate leader', castingInfo: 'Age 45-55, Intimidating presence', status: 'ready' }},
  { id: 'char-hacker', type: 'characterNode', position: { x: 200, y: 400 }, data: { label: 'Ghost', type: 'character', description: 'Underground hacker informant', castingInfo: 'Androgynous, tech-savvy appearance', status: 'ready' }},
  { id: 'char-victim', type: 'characterNode', position: { x: 200, y: 500 }, data: { label: 'Dr. Sarah Chen', type: 'character', description: 'Murdered scientist', castingInfo: 'Age 25-35, Professional appearance', status: 'ready' }},

  // ENVIRONMENT NODES - Locations
  { id: 'env-police-station', type: 'imageNode', position: { x: 400, y: 50 }, data: { label: 'Police Station', type: 'environment', prompt: 'Cyberpunk police station interior with holographic displays', aiModel: 'SDXL', preview: policeStationImg, status: 'generated' }},
  { id: 'env-neon-alley', type: 'imageNode', position: { x: 400, y: 150 }, data: { label: 'Neon Alley', type: 'environment', prompt: 'Rain-soaked neon alley with puddle reflections', aiModel: 'DALL-E 3', preview: neonAlleyImg, status: 'generated' }},
  { id: 'env-cyber-city', type: 'imageNode', position: { x: 400, y: 250 }, data: { label: 'Cyber City', type: 'environment', prompt: 'Sprawling cyberpunk cityscape with flying cars', aiModel: 'Midjourney', preview: cyberCityImg, status: 'generated' }},
  { id: 'env-corporate-tower', type: 'imageNode', position: { x: 400, y: 350 }, data: { label: 'Corporate Tower', type: 'environment', prompt: 'Glass corporate tower reaching into smoggy sky', aiModel: 'Flux Pro', status: 'pending' }},
  { id: 'env-underground-lab', type: 'imageNode', position: { x: 400, y: 450 }, data: { label: 'Underground Lab', type: 'environment', prompt: 'Secret laboratory with advanced tech equipment', aiModel: 'SDXL', status: 'pending' }},
  { id: 'env-rain-rooftop', type: 'imageNode', position: { x: 400, y: 550 }, data: { label: 'Rainy Rooftop', type: 'environment', prompt: 'Rooftop chase scene in heavy rain', aiModel: 'Google Veo', status: 'pending' }},

  // PROP NODES - Objects
  { id: 'prop-hologram', type: 'imageNode', position: { x: 600, y: 50 }, data: { label: 'Crime Hologram', type: 'prop', prompt: 'Flickering holographic crime scene reconstruction', aiModel: 'Nano Banana', status: 'generated' }},
  { id: 'prop-neural-chip', type: 'imageNode', position: { x: 600, y: 150 }, data: { label: 'Neural Chip', type: 'prop', prompt: 'Advanced neural interface chip with glowing circuits', aiModel: 'SDXL', status: 'generated' }},
  { id: 'prop-gun', type: 'imageNode', position: { x: 600, y: 250 }, data: { label: 'Plasma Gun', type: 'prop', prompt: 'Futuristic plasma pistol with energy cells', aiModel: 'DALL-E 3', status: 'generated' }},
  { id: 'prop-evidence', type: 'imageNode', position: { x: 600, y: 350 }, data: { label: 'Digital Evidence', type: 'prop', prompt: 'Floating digital evidence fragments', aiModel: 'Midjourney', status: 'pending' }},
  { id: 'prop-badge', type: 'imageNode', position: { x: 600, y: 450 }, data: { label: 'Detective Badge', type: 'prop', prompt: 'Cyberpunk detective badge with holographic elements', aiModel: 'Flux', status: 'pending' }},

  // SCENE COMPOSITION NODES - Act I
  { id: 'scene-opening-rain', type: 'imageNode', position: { x: 800, y: 100 }, data: { label: 'Opening Rain Scene', type: 'scene', prompt: 'Detective Kane walking through neon-lit rain', aiModel: 'Google Veo 3', preview: neoDetectiveImg, status: 'ready' }},
  { id: 'scene-crime-discovery', type: 'imageNode', position: { x: 800, y: 200 }, data: { label: 'Crime Discovery', type: 'scene', prompt: 'Kane discovering holographic crime scene', aiModel: 'RunwayML Gen-4', status: 'generating' }},
  { id: 'scene-police-briefing', type: 'imageNode', position: { x: 800, y: 300 }, data: { label: 'Police Briefing', type: 'scene', prompt: 'Briefing room with holographic displays', aiModel: 'Pika Labs', status: 'pending' }},

  // SCENE COMPOSITION NODES - Act II
  { id: 'scene-alley-chase', type: 'imageNode', position: { x: 1000, y: 100 }, data: { label: 'Alley Chase', type: 'scene', prompt: 'High-speed chase through neon alleys', aiModel: 'Google Veo 3', status: 'pending' }},
  { id: 'scene-hacker-meeting', type: 'imageNode', position: { x: 1000, y: 200 }, data: { label: 'Hacker Meeting', type: 'scene', prompt: 'Clandestine meeting with Ghost in underground', aiModel: 'RunwayML Gen-4', status: 'pending' }},
  { id: 'scene-corporate-infiltration', type: 'imageNode', position: { x: 1000, y: 300 }, data: { label: 'Corporate Infiltration', type: 'scene', prompt: 'Kane infiltrating corporate tower', aiModel: 'Minimax Hailuo', status: 'pending' }},

  // SCENE COMPOSITION NODES - Act III
  { id: 'scene-villain-reveal', type: 'imageNode', position: { x: 1200, y: 100 }, data: { label: 'Villain Reveal', type: 'scene', prompt: 'Viktor Nashimoto revealing master plan', aiModel: 'Google Veo 3', status: 'pending' }},
  { id: 'scene-final-confrontation', type: 'imageNode', position: { x: 1200, y: 200 }, data: { label: 'Final Confrontation', type: 'scene', prompt: 'Epic rooftop battle in the rain', aiModel: 'RunwayML Gen-4', status: 'pending' }},
  { id: 'scene-resolution', type: 'imageNode', position: { x: 1200, y: 300 }, data: { label: 'Resolution', type: 'scene', prompt: 'Kane walking away as dawn breaks', aiModel: 'Pika Labs', status: 'pending' }},

  // VIDEO GENERATION NODES
  { id: 'video-act1-seq1', type: 'videoNode', position: { x: 1400, y: 80 }, data: { label: 'Act I Sequence 1', type: 'video', duration: '45.0s', aiModel: 'Google Veo 3', settings: 'Cinematic, 24fps, 4K', status: 'generating' }},
  { id: 'video-act1-seq2', type: 'videoNode', position: { x: 1400, y: 180 }, data: { label: 'Act I Sequence 2', type: 'video', duration: '38.0s', aiModel: 'RunwayML Gen-4', settings: 'Natural motion, 30fps', status: 'pending' }},
  { id: 'video-act2-seq1', type: 'videoNode', position: { x: 1400, y: 280 }, data: { label: 'Act II Sequence 1', type: 'video', duration: '52.0s', aiModel: 'Pika Labs', settings: 'Action sequence, High detail', status: 'pending' }},
  { id: 'video-act2-seq2', type: 'videoNode', position: { x: 1400, y: 380 }, data: { label: 'Act II Sequence 2', type: 'video', duration: '41.0s', aiModel: 'Google Veo 3', settings: 'Dramatic lighting', status: 'pending' }},
  { id: 'video-act3-seq1', type: 'videoNode', position: { x: 1400, y: 480 }, data: { label: 'Act III Sequence 1', type: 'video', duration: '67.0s', aiModel: 'RunwayML Gen-4', settings: 'Epic scale, 4K', status: 'pending' }},
  { id: 'video-act3-seq2', type: 'videoNode', position: { x: 1400, y: 580 }, data: { label: 'Act III Sequence 2', type: 'video', duration: '29.0s', aiModel: 'Minimax Hailuo', settings: 'Contemplative mood', status: 'pending' }},

  // AUDIO NODES - Dialogue
  { id: 'audio-kane-dialogue', type: 'audioNode', position: { x: 1600, y: 50 }, data: { label: 'Kane Dialogue', type: 'dialogue', duration: '180.0s', character: 'Detective Kane', voiceModel: 'ElevenLabs', status: 'generated' }},
  { id: 'audio-aria-voice', type: 'audioNode', position: { x: 1600, y: 130 }, data: { label: 'ARIA Voice', type: 'dialogue', duration: '95.0s', character: 'AI ARIA', voiceModel: 'ElevenLabs AI', status: 'generated' }},
  { id: 'audio-villain-dialogue', type: 'audioNode', position: { x: 1600, y: 210 }, data: { label: 'Villain Dialogue', type: 'dialogue', duration: '67.0s', character: 'Viktor', voiceModel: 'ElevenLabs', status: 'pending' }},

  // AUDIO NODES - Music & SFX
  { id: 'audio-main-theme', type: 'audioNode', position: { x: 1600, y: 290 }, data: { label: 'Main Theme', type: 'music', duration: '272.0s', style: 'Cyberpunk synthwave', aiModel: 'Suno AI', status: 'generated' }},
  { id: 'audio-tension-music', type: 'audioNode', position: { x: 1600, y: 370 }, data: { label: 'Tension Music', type: 'music', duration: '145.0s', style: 'Suspenseful orchestral', aiModel: 'Suno AI', status: 'pending' }},
  { id: 'audio-action-music', type: 'audioNode', position: { x: 1600, y: 450 }, data: { label: 'Action Music', type: 'music', duration: '98.0s', style: 'High-energy electronic', aiModel: 'Udio', status: 'pending' }},
  { id: 'audio-rain-sfx', type: 'audioNode', position: { x: 1600, y: 530 }, data: { label: 'Rain SFX', type: 'sfx', duration: '272.0s', effects: 'Heavy rain, thunder', aiModel: 'AudioGen', status: 'generated' }},
  { id: 'audio-city-ambient', type: 'audioNode', position: { x: 1600, y: 610 }, data: { label: 'City Ambience', type: 'ambient', duration: '272.0s', atmosphere: 'Cyberpunk city sounds', aiModel: 'AudioGen', status: 'generated' }},

  // TRANSITION & EFFECT NODES
  { id: 'fx-rain-transition', type: 'effectNode', position: { x: 1800, y: 50 }, data: { label: 'Rain Transition', type: 'transition', effect: 'Rain wipe dissolve', duration: '2.0s', status: 'ready' }},
  { id: 'fx-hologram-glitch', type: 'effectNode', position: { x: 1800, y: 130 }, data: { label: 'Hologram Glitch', type: 'effect', effect: 'Digital glitch overlay', duration: '0.5s', status: 'ready' }},
  { id: 'fx-neon-glow', type: 'effectNode', position: { x: 1800, y: 210 }, data: { label: 'Neon Glow', type: 'effect', effect: 'Color grade neon enhancement', duration: 'continuous', status: 'ready' }},
  { id: 'fx-slow-motion', type: 'effectNode', position: { x: 1800, y: 290 }, data: { label: 'Slow Motion', type: 'effect', effect: 'Bullet-time effect', duration: '3.5s', status: 'ready' }},
  { id: 'fx-fade-to-black', type: 'effectNode', position: { x: 1800, y: 370 }, data: { label: 'Fade to Black', type: 'transition', effect: 'Dramatic fade out', duration: '2.0s', status: 'ready' }},

  // PROCESSING NODES
  { id: 'proc-color-grade', type: 'processingNode', position: { x: 2000, y: 100 }, data: { label: 'Color Grading', type: 'processing', process: 'Cyberpunk color palette', status: 'active' }},
  { id: 'proc-upscale', type: 'processingNode', position: { x: 2000, y: 200 }, data: { label: '4K Upscaling', type: 'processing', process: 'AI upscale to 4K', status: 'pending' }},
  { id: 'proc-stabilization', type: 'processingNode', position: { x: 2000, y: 300 }, data: { label: 'Stabilization', type: 'processing', process: 'Motion stabilization', status: 'active' }},
  { id: 'proc-audio-master', type: 'processingNode', position: { x: 2000, y: 400 }, data: { label: 'Audio Mastering', type: 'processing', process: 'Final audio mix', status: 'pending' }},

  // FINAL CUT NODES
  { id: 'final-act1', type: 'finalCutNode', position: { x: 2200, y: 120 }, data: { label: 'Act I Final Cut', type: 'finalcut', duration: '83.0s', scenes: 3, exportFormat: '4K H.264', status: 'ready' }},
  { id: 'final-act2', type: 'finalCutNode', position: { x: 2200, y: 220 }, data: { label: 'Act II Final Cut', type: 'finalcut', duration: '93.0s', scenes: 3, exportFormat: '4K H.264', status: 'rendering' }},
  { id: 'final-act3', type: 'finalCutNode', position: { x: 2200, y: 320 }, data: { label: 'Act III Final Cut', type: 'finalcut', duration: '96.0s', scenes: 2, exportFormat: '4K H.264', status: 'pending' }},

  // MASTER TIMELINE - Neo Detective Episode (Film strip design)
  { id: 'neo-detective-episode', type: 'masterTimelineNode', position: { x: 2400, y: 220 }, data: { 
    label: 'NEO DETECTIVE EPISODE', 
    type: 'master-timeline', 
    totalDuration: '272.0s', 
    acts: ['Setup & Discovery', 'Investigation & Chase', 'Confrontation & Resolution'],
    format: 'Cinematic Film Strip',
    status: 'active',
    episodes: 1,
    quality: '4K UHD'
  }}
];

// Massive edge network - proper left-to-right sequential flow
const initialEdges: Edge[] = [
  // Scripts to Characters
  { id: 'e1', source: 'script-opening', target: 'char-neo-detective', style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e2', source: 'script-setup', target: 'char-ai-partner', style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e3', source: 'script-inciting', target: 'char-crime-boss', style: { stroke: 'hsl(var(--foreground))' } },

  // Characters to Scenes
  { id: 'e4', source: 'char-neo-detective', target: 'scene-opening-rain', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e5', source: 'char-neo-detective', target: 'scene-crime-discovery', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e6', source: 'char-ai-partner', target: 'scene-police-briefing', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e7', source: 'char-hacker', target: 'scene-hacker-meeting', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e8', source: 'char-crime-boss', target: 'scene-villain-reveal', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },

  // Environments to Scenes
  { id: 'e9', source: 'env-neon-alley', target: 'scene-opening-rain', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e10', source: 'env-police-station', target: 'scene-police-briefing', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e11', source: 'env-cyber-city', target: 'scene-alley-chase', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e12', source: 'env-corporate-tower', target: 'scene-corporate-infiltration', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e13', source: 'env-rain-rooftop', target: 'scene-final-confrontation', style: { stroke: 'hsl(var(--image-purple))' } },

  // Props to Scenes
  { id: 'e14', source: 'prop-hologram', target: 'scene-crime-discovery', style: { stroke: 'hsl(var(--director-gold))' } },
  { id: 'e15', source: 'prop-neural-chip', target: 'scene-hacker-meeting', style: { stroke: 'hsl(var(--director-gold))' } },
  { id: 'e16', source: 'prop-gun', target: 'scene-final-confrontation', style: { stroke: 'hsl(var(--director-gold))' } },

  // Scenes to Videos (Sequential left-to-right)
  { id: 'e17', source: 'scene-opening-rain', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e18', source: 'scene-crime-discovery', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e19', source: 'scene-police-briefing', target: 'video-act1-seq2', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e20', source: 'scene-alley-chase', target: 'video-act2-seq1', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e21', source: 'scene-hacker-meeting', target: 'video-act2-seq2', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e22', source: 'scene-villain-reveal', target: 'video-act3-seq1', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e23', source: 'scene-final-confrontation', target: 'video-act3-seq2', style: { stroke: 'hsl(var(--video-red))' } },

  // Audio to Videos
  { id: 'e24', source: 'audio-kane-dialogue', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e25', source: 'audio-aria-voice', target: 'video-act1-seq2', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e26', source: 'audio-main-theme', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e27', source: 'audio-rain-sfx', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e28', source: 'audio-city-ambient', target: 'video-act2-seq1', style: { stroke: 'hsl(var(--audio-green))' } },

  // Effects to Videos
  { id: 'e29', source: 'fx-rain-transition', target: 'video-act1-seq1', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e30', source: 'fx-hologram-glitch', target: 'video-act1-seq2', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e31', source: 'fx-neon-glow', target: 'video-act2-seq1', style: { stroke: 'hsl(var(--export-orange))' } },

  // Processing connections
  { id: 'e32', source: 'video-act1-seq1', target: 'proc-color-grade', style: { stroke: 'hsl(var(--record-purple))' } },
  { id: 'e33', source: 'video-act2-seq1', target: 'proc-upscale', style: { stroke: 'hsl(var(--record-purple))' } },
  { id: 'e34', source: 'audio-main-theme', target: 'proc-audio-master', style: { stroke: 'hsl(var(--record-purple))' } },

  // Videos to Final Cuts (Sequential)
  { id: 'e35', source: 'video-act1-seq1', target: 'final-act1', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e36', source: 'video-act1-seq2', target: 'final-act1', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e37', source: 'video-act2-seq1', target: 'final-act2', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e38', source: 'video-act2-seq2', target: 'final-act2', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e39', source: 'video-act3-seq1', target: 'final-act3', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e40', source: 'video-act3-seq2', target: 'final-act3', style: { stroke: 'hsl(var(--export-orange))' } },

  // Final Cuts to Master Timeline (All feed into Neo Detective Episode)
  { id: 'e41', source: 'final-act1', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 4 } },
  { id: 'e42', source: 'final-act2', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 4 } },
  { id: 'e43', source: 'final-act3', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 4 } }
];

// Status color helper
function getStatusColor(status: string) {
  switch (status) {
    case 'ready': return 'text-audio-green border-audio-green/30';
    case 'generated': return 'text-audio-green border-audio-green/30';
    case 'complete': return 'text-audio-green border-audio-green/30';
    case 'generating': return 'text-export-orange border-export-orange/30';
    case 'rendering': return 'text-export-orange border-export-orange/30';
    case 'active': return 'text-cinema-blue border-cinema-blue/30';
    case 'pending': return 'text-video-red border-video-red/30';
    default: return 'text-muted-foreground border-border';
  }
}

// Custom Node Components
function ScriptNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[160px] border-foreground/20 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-foreground" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground bg-studio-dark rounded p-2 font-mono">
          {data.content}
        </div>
      </div>
    </Card>
  );
}

function CharacterNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[200px] border-cinema-blue/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cinema-blue" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className="text-cinema-blue border-cinema-blue/30 text-xs">
            Character
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground">{data.description}</p>
        
        {data.references && (
          <div className="flex space-x-1">
            {data.references.map((ref: string, i: number) => (
              <div key={i} className="w-12 h-12 bg-studio-dark rounded border overflow-hidden">
                <img src={ref} alt="Reference" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-cinema-blue/80 bg-studio-dark rounded p-1">
          {data.castingInfo}
        </div>
      </div>
    </Card>
  );
}

function ImageNode({ data }: { data: any }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'environment': return TreePine;
      case 'prop': return Car;
      case 'scene': return Camera;
      default: return Image;
    }
  };

  const TypeIcon = getTypeIcon(data.type);

  return (
    <Card className="glass-panel min-w-[180px] border-image-purple/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TypeIcon className="w-4 h-4 text-image-purple" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        {data.preview && (
          <div className="bg-studio-dark rounded p-1">
            <img src={data.preview} alt="Preview" className="w-full h-16 object-cover rounded" />
          </div>
        )}

        {data.prompt && (
          <div className="text-xs text-muted-foreground bg-studio-dark rounded p-1">
            {data.prompt}
          </div>
        )}

        {data.aiModel && (
          <div className="text-xs text-image-purple font-mono">{data.aiModel}</div>
        )}
      </div>
    </Card>
  );
}

function VideoNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[180px] border-video-red/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-video-red" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-video-red font-mono">{data.duration}</span>
        </div>

        {data.aiModel && (
          <div className="text-xs text-video-red font-mono">{data.aiModel}</div>
        )}

        {data.settings && (
          <div className="text-xs text-muted-foreground bg-studio-dark rounded p-1">
            {data.settings}
          </div>
        )}
      </div>
    </Card>
  );
}

function AudioNode({ data }: { data: any }) {
  const getAudioIcon = (type: string) => {
    switch (type) {
      case 'dialogue': return Mic;
      case 'music': return Music;
      case 'sfx': return Volume2;
      case 'ambient': return Globe;
      default: return Music;
    }
  };

  const AudioIcon = getAudioIcon(data.type);

  return (
    <Card className="glass-panel min-w-[160px] border-audio-green/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AudioIcon className="w-4 h-4 text-audio-green" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-audio-green font-mono">{data.duration}</span>
        </div>

        {data.character && (
          <div className="text-xs text-audio-green">{data.character}</div>
        )}

        {data.voiceModel && (
          <div className="text-xs text-muted-foreground font-mono">{data.voiceModel}</div>
        )}
      </div>
    </Card>
  );
}

function EffectNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[160px] border-export-orange/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-export-orange" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground bg-studio-dark rounded p-1">
          {data.effect}
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-export-orange font-mono">{data.duration}</span>
        </div>
      </div>
    </Card>
  );
}

function ProcessingNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[160px] border-record-purple/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-record-purple" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground bg-studio-dark rounded p-1">
          {data.process}
        </div>
      </div>
    </Card>
  );
}

function FinalCutNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[180px] border-export-orange/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scissors className="w-4 h-4 text-export-orange" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Duration:</span>
            <div className="text-export-orange font-mono">{data.duration}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Scenes:</span>
            <div className="text-export-orange">{data.scenes}</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">{data.exportFormat}</div>
      </div>
    </Card>
  );
}

function MasterTimelineNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[300px] border-director-gold/50 hover:bg-studio-light/20 transition-all duration-300 bg-gradient-to-r from-studio-dark/80 to-studio-light/20">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-5 h-5 text-director-gold" />
            <span className="font-bold text-lg text-director-gold">{data.label}</span>
          </div>
          <Badge variant="outline" className="text-director-gold border-director-gold/50 bg-director-gold/10">
            MASTER
          </Badge>
        </div>

        {/* Film strip visualization */}
        <div className="bg-studio-black rounded-lg p-3 border border-director-gold/30">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-6 bg-director-gold/20 border border-director-gold/30 flex items-center justify-center">
                <div className="w-2 h-4 bg-director-gold/40 rounded-sm" />
              </div>
            ))}
          </div>
          <div className="text-xs text-director-gold font-mono text-center">
            {data.acts?.join(' • ')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Total Duration:</span>
            <div className="text-director-gold font-mono text-sm">{data.totalDuration}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Quality:</span>
            <div className="text-director-gold">{data.quality}</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 pt-2">
          <Button size="sm" variant="outline" className="border-director-gold/30 text-director-gold hover:bg-director-gold/10">
            <Play className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button size="sm" variant="director">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Register custom node types
const nodeTypes = {
  scriptNode: ScriptNode,
  characterNode: CharacterNode,
  imageNode: ImageNode,
  videoNode: VideoNode,
  audioNode: AudioNode,
  effectNode: EffectNode,
  processingNode: ProcessingNode,
  finalCutNode: FinalCutNode,
  masterTimelineNode: MasterTimelineNode,
  timelineNode: MasterTimelineNode
};

export function NodeWorkspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-studio-black via-studio-dark to-studio-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="hsl(var(--director-gold) / 0.2)"
        />
        <Controls className="bg-studio-dark border-director-gold/30" />
        <MiniMap 
          className="bg-studio-dark border-director-gold/30" 
          nodeColor={(node) => {
            switch (node.type) {
              case 'characterNode': return 'hsl(var(--cinema-blue))';
              case 'imageNode': return 'hsl(var(--image-purple))';
              case 'videoNode': return 'hsl(var(--video-red))';
              case 'audioNode': return 'hsl(var(--audio-green))';
              case 'finalCutNode': return 'hsl(var(--export-orange))';
              case 'masterTimelineNode': return 'hsl(var(--director-gold))';
              default: return 'hsl(var(--foreground))';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}