'use client';

import { Canvas } from 'fabric';
import * as fabric from 'fabric';
import { useToast } from '@/components/ui/use-toast';

export interface TextToolsProps {
  canvas: Canvas | null;
}

export function TextTools({ canvas }: TextToolsProps) {
  const { toast } = useToast();

  const handleAddText = () => {
    if (!canvas) return;

    try {
      const text = new fabric.IText('双击编辑文字', {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: '#000000',
        fontFamily: 'Arial'
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();

      toast({
        title: '添加文字成功',
        description: '双击文字可以直接编辑',
        duration: 2000
      });
    } catch (error) {
      console.error('添加文字失败:', error);
      toast({
        title: '添加文字失败',
        description: '创建文字对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  const handleTextEffect = (effect: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.IText)) {
      toast({
        title: '请先选择文字',
        description: '该操作只能应用于文字对象',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    try {
      const text = activeObject;
      switch (effect) {
        case 'shadow':
          text.set({
            shadow: new fabric.Shadow({
              color: 'rgba(0,0,0,0.3)',
              blur: 5,
              offsetX: 2,
              offsetY: 2
            })
          });
          break;
        case 'stroke':
          text.set({
            stroke: '#000000',
            strokeWidth: 1
          });
          break;
        case 'gradient':
          if (text.width) {
            const gradient = new fabric.Gradient({
              type: 'linear',
              coords: {
                x1: 0,
                y1: 0,
                x2: text.width,
                y2: 0
              },
              colorStops: [
                { offset: 0, color: '#ff0000' },
                { offset: 0.5, color: '#00ff00' },
                { offset: 1, color: '#0000ff' }
              ]
            });
            text.set({ fill: gradient });
          }
          break;
      }
      canvas.renderAll();

      toast({
        title: '应用效果成功',
        description: `已应用${effect}效果`,
        duration: 1500
      });
    } catch (error) {
      console.error('应用文字效果失败:', error);
      toast({
        title: '应用效果失败',
        description: '处理文字对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  const handleFontChange = (fontFamily: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.IText)) {
      toast({
        title: '请先选择文字',
        description: '该操作只能应用于文字对象',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    try {
      activeObject.set({ fontFamily });
      canvas.renderAll();

      toast({
        title: '更改字体成功',
        description: `已更改为 ${fontFamily}`,
        duration: 1500
      });
    } catch (error) {
      console.error('更改字体失败:', error);
      toast({
        title: '更改字体失败',
        description: '处理文字对象时发生错误',
        variant: 'destructive',
        duration: 2000
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleAddText}
        >
          添加文字
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">文字效果</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleTextEffect('shadow')}
          >
            阴影
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleTextEffect('stroke')}
          >
            描边
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={() => handleTextEffect('gradient')}
          >
            渐变
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">字体</h3>
        <select
          className="w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
          onChange={(e) => handleFontChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
    </div>
  );
} 