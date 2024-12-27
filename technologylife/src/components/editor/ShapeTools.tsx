'use client';

import { Canvas } from 'fabric';
import * as fabric from 'fabric';
import { useToast } from '@/components/ui/use-toast';

export interface ShapeToolsProps {
  canvas: Canvas | null;
}

export function ShapeTools({ canvas }: ShapeToolsProps) {
  const { toast } = useToast();

  const handleAddShape = (type: string) => {
    if (!canvas) return;

    try {
      let shape;
      switch (type) {
        case 'rect':
          shape = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: '#ff0000',
            opacity: 0.7
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50,
            fill: '#00ff00',
            opacity: 0.7
          });
          break;
        case 'triangle':
          shape = new fabric.Triangle({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: '#0000ff',
            opacity: 0.7
          });
          break;
        case 'polygon':
          shape = new fabric.Polygon([
            { x: 0, y: 0 },
            { x: 50, y: 0 },
            { x: 75, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 100 },
            { x: -25, y: 50 }
          ], {
            left: 100,
            top: 100,
            fill: '#ff00ff',
            opacity: 0.7
          });
          break;
      }

      if (shape) {
        canvas.add(shape);
        canvas.setActiveObject(shape);
        canvas.renderAll();

        toast({
          title: '添加形状成功',
          description: `已添加${type}形状`,
          duration: 1500
        });
      }
    } catch (error) {
      console.error('添加形状失败:', error);
      toast({
        title: '添加形状失败',
        description: '创建形状对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  const handleShapeStyle = (style: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      toast({
        title: '请先选择形状',
        description: '没有选中任何对象',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    try {
      switch (style) {
        case 'stroke':
          activeObject.set({
            stroke: '#000000',
            strokeWidth: 2
          });
          break;
        case 'gradient':
          const gradient = new fabric.Gradient({
            type: 'linear',
            coords: {
              x1: 0,
              y1: 0,
              x2: activeObject.width || 100,
              y2: 0
            },
            colorStops: [
              { offset: 0, color: '#ff0000' },
              { offset: 0.5, color: '#00ff00' },
              { offset: 1, color: '#0000ff' }
            ]
          });
          activeObject.set({ fill: gradient });
          break;
        case 'shadow':
          activeObject.set({
            shadow: new fabric.Shadow({
              color: 'rgba(0,0,0,0.3)',
              blur: 10,
              offsetX: 5,
              offsetY: 5
            })
          });
          break;
      }
      canvas.renderAll();

      toast({
        title: '应用样式成功',
        description: `已应用${style}样式`,
        duration: 1500
      });
    } catch (error) {
      console.error('应用样式失败:', error);
      toast({
        title: '应用样式失败',
        description: '处理形状对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">添加形状</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleAddShape('rect')}
          >
            矩形
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleAddShape('circle')}
          >
            圆形
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleAddShape('triangle')}
          >
            三角形
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleAddShape('polygon')}
          >
            多边形
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">形状样式</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleShapeStyle('stroke')}
          >
            描边
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleShapeStyle('gradient')}
          >
            渐变
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleShapeStyle('shadow')}
          >
            阴影
          </button>
        </div>
      </div>
    </div>
  );
} 