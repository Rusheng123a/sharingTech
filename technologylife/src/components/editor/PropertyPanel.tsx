'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from './ColorPicker';
import  * as fabric  from 'fabric';

interface PropertyPanelProps {
  selectedObject: fabric.Object | null;
  onUpdate: (updates: any) => void;
}

export function PropertyPanel({ selectedObject, onUpdate }: PropertyPanelProps) {
  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    angle: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    fill: '#000000',
    fontSize: 20,
    fontFamily: 'Arial',
  });

  useEffect(() => {
    if (selectedObject) {
      const props = {
        left: Math.round(selectedObject.left || 0),
        top: Math.round(selectedObject.top || 0),
        width: Math.round(selectedObject.width || 100),
        height: Math.round(selectedObject.height || 100),
        angle: selectedObject.angle || 0,
        scaleX: selectedObject.scaleX || 1,
        scaleY: selectedObject.scaleY || 1,
        opacity: selectedObject.opacity || 1,
        fill: (selectedObject as any).fill || '#000000',
        fontSize: (selectedObject as any).fontSize || 20,
        fontFamily: (selectedObject as any).fontFamily || 'Arial',
      };
      setProperties(props);
    }
  }, [selectedObject]);

  const handleChange = (key: string, value: any) => {
    setProperties(prev => ({ ...prev, [key]: value }));
    onUpdate({ [key]: value });
  };

  if (!selectedObject) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        请选择一个对象来编辑属性
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label>位置</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              value={properties.left}
              onChange={(e) => handleChange('left', Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              value={properties.top}
              onChange={(e) => handleChange('top', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div>
        <Label>大���</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">宽度</Label>
            <Input
              type="number"
              value={properties.width}
              onChange={(e) => handleChange('width', Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="text-xs">高度</Label>
            <Input
              type="number"
              value={properties.height}
              onChange={(e) => handleChange('height', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div>
        <Label>旋转角度: {properties.angle}°</Label>
        <Slider
          value={[properties.angle]}
          onValueChange={(value) => handleChange('angle', value[0])}
          min={0}
          max={360}
          step={1}
        />
      </div>

      <div>
        <Label>缩放</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              value={properties.scaleX}
              onChange={(e) => handleChange('scaleX', Number(e.target.value))}
              step={0.1}
              min={0.1}
            />
          </div>
          <div>
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              value={properties.scaleY}
              onChange={(e) => handleChange('scaleY', Number(e.target.value))}
              step={0.1}
              min={0.1}
            />
          </div>
        </div>
      </div>

      <div>
        <Label>透明度: {Math.round(properties.opacity * 100)}%</Label>
        <Slider
          value={[properties.opacity * 100]}
          onValueChange={(value) => handleChange('opacity', value[0] / 100)}
          min={0}
          max={100}
          step={1}
        />
      </div>

      {selectedObject.type === 'text' && (
        <>
          <div>
            <Label>字体</Label>
            <select
              className="w-full p-2 border rounded"
              value={properties.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          <div>
            <Label>字体大��</Label>
            <Input
              type="number"
              value={properties.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
              min={1}
            />
          </div>

          <div>
            <Label>颜色</Label>
            <ColorPicker
              color={properties.fill}
              onChange={(color) => handleChange('fill', color)}
            />
          </div>
        </>
      )}
    </div>
  );
} 