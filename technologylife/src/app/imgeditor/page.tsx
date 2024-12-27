'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import * as fabric from 'fabric';
import { Canvas } from '@/components/editor/Canvas';
import { ImageTools } from '@/components/editor/ImageTools';
import { TextTools } from '@/components/editor/TextTools';
import { LayerManager } from '@/components/editor/LayerManager';
import { AutoSave } from '@/components/editor/AutoSave';
import { Toolbar } from '@/components/editor/Toolbar';
import { useToast } from '@/components/ui/use-toast';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Layer {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

interface CustomFabricObject extends fabric.Object {
  data?: {
    id: string;
    name: string;
  };
  locked?: boolean;
}

export default function ImageEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<CustomFabricObject | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false);
  const { toast } = useToast();

  // 使用 ref 来存储事件处理函数，避免重复创建
  const handlersRef = useRef({
    handleSelectionChange: null as ((fabricCanvas: fabric.Canvas) => void) | null,
    handleObjectModification: null as ((fabricCanvas: fabric.Canvas) => void) | null
  });

  // 初始化事件处理函数
  useEffect(() => {
    handlersRef.current.handleSelectionChange = (fabricCanvas: fabric.Canvas) => {
      const selected = fabricCanvas.getActiveObject() as CustomFabricObject;
      setSelectedObject(selected || null);
    };

    handlersRef.current.handleObjectModification = (fabricCanvas: fabric.Canvas) => {
      const objects = fabricCanvas.getObjects() as CustomFabricObject[];
      const layersList = objects.map((obj, index) => ({
        id: obj.data?.id || `layer-${index}`,
        type: obj.type || 'unknown',
        name: obj.data?.name || `图层 ${index + 1}`,
        visible: obj.visible !== false,
        locked: obj.locked || false
      }));
      setLayers(layersList);
    };
  }, []);

  // 处理画布就绪
  const handleCanvasReady = useCallback((fabricCanvas: fabric.Canvas) => {
    if (canvas) return; // 避免重复初始化
    setCanvas(fabricCanvas);

    // 从本地存储恢复画布状态
    const savedState = localStorage.getItem('canvasState');
    if (savedState) {
      try {
        fabricCanvas.loadFromJSON(savedState, () => {
          fabricCanvas.renderAll();
          toast({
            title: '恢复成功',
            description: '已恢复上次保存的画布状态',
            duration: 2000
          });
        });
      } catch (error) {
        console.error('恢复画布状态失败:', error);
        toast({
          title: '恢复失败',
          description: '恢复画布状态时发生错误',
          variant: 'destructive',
          duration: 2000
        });
      }
    }

    const handleSelectionChange = () => {
      if (!handlersRef.current.handleSelectionChange) return;
      requestAnimationFrame(() => {
        handlersRef.current.handleSelectionChange?.(fabricCanvas);
      });
    };

    const handleObjectModification = () => {
      if (!handlersRef.current.handleObjectModification) return;
      requestAnimationFrame(() => {
        handlersRef.current.handleObjectModification?.(fabricCanvas);
      });
    };

    // 绑定事件监听
    fabricCanvas.on('selection:created', handleSelectionChange);
    fabricCanvas.on('selection:updated', handleSelectionChange);
    fabricCanvas.on('selection:cleared', handleSelectionChange);
    fabricCanvas.on('object:added', handleObjectModification);
    fabricCanvas.on('object:removed', handleObjectModification);
    fabricCanvas.on('object:modified', handleObjectModification);

    // 初始化图层列表
    handleObjectModification();

    // 清理函数
    return () => {
      fabricCanvas.off('selection:created', handleSelectionChange);
      fabricCanvas.off('selection:updated', handleSelectionChange);
      fabricCanvas.off('selection:cleared', handleSelectionChange);
      fabricCanvas.off('object:added', handleObjectModification);
      fabricCanvas.off('object:removed', handleObjectModification);
      fabricCanvas.off('object:modified', handleObjectModification);
    };
  }, [canvas, toast]);

  // 处理图片上传
  const handleImageUpload = useCallback((file: File) => {
    if (!canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        requestAnimationFrame(() => {
          const fabricImg = new fabric.Image(img);
          // 调整图片大小以适应画布
          const canvasWidth = canvas.width || 800;
          const canvasHeight = canvas.height || 600;
          const scale = Math.min(
            (canvasWidth * 0.8) / fabricImg.width!,
            (canvasHeight * 0.8) / fabricImg.height!
          );
          
          fabricImg.scale(scale);
          fabricImg.set({
            left: (canvasWidth - fabricImg.width! * scale) / 2,
            top: (canvasHeight - fabricImg.height! * scale) / 2,
            data: {
              id: `image-${Date.now()}`,
              name: file.name
            }
          });
          
          canvas.add(fabricImg);
          canvas.setActiveObject(fabricImg);
          canvas.renderAll();

          toast({
            title: '上传成功',
            description: '图片已添加到画布',
            duration: 1500
          });
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [canvas, toast]);

  // 处理画布拖拽
  const handleCanvasDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!canvas) return;

    // 处理文件拖拽
    if (e.dataTransfer?.files?.length) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        toast({
          title: '不支持的文件类型',
          description: '只能上传图片文件',
          variant: 'destructive',
          duration: 2000
        });
      }
      return;
    }
  }, [canvas, handleImageUpload, toast]);

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* 顶部导航 */}
      <div className="border-b bg-background px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/builder" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              首页
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/builder" className="hover:text-foreground">
              布局模式
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">图片编辑器</span>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧工具栏 */}
        <div className="w-64 border-r bg-background">
          <div className="h-1/2 overflow-y-auto border-b">
            <ImageTools canvas={canvas} />
          </div>
          <div className="h-1/2 overflow-y-auto">
            <TextTools canvas={canvas} />
          </div>
        </div>

        {/* 中间画布区域 */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="text-xl font-bold">图片编辑器</h1>
            <AutoSave
              enabled={isAutoSaveEnabled}
              onToggle={setIsAutoSaveEnabled}
              canvas={canvas}
            />
          </div>
          <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
            <Canvas
              width={800}
              height={600}
              onCanvasReady={handleCanvasReady}
              onDrop={handleCanvasDrop}
            />
          </div>
        </div>

        {/* 右侧图层管理 */}
        <div className="w-64 border-l bg-background">
          <LayerManager
            layers={layers}
            selectedLayer={selectedObject?.data?.id}
            onLayerSelect={useCallback((id: string) => {
              if (!canvas) return;
              const objects = canvas.getObjects() as CustomFabricObject[];
              const targetObject = objects.find(obj => obj.data?.id === id);
              if (targetObject) {
                canvas.discardActiveObject();
                canvas.setActiveObject(targetObject);
                canvas.requestRenderAll();
              }
            }, [canvas])}
            onLayerVisibilityToggle={useCallback((id: string) => {
              if (!canvas) return;
              const objects = canvas.getObjects() as CustomFabricObject[];
              const targetObject = objects.find(obj => obj.data?.id === id);
              if (targetObject) {
                targetObject.visible = !targetObject.visible;
                canvas.requestRenderAll();
              }
            }, [canvas])}
            onLayerLockToggle={useCallback((id: string) => {
              if (!canvas) return;
              const objects = canvas.getObjects() as CustomFabricObject[];
              const targetObject = objects.find(obj => obj.data?.id === id);
              if (targetObject) {
                targetObject.locked = !targetObject.locked;
                targetObject.selectable = !targetObject.locked;
                if (targetObject.locked && canvas.getActiveObject() === targetObject) {
                  canvas.discardActiveObject();
                }
                canvas.requestRenderAll();
              }
            }, [canvas])}
            onLayerDelete={useCallback((id: string) => {
              if (!canvas) return;
              const objects = canvas.getObjects() as CustomFabricObject[];
              const targetObject = objects.find(obj => obj.data?.id === id);
              if (targetObject) {
                canvas.remove(targetObject);
                canvas.requestRenderAll();
              }
            }, [canvas])}
            onLayerMove={useCallback((id: string, direction: 'up' | 'down') => {
              if (!canvas) return;
              const objects = canvas.getObjects() as CustomFabricObject[];
              const currentIndex = objects.findIndex(obj => obj.data?.id === id);
              if (currentIndex === -1) return;

              const newIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
              if (newIndex < 0 || newIndex >= objects.length) return;

              if (direction === 'up') {
                canvas.bringObjectForward(objects[currentIndex]);
              } else {
                canvas.sendObjectBackwards(objects[currentIndex]);
              }

              canvas.requestRenderAll();
            }, [canvas])}
          />
        </div>
      </div>
    </div>
  );
}