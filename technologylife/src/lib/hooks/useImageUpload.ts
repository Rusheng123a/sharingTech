import { useCallback } from 'react';
import { fabric } from 'fabric';
import { addImageToCanvas } from '../canvas-utils';

export function useImageUpload(canvas: fabric.Canvas | null) {
  const handleImageUpload = useCallback((file: File) => {
    if (canvas) {
      addImageToCanvas(canvas, file);
    }
  }, [canvas]);

  return { handleImageUpload };
}