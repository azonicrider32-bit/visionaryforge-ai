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
  Play
} from 'lucide-react';

// Initial nodes for the demo
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'directorNode',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Script Input',
      type: 'script',
      status: 'ready',
      content: 'Medieval fantasy scene with dragon...'
    },
  },
  {
    id: '2',
    type: 'directorNode', 
    position: { x: 100, y: 200 },
    data: { 
      label: 'Character: Knight',
      type: 'character',
      status: 'generated',
      preview: '/api/placeholder/150/150'
    },
  },
  {
    id: '3',
    type: 'directorNode',
    position: { x: 400, y: 200 },
    data: { 
      label: 'Environment: Castle',
      type: 'image', 
      status: 'generating',
      preview: '/api/placeholder/150/150'
    },
  },
  {
    id: '4',
    type: 'directorNode',
    position: { x: 250, y: 320 },
    data: { 
      label: 'Video Generation',
      type: 'video',
      status: 'pending',
      duration: '5.2s'
    },
  },
  {
    id: '5',
    type: 'directorNode',
    position: { x: 400, y: 420 },
    data: { 
      label: 'Audio Track',
      type: 'audio',
      status: 'ready',
      duration: '5.2s'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: 'hsl(var(--director-gold))' }
  },
  {
    id: 'e1-3', 
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: 'hsl(var(--director-gold))' }
  },
  {
    id: 'e2-4',
    source: '2', 
    target: '4',
    style: { stroke: 'hsl(var(--cinema-blue))' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4', 
    style: { stroke: 'hsl(var(--cinema-blue))' }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style: { stroke: 'hsl(var(--audio-green))' }
  },
];

// Custom Node Component
function DirectorNode({ data }: { data: any }) {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'script': return FileText;
      case 'character': return Users;
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      default: return Zap;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-audio-green border-audio-green/30';
      case 'generated': return 'text-cinema-blue border-cinema-blue/30';
      case 'generating': return 'text-director-gold border-director-gold/30';
      case 'pending': return 'text-muted-foreground border-muted-foreground/30';
      default: return 'text-foreground/50 border-foreground/20';
    }
  };

  const Icon = getNodeIcon(data.type);

  return (
    <Card className="glass-panel min-w-[200px] hover:bg-studio-light/20 transition-all duration-300">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-director-gold" />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>

        {/* Content Preview */}
        {data.preview && (
          <div className="bg-studio-dark rounded-lg p-2">
            <img 
              src={data.preview} 
              alt="Preview" 
              className="w-full h-20 object-cover rounded"
            />
          </div>
        )}

        {data.content && (
          <div className="bg-studio-dark rounded-lg p-2">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.content}
            </p>
          </div>
        )}

        {data.duration && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-director-gold font-mono">{data.duration}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {data.status === 'ready' && (
            <Button size="sm" variant="outline" className="flex-1">
              <Play className="w-3 h-3 mr-1" />
              Process
            </Button>
          )}
          {data.status === 'generated' && (
            <Button size="sm" variant="outline" className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

const nodeTypes = {
  directorNode: DirectorNode,
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
      
      {/* Workspace Overlay Info */}
      <div className="absolute top-4 right-4 space-y-2">
        <Card className="glass-panel p-3">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-audio-green rounded-full animate-pulse" />
            <span>Live Collaboration</span>
            <Badge variant="outline" className="text-xs">3 users</Badge>
          </div>
        </Card>
        
        <Card className="glass-panel p-3">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing:</span>
              <span className="text-director-gold">2/5 nodes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated:</span>
              <span className="text-cinema-blue">~3m 15s</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}