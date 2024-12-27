'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface ComponentItem {
  id: string;
  type: 'image' | 'shape' | 'text' | 'decoration';
  name: string;
  preview: string;
  data: any;
}

interface ComponentLibraryProps {
  items: ComponentItem[];
  onSearch?: (query: string) => void;
}

export function ComponentLibrary({ items, onSearch }: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleDragStart = (e: React.DragEvent, item: ComponentItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: item.type,
      ...item.data
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-2">
        <Input
          placeholder="搜索组件..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1"
        />
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>

      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-2 gap-2 p-2">
          {items.map((item) => (
            <Card
              key={item.id}
              className="p-2 cursor-move hover:border-primary"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
            >
              <div className="aspect-square relative">
                <img
                  src={item.preview}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-1 text-xs text-center truncate">
                {item.name}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 