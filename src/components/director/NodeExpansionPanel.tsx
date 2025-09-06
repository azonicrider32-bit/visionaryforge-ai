import React from 'react';
import { X, Save, Copy, Download, Settings, Palette, Camera, Mic, Video, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NodeExpansionPanelProps {
  node: any;
  isOpen: boolean;
  onClose: () => void;
}

export const NodeExpansionPanel: React.FC<NodeExpansionPanelProps> = ({ node, isOpen, onClose }) => {
  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-4 bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{node.data?.title || 'Node Settings'}</h2>
            <p className="text-sm text-muted-foreground">Advanced configuration and AI parameters</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Node Name</label>
                  <Input placeholder="Enter node name..." defaultValue={node.data?.title || ''} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea placeholder="Describe this node's purpose..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Prompt</label>
                  <Textarea 
                    placeholder="Enter main AI prompt for generation..." 
                    rows={4}
                    defaultValue="A cyberpunk detective in a neon-lit alley, rain falling, dramatic lighting, cinematic composition"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Negative Prompt</label>
                  <Textarea 
                    placeholder="What to avoid in generation..." 
                    rows={3}
                    defaultValue="blurry, low quality, distorted, cartoon"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Style Tags</label>
                  <Input placeholder="cyberpunk, noir, cinematic..." defaultValue="cyberpunk, noir, cinematic, 4k" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Width</label>
                    <Select defaultValue="1024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512px</SelectItem>
                        <SelectItem value="768">768px</SelectItem>
                        <SelectItem value="1024">1024px</SelectItem>
                        <SelectItem value="1536">1536px</SelectItem>
                        <SelectItem value="2048">2048px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Height</label>
                    <Select defaultValue="1024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512px</SelectItem>
                        <SelectItem value="768">768px</SelectItem>
                        <SelectItem value="1024">1024px</SelectItem>
                        <SelectItem value="1536">1536px</SelectItem>
                        <SelectItem value="2048">2048px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-settings" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Model</label>
                  <Select defaultValue="dalle3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dalle3">DALL-E 3 (OpenAI)</SelectItem>
                      <SelectItem value="sdxl">Stable Diffusion XL</SelectItem>
                      <SelectItem value="midjourney">Midjourney</SelectItem>
                      <SelectItem value="flux">Flux Pro</SelectItem>
                      <SelectItem value="nanobana">Nano Banana</SelectItem>
                      <SelectItem value="veo3">Google Veo 3</SelectItem>
                      <SelectItem value="runway">RunwayML Gen-4</SelectItem>
                      <SelectItem value="pika">Pika Labs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Creativity Scale</label>
                  <Slider defaultValue={[7]} max={10} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quality Priority</label>
                  <Slider defaultValue={[8]} max={10} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Fast</span>
                    <span>Balanced</span>
                    <span>Quality</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Guidance Scale</label>
                  <Slider defaultValue={[7.5]} max={20} step={0.5} className="mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">Controls prompt adherence (1-20)</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Inference Steps</label>
                  <Slider defaultValue={[50]} max={150} step={5} className="mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">Generation iterations (20-150)</div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Seed (Reproducibility)</label>
                  <Input placeholder="Enter seed number or leave blank for random" type="number" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Use Controlnet</label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Face Enhancement</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Apply Upscaling</label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color & Style
                </h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Color Palette</label>
                  <Select defaultValue="cyberpunk">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cyberpunk">Cyberpunk (Neon)</SelectItem>
                      <SelectItem value="noir">Film Noir (B&W)</SelectItem>
                      <SelectItem value="warm">Warm Tones</SelectItem>
                      <SelectItem value="cool">Cool Tones</SelectItem>
                      <SelectItem value="natural">Natural Colors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Saturation</label>
                  <Slider defaultValue={[8]} max={10} step={1} className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contrast</label>
                  <Slider defaultValue={[7]} max={10} step={1} className="mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Camera & Composition
                </h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Camera Angle</label>
                  <Select defaultValue="eye-level">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bird-eye">Bird's Eye View</SelectItem>
                      <SelectItem value="high">High Angle</SelectItem>
                      <SelectItem value="eye-level">Eye Level</SelectItem>
                      <SelectItem value="low">Low Angle</SelectItem>
                      <SelectItem value="worm-eye">Worm's Eye View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Shot Type</label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extreme-wide">Extreme Wide Shot</SelectItem>
                      <SelectItem value="wide">Wide Shot</SelectItem>
                      <SelectItem value="medium">Medium Shot</SelectItem>
                      <SelectItem value="close-up">Close-up</SelectItem>
                      <SelectItem value="extreme-close">Extreme Close-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Depth of Field</label>
                  <Slider defaultValue={[6]} max={10} step={1} className="mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Lighting & Atmosphere</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Lighting Setup</label>
                  <Select defaultValue="dramatic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural Light</SelectItem>
                      <SelectItem value="studio">Studio Lighting</SelectItem>
                      <SelectItem value="dramatic">Dramatic Lighting</SelectItem>
                      <SelectItem value="neon">Neon/Artificial</SelectItem>
                      <SelectItem value="moonlight">Moonlight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mood Intensity</label>
                  <Slider defaultValue={[8]} max={10} step={1} className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Add Rain Effect</label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Audio Generation
                </h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Voice Model</label>
                  <Select defaultValue="elevenlabs-adam">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs-adam">ElevenLabs - Adam</SelectItem>
                      <SelectItem value="elevenlabs-bella">ElevenLabs - Bella</SelectItem>
                      <SelectItem value="elevenlabs-charlie">ElevenLabs - Charlie</SelectItem>
                      <SelectItem value="openai-nova">OpenAI - Nova</SelectItem>
                      <SelectItem value="custom-clone">Custom Voice Clone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Emotion</label>
                  <Select defaultValue="serious">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="angry">Angry</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="mysterious">Mysterious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Speech Speed</label>
                  <Slider defaultValue={[1]} max={2} min={0.5} step={0.1} className="mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Audio Processing</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Music</label>
                  <Select defaultValue="cyberpunk-ambient">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="cyberpunk-ambient">Cyberpunk Ambient</SelectItem>
                      <SelectItem value="noir-jazz">Noir Jazz</SelectItem>
                      <SelectItem value="action-drums">Action Drums</SelectItem>
                      <SelectItem value="suspense">Suspense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sound Effects</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rain Sounds</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">City Traffic</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Footsteps</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Performance Settings</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Processing Priority</label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="speed">Speed Optimized</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="quality">Quality Optimized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Use GPU Acceleration</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Caching</label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Batch Size</label>
                  <Slider defaultValue={[4]} max={16} min={1} step={1} className="mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">AI Safety & Ethics</h3>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Content Safety Filter</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Bias Detection</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Ethical Guidelines</label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Data Usage Policy</label>
                  <Select defaultValue="project-only">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-only">Project Only</SelectItem>
                      <SelectItem value="improvement">Model Improvement</SelectItem>
                      <SelectItem value="research">Research Purposes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Export Options</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Output Format</label>
                  <Select defaultValue="png">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG (Lossless)</SelectItem>
                      <SelectItem value="jpg">JPG (Compressed)</SelectItem>
                      <SelectItem value="webp">WebP (Optimized)</SelectItem>
                      <SelectItem value="tiff">TIFF (Professional)</SelectItem>
                      <SelectItem value="mp4">MP4 (Video)</SelectItem>
                      <SelectItem value="mov">MOV (Professional Video)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quality Level</label>
                  <Slider defaultValue={[9]} max={10} step={1} className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Include Metadata</label>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Sharing & Distribution</h3>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-upload to Cloud</label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Generate Preview</label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sharing Permissions</label>
                  <Select defaultValue="private">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="team">Team Only</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-6 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            <Save className="w-4 h-4 mr-2" />
            Save & Generate
          </Button>
        </div>
      </div>
    </div>
  );
};