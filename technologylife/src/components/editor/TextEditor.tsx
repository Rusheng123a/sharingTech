'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from './ColorPicker';

interface TextEditorProps {
  onApply: (text: string, font: string, color: string) => void;
}

export function TextEditor({ onApply }: TextEditorProps) {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [effects, setEffects] = useState({
    shadow: false,
    outline: false,
    gradient: false
  });

  const fonts = [
    { name: 'Arial', style: 'Arial' },
    { name: '艺术字体1', style: 'ArtFont1' },
    { name: '艺术字体2', style: 'ArtFont2' },
    { name: '手写体', style: 'Handwriting' },
  ];

  const handleApply = () => {
    const styleString = `
      font-family: ${selectedFont};
      font-size: ${fontSize}px;
      color: ${color};
      ${effects.shadow ? 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3);' : ''}
      ${effects.outline ? '-webkit-text-stroke: 1px #000;' : ''}
      ${effects.gradient ? 'background: linear-gradient(45deg, #ff0000, #00ff00);-webkit-background-clip: text;-webkit-text-fill-color: transparent;' : ''}
    `;
    onApply(text, styleString, color);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>文本内容</Label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文字内容"
        />
      </div>

      <div>
        <Label>字体选择</Label>
        <select
          className="w-full p-2 border rounded"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          {fonts.map((font) => (
            <option key={font.style} value={font.style}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>字体大小: {fontSize}px</Label>
        <Slider
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={12}
          max={72}
          step={1}
        />
      </div>

      <div>
        <Label>文字颜色</Label>
        <ColorPicker color={color} onChange={setColor} />
      </div>

      <div className="space-y-2">
        <Label>特效</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={effects.shadow ? "default" : "outline"}
            onClick={() => setEffects(prev => ({ ...prev, shadow: !prev.shadow }))}
          >
            阴影
          </Button>
          <Button
            variant={effects.outline ? "default" : "outline"}
            onClick={() => setEffects(prev => ({ ...prev, outline: !prev.outline }))}
          >
            描边
          </Button>
          <Button
            variant={effects.gradient ? "default" : "outline"}
            onClick={() => setEffects(prev => ({ ...prev, gradient: !prev.gradient }))}
          >
            渐变
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Label>预览</Label>
        <div
          className="p-4 border rounded min-h-[100px] flex items-center justify-center"
          style={{
            fontFamily: selectedFont,
            fontSize: `${fontSize}px`,
            color: color,
            textShadow: effects.shadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
            WebkitTextStroke: effects.outline ? '1px #000' : 'none',
            background: effects.gradient ? 'linear-gradient(45deg, #ff0000, #00ff00)' : 'none',
            WebkitBackgroundClip: effects.gradient ? 'text' : 'none',
            WebkitTextFillColor: effects.gradient ? 'transparent' : 'inherit',
          }}
        >
          {text || '预览文本'}
        </div>
      </div>

      <Button className="w-full" onClick={handleApply}>
        应用文字
      </Button>
    </div>
  );
} 