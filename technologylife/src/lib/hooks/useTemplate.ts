import { useCallback } from 'react';
import * as fabric from 'fabric';
import { applyTemplate } from '../canvas-utils';

export function useTemplate(canvas: fabric.Canvas | null) {
  const handleTemplateChange = useCallback((templateId: string) => {
    if (canvas) {
      applyTemplate(canvas, templateId);
    }
  }, [canvas]);

  return { handleTemplateChange };
}