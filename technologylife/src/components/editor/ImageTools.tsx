'use client';

import { Canvas, Image as FabricImage } from 'fabric';
import * as fabric from 'fabric';
import { useToast } from '@/components/ui/use-toast';

export interface ImageToolsProps {
  canvas: Canvas | null;
}

export function ImageTools({ canvas }: ImageToolsProps) {
  const { toast } = useToast();

  const handleFilter = (filter: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Image)) {
      toast({
        title: '请先选择图片',
        description: '该操作只能应用于图片对象',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    try {
      const image = activeObject as fabric.Image;
      if (!image.filters) {
        image.filters = [];
      }

      switch (filter) {
        case 'grayscale':
          image.filters.push(new fabric.Image.filters.Grayscale());
          break;
        case 'sepia':
          image.filters.push(new fabric.Image.filters.Sepia());
          break;
        case 'invert':
          image.filters.push(new fabric.Image.filters.Invert());
          break;
        case 'brightness':
          image.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.1 }));
          break;
        case 'contrast':
          image.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.1 }));
          break;
      }
      
      image.applyFilters();
      canvas.renderAll();

      toast({
        title: '滤镜应用成功',
        description: `已应用${filter}滤镜`,
        duration: 1500
      });
    } catch (error) {
      console.error('应用滤镜失败:', error);
      toast({
        title: '应用滤镜失败',
        description: '处理图片时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  const handleResize = (scale: number) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      toast({
        title: '请先选择对象',
        description: '没有选中任何对象',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    try {
      const currentScale = activeObject.scaleX || 1;
      const newScale = currentScale * scale;
      
      // 限制缩放范围
      if (newScale < 0.1 || newScale > 5) {
        toast({
          title: '缩放超出范围',
          description: '缩放比例必须在 0.1 到 5 之间',
          variant: 'destructive',
          duration: 2000
        });
        return;
      }

      activeObject.scale(newScale);
      canvas.renderAll();

      toast({
        title: '调整大小成功',
        description: `缩放比例: ${newScale.toFixed(2)}`,
        duration: 1500
      });
    } catch (error) {
      console.error('调整大小失败:', error);
      toast({
        title: '调整大小失败',
        description: '处理对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">滤镜效果</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleFilter('grayscale')}
          >
            黑白
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleFilter('sepia')}
          >
            复古
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleFilter('invert')}
          >
            反色
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleFilter('brightness')}
          >
            亮度
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleFilter('contrast')}
          >
            对比度
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">调整大小</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleResize(0.9)}
          >
            缩小
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleResize(1.1)}
          >
            放大
          </button>
        </div>
      </div>
    </div>
  );
} 