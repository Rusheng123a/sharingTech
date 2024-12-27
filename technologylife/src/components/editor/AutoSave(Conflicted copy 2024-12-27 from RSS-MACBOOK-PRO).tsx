'use client';

import { useEffect } from 'react';
import { Canvas } from 'fabric';
import { useToast } from '@/components/ui/use-toast';

export interface AutoSaveProps {
  canvas: Canvas | null;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function AutoSave({ canvas, enabled, onToggle }: AutoSaveProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (!canvas || !enabled) return;

    const handleModified = () => {
      try {
        const state = JSON.stringify(canvas.toJSON());
        localStorage.setItem('canvasState', state);
        
        toast({
          title: '自动保存成功',
          description: '画布状态已保存',
          duration: 1500
        });
      } catch (error) {
        console.error('自动保存失败:', error);
        toast({
          title: '自动保存失败',
          description: '保存画布状态时发生错误',
          variant: 'destructive',
          duration: 2000
        });
      }
    };

    canvas.on('object:modified', handleModified);
    canvas.on('object:added', handleModified);
    canvas.on('object:removed', handleModified);

    return () => {
      canvas.off('object:modified', handleModified);
      canvas.off('object:added', handleModified);
      canvas.off('object:removed', handleModified);
    };
  }, [canvas, enabled, toast]);

  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    toast({
      title: checked ? '已开启自动保存' : '已关闭自动保存',
      description: checked ? '画布修改将自动保存' : '画布修改将不会自动保存',
      duration: 2000
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
      <span className="text-sm font-medium text-gray-900">自动保存</span>
    </div>
  );
} 