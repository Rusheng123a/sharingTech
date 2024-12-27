'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './ColorPicker';
import { ImageUploader } from './ImageUploader';

interface BackgroundSettingsProps {
  onBackgroundChange: (background: {
    type: 'color' | 'gradient' | 'texture' | 'image';
    value: string;
    options?: any;
  }) => void;
}

export function BackgroundSettings({ onBackgroundChange }: BackgroundSettingsProps) {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [gradientColors, setGradientColors] = useState(['#ffffff', '#000000']);
  const [gradientAngle, setGradientAngle] = useState(0);

  const handleSolidColorChange = (color: string) => {
    onBackgroundChange({
      type: 'color',
      value: color
    });
  };

  const handleGradientChange = () => {
    const gradientOptions = {
      type: gradientType,
      coords: { x1: 0, y1: 0, x2: 0, y2: 0 },
      colorStops: [
        { offset: 0, color: gradientColors[0] },
        { offset: 1, color: gradientColors[1] }
      ]
    };

    if (gradientType === 'linear') {
      const angle = (gradientAngle * Math.PI) / 180;
      gradientOptions.coords = {
        x1: 0,
        y1: 0,
        x2: Math.cos(angle),
        y2: Math.sin(angle)
      };
    }

    onBackgroundChange({
      type: 'gradient',
      value: 'gradient',
      options: gradientOptions
    });
  };

  const handleTextureUpload = (imageUrl: string) => {
    onBackgroundChange({
      type: 'texture',
      value: imageUrl
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    onBackgroundChange({
      type: 'image',
      value: imageUrl
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium mb-4">背景设置</h3>
      <Tabs defaultValue="color">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="color">纯色</TabsTrigger>
          <TabsTrigger value="gradient">渐变</TabsTrigger>
          <TabsTrigger value="texture">纹理</TabsTrigger>
          <TabsTrigger value="image">图片</TabsTrigger>
        </TabsList>

        <TabsContent value="color" className="space-y-4">
          <div>
            <Label>选择颜色</Label>
            <ColorPicker color="#ffffff" onChange={handleSolidColorChange} />
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-4">
          <div>
            <Label>渐变类型</Label>
            <select
              className="w-full p-2 border rounded"
              value={gradientType}
              onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
            >
              <option value="linear">线性渐变</option>
              <option value="radial">径向渐变</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>渐变颜色</Label>
            <div className="flex gap-2">
              <ColorPicker
                color={gradientColors[0]}
                onChange={(color) => {
                  setGradientColors([color, gradientColors[1]]);
                  handleGradientChange();
                }}
              />
              <ColorPicker
                color={gradientColors[1]}
                onChange={(color) => {
                  setGradientColors([gradientColors[0], color]);
                  handleGradientChange();
                }}
              />
            </div>
          </div>

          {gradientType === 'linear' && (
            <div>
              <Label>渐变角度: {gradientAngle}°</Label>
              <Input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => {
                  setGradientAngle(Number(e.target.value));
                  handleGradientChange();
                }}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="texture" className="space-y-4">
          <div>
            <Label>上传纹理</Label>
            <ImageUploader onUpload={handleTextureUpload} />
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div>
            <Label>上传图片</Label>
            <ImageUploader onUpload={handleImageUpload} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 