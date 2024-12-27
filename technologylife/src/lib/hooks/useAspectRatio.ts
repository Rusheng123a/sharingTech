"use client"

import { useState, useCallback } from 'react';
import * as fabric from 'fabric';
import { ASPECT_RATIOS } from '../constants';
import { setCanvasSize } from '../canvas-utils';

export function useAspectRatio(canvas: fabric.Canvas | null) {
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0].id);

  const handleAspectRatioChange = useCallback((ratio: keyof typeof ASPECT_RATIOS) => {
    if (canvas) {
      setAspectRatio(ratio);
      setCanvasSize(canvas, ratio);
    }
  }, [canvas]);

  return {
    aspectRatio,
    handleAspectRatioChange
  };
}