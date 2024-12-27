import { useCallback, useEffect } from 'react';
import * as fabric from 'fabric';
import { HistoryManager } from '../imgedit-history';

export function useHistory(canvas: fabric.Canvas | null) {
  const historyManager = new HistoryManager();

  useEffect(() => {
    if (canvas) {
      historyManager.setCanvas(canvas);
    }
  }, [canvas]);

  const handleUndo = useCallback(() => {
    historyManager.undo();
  }, []);

  const handleRedo = useCallback(() => {
    historyManager.redo();
  }, []);

  return {
    handleUndo,
    handleRedo,
  };
}