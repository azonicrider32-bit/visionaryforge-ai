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
  Settings
} from 'lucide-react';

// Complex initial nodes for a fantasy epic production
const initialNodes: Node[] = [
  // Character Nodes
  {
    id: 'char-knight',
    type: 'characterNode',
    position: { x: 50, y: 100 },
    data: { 
      label: 'Sir Galahad',
      type: 'character',
      status: 'ready',
      description: 'Noble knight, main protagonist',
      castingInfo: 'Age 25-35, Athletic build, Commanding presence',
      references: ['/api/placeholder/80/80', '/api/placeholder/80/80']
    },
  },
  {
    id: 'char-princess',
    type: 'characterNode',
    position: { x: 50, y: 280 },
    data: { 
      label: 'Princess Elara',
      type: 'character',
      status: 'ready',
      description: 'Wise and brave princess',
      castingInfo: 'Age 20-30, Regal bearing, Intelligent eyes',
      references: ['/api/placeholder/80/80']
    },
  },
  {
    id: 'char-dragon',
    type: 'characterNode',
    position: { x: 50, y: 460 },
    data: { 
      label: 'Ancient Dragon',
      type: 'character',
      status: 'ready',
      description: 'Massive fire-breathing dragon',
      castingInfo: 'CGI character, Intimidating, Ancient wisdom',
      references: ['/api/placeholder/80/80']
    },
  },

  // Environment/Background Nodes
  {
    id: 'env-castle',
    type: 'imageNode',
    position: { x: 250, y: 50 },
    data: { 
      label: 'Royal Castle',
      type: 'environment',
      status: 'generated',
      prompt: 'Majestic medieval castle with tall towers, stone walls, banners flying',
      aiModel: 'SDXL Turbo',
      preview: '/api/placeholder/120/80'
    },
  },
  {
    id: 'env-forest',
    type: 'imageNode',
    position: { x: 250, y: 200 },
    data: { 
      label: 'Enchanted Forest',
      type: 'environment',
      status: 'generated',
      prompt: 'Dark mystical forest with ancient trees, magical mist, ethereal lighting',
      aiModel: 'Midjourney',
      preview: '/api/placeholder/120/80'
    },
  },
  {
    id: 'env-dragon-lair',
    type: 'imageNode',
    position: { x: 250, y: 350 },
    data: { 
      label: 'Dragon\'s Lair',
      type: 'environment',
      status: 'generating',
      prompt: 'Vast cave with treasure hoard, dramatic lighting, volcanic undertones',
      aiModel: 'DALL-E 3'
    },
  },
  {
    id: 'env-battlefield',
    type: 'imageNode',
    position: { x: 250, y: 500 },
    data: { 
      label: 'Epic Battlefield',
      type: 'environment',
      status: 'ready',
      prompt: 'Large medieval battlefield, armies clashing, dramatic sky',
      aiModel: 'Flux Pro'
    },
  },

  // Prop/Object Nodes
  {
    id: 'prop-sword',
    type: 'imageNode',
    position: { x: 450, y: 100 },
    data: { 
      label: 'Excalibur Sword',
      type: 'prop',
      status: 'generated',
      prompt: 'Legendary sword with ornate handle, glowing blade, magical runes',
      aiModel: 'SDXL',
      preview: '/api/placeholder/80/80'
    },
  },
  {
    id: 'prop-crown',
    type: 'imageNode',
    position: { x: 450, y: 250 },
    data: { 
      label: 'Royal Crown',
      type: 'prop',
      status: 'generated',
      prompt: 'Golden crown with precious gems, intricate design, regal appearance',
      aiModel: 'DALL-E 3',
      preview: '/api/placeholder/80/80'
    },
  },

  // Scene Composition Nodes
  {
    id: 'scene-throne-room',
    type: 'imageNode',
    position: { x: 650, y: 120 },
    data: { 
      label: 'Throne Room Scene',
      type: 'scene',
      status: 'composing',
      prompt: 'Knight and Princess in royal throne room, dramatic lighting',
      aiModel: 'Nano Banana',
      preview: '/api/placeholder/150/100'
    },
  },
  {
    id: 'scene-forest-journey',
    type: 'imageNode',
    position: { x: 650, y: 280 },
    data: { 
      label: 'Forest Journey',
      type: 'scene',
      status: 'ready',
      prompt: 'Knight traveling through enchanted forest, mysterious atmosphere',
      aiModel: 'Google Veo'
    },
  },
  {
    id: 'scene-dragon-battle',
    type: 'imageNode',
    position: { x: 650, y: 440 },
    data: { 
      label: 'Dragon Battle',
      type: 'scene',
      status: 'pending',
      prompt: 'Epic battle between knight and dragon, fire and sword combat',
      aiModel: 'RunwayML Gen-4'
    },
  },

  // Video Generation Nodes
  {
    id: 'video-opening',
    type: 'videoNode',
    position: { x: 850, y: 80 },
    data: { 
      label: 'Opening Sequence',
      type: 'video',
      status: 'generating',
      duration: '12.0s',
      aiModel: 'Google Veo 3',
      settings: 'Cinematic, 24fps, 4K'
    },
  },
  {
    id: 'video-journey',
    type: 'videoNode',
    position: { x: 850, y: 240 },
    data: { 
      label: 'Journey Through Forest',
      type: 'video',
      status: 'ready',
      duration: '8.5s',
      aiModel: 'RunwayML Gen-4',
      settings: 'Natural motion, 30fps'
    },
  },
  {
    id: 'video-climax',
    type: 'videoNode',
    position: { x: 850, y: 400 },
    data: { 
      label: 'Dragon Battle Climax',
      type: 'video',
      status: 'pending',
      duration: '15.2s',
      aiModel: 'Pika Labs',
      settings: 'Action sequence, High detail'
    },
  },

  // Audio Nodes
  {
    id: 'audio-dialogue-1',
    type: 'audioNode',
    position: { x: 1050, y: 120 },
    data: { 
      label: 'Knight Dialogue',
      type: 'dialogue',
      status: 'generated',
      duration: '12.0s',
      character: 'Sir Galahad',
      voiceModel: 'ElevenLabs'
    },
  },
  {
    id: 'audio-music-epic',
    type: 'audioNode',
    position: { x: 1050, y: 200 },
    data: { 
      label: 'Epic Orchestra',
      type: 'music',
      status: 'generated',
      duration: '45.0s',
      style: 'Cinematic orchestral',
      aiModel: 'Suno AI'
    },
  },
  {
    id: 'audio-sfx-battle',
    type: 'audioNode',
    position: { x: 1050, y: 280 },
    data: { 
      label: 'Battle SFX',
      type: 'sfx',
      status: 'ready',
      duration: '15.2s',
      effects: 'Sword clashing, Dragon roars',
      aiModel: 'Custom Library'
    },
  },
  {
    id: 'audio-ambient',
    type: 'audioNode',
    position: { x: 1050, y: 360 },
    data: { 
      label: 'Forest Ambience',
      type: 'ambient',
      status: 'generated',
      duration: '8.5s',
      atmosphere: 'Mystical forest sounds',
      aiModel: 'AudioGen'
    },
  },

  // Final Cut/Export Nodes
  {
    id: 'final-cut-1',
    type: 'finalCutNode',
    position: { x: 1250, y: 160 },
    data: { 
      label: 'Act I - Introduction',
      type: 'finalcut',
      status: 'ready',
      duration: '45.0s',
      scenes: 3,
      exportFormat: '4K H.264'
    },
  },
  {
    id: 'final-cut-2',
    type: 'finalCutNode',
    position: { x: 1250, y: 280 },
    data: { 
      label: 'Act II - Journey',
      type: 'finalcut',
      status: 'rendering',
      duration: '62.5s',
      scenes: 4,
      exportFormat: '4K H.264'
    },
  },
  {
    id: 'final-cut-3',
    type: 'finalCutNode',
    position: { x: 1250, y: 400 },
    data: { 
      label: 'Act III - Battle',
      type: 'finalcut',
      status: 'pending',
      duration: '78.2s',
      scenes: 5,
      exportFormat: '4K H.264'
    },
  },

  // Film Timeline Node (horizontal)
  {
    id: 'timeline-film',
    type: 'timelineNode',
    position: { x: 1450, y: 280 },
    data: { 
      label: 'Master Timeline',
      type: 'timeline',
      status: 'active',
      totalDuration: '185.7s',
      acts: ['Act I', 'Act II', 'Act III'],
      format: 'Cinematic Film Strip'
    },
  }
];

// Complex edge connections
const initialEdges: Edge[] = [
  // Character to Scene connections
  { id: 'e1', source: 'char-knight', target: 'scene-throne-room', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e2', source: 'char-princess', target: 'scene-throne-room', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e3', source: 'char-knight', target: 'scene-forest-journey', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e4', source: 'char-knight', target: 'scene-dragon-battle', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },
  { id: 'e5', source: 'char-dragon', target: 'scene-dragon-battle', animated: true, style: { stroke: 'hsl(var(--cinema-blue))' } },

  // Environment to Scene connections
  { id: 'e6', source: 'env-castle', target: 'scene-throne-room', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e7', source: 'env-forest', target: 'scene-forest-journey', style: { stroke: 'hsl(var(--image-purple))' } },
  { id: 'e8', source: 'env-dragon-lair', target: 'scene-dragon-battle', style: { stroke: 'hsl(var(--image-purple))' } },

  // Props to Scene connections
  { id: 'e9', source: 'prop-sword', target: 'scene-throne-room', style: { stroke: 'hsl(var(--director-gold))' } },
  { id: 'e10', source: 'prop-crown', target: 'scene-throne-room', style: { stroke: 'hsl(var(--director-gold))' } },
  { id: 'e11', source: 'prop-sword', target: 'scene-dragon-battle', style: { stroke: 'hsl(var(--director-gold))' } },

  // Scene to Video connections
  { id: 'e12', source: 'scene-throne-room', target: 'video-opening', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e13', source: 'scene-forest-journey', target: 'video-journey', style: { stroke: 'hsl(var(--video-red))' } },
  { id: 'e14', source: 'scene-dragon-battle', target: 'video-climax', style: { stroke: 'hsl(var(--video-red))' } },

  // Audio connections
  { id: 'e15', source: 'audio-dialogue-1', target: 'video-opening', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e16', source: 'audio-music-epic', target: 'video-opening', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e17', source: 'audio-ambient', target: 'video-journey', style: { stroke: 'hsl(var(--audio-green))' } },
  { id: 'e18', source: 'audio-sfx-battle', target: 'video-climax', style: { stroke: 'hsl(var(--audio-green))' } },

  // Video to Final Cut connections
  { id: 'e19', source: 'video-opening', target: 'final-cut-1', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e20', source: 'video-journey', target: 'final-cut-2', style: { stroke: 'hsl(var(--export-orange))' } },
  { id: 'e21', source: 'video-climax', target: 'final-cut-3', style: { stroke: 'hsl(var(--export-orange))' } },

  // Final Cut to Timeline connections
  { id: 'e22', source: 'final-cut-1', target: 'timeline-film', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 3 } },
  { id: 'e23', source: 'final-cut-2', target: 'timeline-film', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 3 } },
  { id: 'e24', source: 'final-cut-3', target: 'timeline-film', style: { stroke: 'hsl(var(--director-gold))', strokeWidth: 3 } }
];

// Custom Node Components
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
              <div key={i} className="w-8 h-8 bg-studio-dark rounded border overflow-hidden">
                <img src={ref} alt="Reference" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-cinema-blue/80 bg-studio-dark rounded p-1">
          {data.castingInfo}
        </div>

        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Edit
          </Button>
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
            <img src={data.preview} alt="Preview" className="w-full h-12 object-cover rounded" />
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

        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Edit
          </Button>
        </div>
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

        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Play className="w-3 h-3 mr-1" />
            Process
          </Button>
        </div>
      </div>
    </Card>
  );
}

function AudioNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel min-w-[160px] border-audio-green/30 hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="w-4 h-4 text-audio-green" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        <div className="text-xs text-audio-green capitalize">{data.type}</div>

        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-audio-green font-mono">{data.duration}</span>
        </div>

        {data.character && (
          <div className="text-xs text-muted-foreground">Voice: {data.character}</div>
        )}

        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Play className="w-3 h-3 mr-1" />
            Play
          </Button>
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

        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </Card>
  );
}

function TimelineNode({ data }: { data: any }) {
  return (
    <Card className="glass-panel w-[300px] h-[120px] border-director-gold/50 bg-gradient-to-r from-studio-dark to-studio-gray">
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-director-gold" />
            <span className="font-bold text-director-gold">{data.label}</span>
          </div>
          <Badge variant="outline" className="text-director-gold border-director-gold/30">
            LIVE
          </Badge>
        </div>

        {/* Film strip visualization */}
        <div className="flex-1 flex items-center space-x-1 my-2">
          {data.acts.map((act: string, i: number) => (
            <div key={i} className="flex-1 h-8 bg-director-gold/20 border border-director-gold/30 rounded flex items-center justify-center">
              <span className="text-xs text-director-gold font-mono">{act}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-director-gold">
          <span>Total: {data.totalDuration}</span>
          <span>{data.format}</span>
        </div>
      </div>
    </Card>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ready': return 'text-audio-green border-audio-green/30';
    case 'generated': return 'text-cinema-blue border-cinema-blue/30';
    case 'generating': return 'text-director-gold border-director-gold/30';
    case 'composing': return 'text-image-purple border-image-purple/30';
    case 'rendering': return 'text-video-red border-video-red/30';
    case 'active': return 'text-director-gold border-director-gold/30';
    case 'pending': return 'text-muted-foreground border-muted-foreground/30';
    default: return 'text-foreground/50 border-foreground/20';
  }
}

const nodeTypes = {
  characterNode: CharacterNode,
  imageNode: ImageNode,
  videoNode: VideoNode,
  audioNode: AudioNode,
  finalCutNode: FinalCutNode,
  timelineNode: TimelineNode,
};

export function NodeWorkspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="workspace h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="h-full"
      >
        <Controls 
          className="!bg-studio-gray !border-studio-accent"
          position="bottom-right"
        />
        <MiniMap 
          className="!bg-studio-gray !border-studio-accent"
          nodeClassName="!fill-director-gold"
          maskColor="rgb(0, 0, 0, 0.8)"
          position="bottom-left"
        />
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--studio-accent))"
          className="opacity-50"
        />
      </ReactFlow>
      
      {/* Production Status Overlay */}
      <div className="absolute top-4 right-4 space-y-2">
        <Card className="glass-panel p-3">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-audio-green rounded-full animate-pulse" />
            <span>Epic Fantasy Production</span>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
        </Card>
        
        <Card className="glass-panel p-3">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assets:</span>
              <span className="text-director-gold">23/25 ready</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Duration:</span>
              <span className="text-cinema-blue">3m 5s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Budget Used:</span>
              <span className="text-video-red">$127.45</span>
            </div>
          </div>
        </Card>

        <Card className="glass-panel p-3">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Queue:</span>
              <span className="text-image-purple">5 tasks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ETA:</span>
              <span className="text-audio-green">~8m 30s</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}