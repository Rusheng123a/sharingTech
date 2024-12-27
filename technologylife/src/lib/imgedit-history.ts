import * as fabric from 'fabric'

export class HistoryManager {
    private undoStack: string[] = [];
    private redoStack: string[] = [];
    private canvas: fabric.Canvas | null = null;
  
    setCanvas(canvas: fabric.Canvas) {
      this.canvas = canvas;
      this.saveState();
  
      canvas.on('object:modified', () => this.saveState());
      canvas.on('object:added', () => this.saveState());
      canvas.on('object:removed', () => this.saveState());
    }
  
    private saveState() {
      if (!this.canvas) return;
      
      const state = JSON.stringify(this.canvas.toJSON());
      this.undoStack.push(state);
      this.redoStack = [];
    }
  
    undo() {
      if (!this.canvas || this.undoStack.length <= 1) return;
      
      const currentState = this.undoStack.pop();
      if (currentState) {
        this.redoStack.push(currentState);
        const previousState = this.undoStack[this.undoStack.length - 1];
        this.loadState(previousState);
      }
    }
  
    redo() {
      if (!this.canvas || this.redoStack.length === 0) return;
      
      const nextState = this.redoStack.pop();
      if (nextState) {
        this.undoStack.push(nextState);
        this.loadState(nextState);
      }
    }
  
    private loadState(state: string) {
      if (!this.canvas) return;
      
      this.canvas.loadFromJSON(JSON.parse(state), () => {
        this.canvas?.renderAll();
      });
    }
  }