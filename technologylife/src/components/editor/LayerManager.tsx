'use client';

import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Image,
  Type,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Layer {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

interface LayerManagerProps {
  layers: Layer[];
  selectedLayer?: string;
  onLayerSelect: (id: string) => void;
  onLayerVisibilityToggle: (id: string) => void;
  onLayerLockToggle: (id: string) => void;
  onLayerDelete: (id: string) => void;
  onLayerMove: (id: string, direction: 'up' | 'down') => void;
}

export function LayerManager({
  layers,
  selectedLayer,
  onLayerSelect,
  onLayerVisibilityToggle,
  onLayerLockToggle,
  onLayerDelete,
  onLayerMove
}: LayerManagerProps) {
  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold">图层管理</h3>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center gap-2 p-2 rounded-md border ${
              selectedLayer === layer.id ? 'bg-accent' : ''
            }`}
            onClick={() => onLayerSelect(layer.id)}
          >
            <div className="flex-1 flex items-center gap-2">
              {getLayerIcon(layer.type)}
              <span className="text-sm truncate">{layer.name}</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerVisibilityToggle(layer.id);
                }}
              >
                {layer.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerLockToggle(layer.id);
                }}
              >
                {layer.locked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Unlock className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerMove(layer.id, 'up');
                }}
                disabled={layers.indexOf(layer) === layers.length - 1}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerMove(layer.id, 'down');
                }}
                disabled={layers.indexOf(layer) === 0}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerDelete(layer.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 