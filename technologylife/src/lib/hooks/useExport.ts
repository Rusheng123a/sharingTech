import { useCallback } from 'react';
import * as fabric from 'fabric';
import { exportCanvas } from '../canvas-utils';

export function useExport(canvas: fabric.Canvas | null) {
  const handleExport = useCallback((format: string) => {
    if (canvas) {
      const dataUrl = exportCanvas(canvas, format);
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `image.${format}`;
        link.href = dataUrl;
        link.click();
      }
    }
  }, [canvas]);

  return { handleExport };
}