'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FontSelectorProps {
  onSelect: (font: string) => void;
}

const fontCategories = [
  {
    name: '常规字体',
    fonts: [
      { name: 'Arial', style: 'Arial' },
      { name: 'Times New Roman', style: 'Times New Roman' },
      { name: 'Helvetica', style: 'Helvetica' },
      { name: '微软雅黑', style: 'Microsoft YaHei' },
      { name: '宋体', style: 'SimSun' },
    ]
  },
  {
    name: '艺术字体',
    fonts: [
      { name: '艺术字体1', style: 'ArtFont1' },
      { name: '艺术字体2', style: 'ArtFont2' },
      { name: '手写体', style: 'Handwriting' },
      { name: '书法体', style: 'Calligraphy' },
      { name: '创意体', style: 'Creative' },
    ]
  },
  {
    name: '特效字体',
    fonts: [
      { name: '霓虹灯', style: 'Neon' },
      { name: '金属质感', style: 'Metallic' },
      { name: '立体效果', style: '3D' },
      { name: '水彩效果', style: 'Watercolor' },
      { name: '复古风格', style: 'Vintage' },
    ]
  }
];

export function FontSelector({ onSelect }: FontSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const previewText = '你好，Hello';

  const handleFontSelect = (style: string) => {
    setSelectedFont(style);
    onSelect(style);
  };

  const filteredCategories = fontCategories.map(category => ({
    ...category,
    fonts: category.fonts.filter(font =>
      font.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.fonts.length > 0);

  return (
    <div className="space-y-4">
      <div>
        <Label>搜索字体</Label>
        <Input
          type="text"
          placeholder="输入字体名称..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="h-[300px]">
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-4">
            <h3 className="text-sm font-medium mb-2">{category.name}</h3>
            <div className="grid grid-cols-1 gap-2">
              {category.fonts.map((font) => (
                <Card
                  key={font.style}
                  className={`p-2 cursor-pointer hover:border-blue-500 ${
                    selectedFont === font.style ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => handleFontSelect(font.style)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{font.name}</span>
                    <span
                      className="text-lg truncate"
                      style={{ fontFamily: font.style }}
                    >
                      {previewText}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>

      {selectedFont && (
        <div className="p-4 border rounded">
          <Label>预览</Label>
          <div
            className="mt-2 text-2xl text-center"
            style={{ fontFamily: selectedFont }}
          >
            {previewText}
          </div>
        </div>
      )}
    </div>
  );
} 