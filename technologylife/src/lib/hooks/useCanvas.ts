"use client"

import { useState, useCallback } from 'react';
import * as fabric from 'fabric';

export function useCanvas() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  const handleCanvasReady = useCallback((fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
    fabricCanvas.on('selection:created', (e) => setSelectedObject(e.selected[0]));
    fabricCanvas.on('selection:cleared', () => setSelectedObject(null));
  }, []);

  return {
    canvas,
    selectedObject,
    handleCanvasReady
  };
}