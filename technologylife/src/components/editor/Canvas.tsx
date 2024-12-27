'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Canvas as FabricCanvas } from 'fabric';

interface CanvasProps {
  width?: number;
  height?: number;
  onCanvasReady?: (canvas: FabricCanvas) => void;
  onDrop?: (e: DragEvent) => void;
}

export function Canvas({ 
  width = 800, 
  height = 600, 
  onCanvasReady,
  onDrop
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 初始化 Canvas
  const initCanvas = useCallback(() => {
    if (canvasRef.current && !fabricRef.current) {
      const canvas = new FabricCanvas(canvasRef.current, {
        width,
        height,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        selection: true,
        defaultCursor: 'default',
        hoverCursor: 'move'
      });
      fabricRef.current = canvas;
      onCanvasReady?.(canvas);
    }
  }, [width, height, onCanvasReady]);

  // 更新画布大小
  const updateCanvasSize = useCallback(() => {
    if (!containerRef.current || !fabricRef.current) return;

    const container = containerRef.current;
    const canvas = fabricRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scale = Math.min(
      (containerWidth - 40) / width,
      (containerHeight - 40) / height
    );

    canvas.setZoom(scale);
    canvas.setDimensions({
      width: width * scale,
      height: height * scale
    });

    // 居中画布
    const left = (containerWidth - width * scale) / 2;
    const top = (containerHeight - height * scale) / 2;
    container.style.paddingLeft = `${left}px`;
    container.style.paddingTop = `${top}px`;
  }, [width, height]);

  // 处理拖拽事件
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.style.opacity = '0.7';
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }
    onDrop?.(e);
  }, [onDrop]);

  // 初始化和清理
  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('dragleave', handleDragLeave);
      container.addEventListener('drop', handleDrop);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (container) {
        container.removeEventListener('dragover', handleDragOver);
        container.removeEventListener('dragleave', handleDragLeave);
        container.removeEventListener('drop', handleDrop);
      }
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [initCanvas, updateCanvasSize, handleDragOver, handleDragLeave, handleDrop]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center bg-gray-50"
    >
      <canvas ref={canvasRef} />
      <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-gray-300 opacity-0 transition-opacity duration-200 hover:opacity-100" />
    </div>
  );
} 