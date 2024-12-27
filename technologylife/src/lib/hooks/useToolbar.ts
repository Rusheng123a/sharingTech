import { useCallback } from 'react';
import * as  fabric from 'fabric';
import { addText, addShape } from '../canvas-utils';

export function useToolbar(canvas: fabric.Canvas | null) {
  const handleAddText = useCallback(() => {
    if (canvas) {
      addText(canvas);
    }
  }, [canvas]);

  const handleAddShape = useCallback((shape: 'rectangle' | 'circle') => {
    if (canvas) {
      addShape(canvas, shape);
    }
  }, [canvas]);

  return {
    handleAddText,
    handleAddShape,
  };
}