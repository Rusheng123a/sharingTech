'use client';

import { Dispatch, SetStateAction } from 'react';

export type ToolType = 'image' | 'text' | 'shape';

export interface ToolbarProps {
  activeTab: ToolType;
  onTabChange: Dispatch<SetStateAction<ToolType>>;
}

export function Toolbar({ activeTab, onTabChange }: ToolbarProps) {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onTabChange('image')}
      >
        图片工具
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onTabChange('text')}
      >
        文字工具
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'shape' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onTabChange('shape')}
      >
        形状工具
      </button>
    </div>
  );
} 