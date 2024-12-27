'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateSelectorProps {
  onSelect: (template: string) => void;
}

const templates = [
  {
    id: 1,
    name: '简约文字',
    preview: '/templates/simple-text.png',
    template: JSON.stringify({
      objects: [
        {
          type: 'text',
          text: '简约标题',
          fontSize: 48,
          fontFamily: 'Arial',
          left: 100,
          top: 100,
        }
      ],
      background: '#ffffff'
    })
  },
  {
    id: 2,
    name: '渐变艺术',
    preview: '/templates/gradient-art.png',
    template: JSON.stringify({
      objects: [
        {
          type: 'text',
          text: '艺术标题',
          fontSize: 64,
          fontFamily: 'ArtFont1',
          left: 100,
          top: 100,
          fill: 'gradient'
        }
      ],
      background: '#f0f0f0'
    })
  },
  {
    id: 3,
    name: '多彩排版',
    preview: '/templates/colorful-layout.png',
    template: JSON.stringify({
      objects: [
        {
          type: 'text',
          text: '主标题',
          fontSize: 72,
          fontFamily: 'ArtFont2',
          left: 100,
          top: 50,
        },
        {
          type: 'text',
          text: '副标题',
          fontSize: 36,
          fontFamily: 'Handwriting',
          left: 100,
          top: 150,
        }
      ],
      background: '#ffffff'
    })
  },
];

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (template: typeof templates[0]) => {
    setSelectedId(template.id);
    onSelect(template.template);
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="grid grid-cols-2 gap-2 p-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-2 cursor-pointer hover:border-blue-500 ${
              selectedId === template.id ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => handleSelect(template)}
          >
            <div className="aspect-video bg-gray-100 rounded mb-2">
              {template.preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
            <div className="text-sm font-medium text-center">{template.name}</div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
} 