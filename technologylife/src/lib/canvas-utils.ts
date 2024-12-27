import * as fabric  from 'fabric';

import { ASPECT_RATIOS, TEMPLATES, EXPORT_FORMATS } from './constants';

export function addImageToCanvas(canvas: fabric.Canvas, file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const url = e.target?.result as string;
    fabric.Image.fromURL(url, (img) => {
      // 缩放图片以适应画布并保持宽高比
      const canvasAspect = canvas.width! / canvas.height!;
      const imgAspect = img.width! / img.height!;
      
      if (imgAspect > canvasAspect) {
        img.scaleToWidth(canvas.width!);
      } else {
        img.scaleToHeight(canvas.height!);
      }
      
      // 居中图片
      img.set({
        left: (canvas.width! - img.getScaledWidth()) / 2,
        top: (canvas.height! - img.getScaledHeight()) / 2
      });
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };
  reader.readAsDataURL(file);
}

export function addText(canvas: fabric.Canvas) {
  const text = new fabric.IText('双击编辑文字', {
    left: canvas.width! / 2,
    top: canvas.height! / 2,
    fontSize: 40,
    fill: '#000000',
    fontFamily: 'Arial',
    originX: 'center',
    originY: 'center',
  });
  
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
}

export function addShape(canvas: fabric.Canvas, type: 'rectangle' | 'circle') {
  const shapeOptions = {
    left: canvas.width! / 2,
    top: canvas.height! / 2,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 2,
    width: 100,
    height: 100,
    originX: 'center',
    originY: 'center',
  };
  const shape = type === 'rectangle' 
    ? new fabric.Rect(shapeOptions)
    : new fabric.Circle({ ...shapeOptions, radius: 50 });

  canvas.add(shape);
  canvas.setActiveObject(shape);
  canvas.renderAll();
}


export function applyTemplate(canvas: fabric.Canvas, templateId: string) {
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) return;

  // Add overlay
  const overlay = new fabric.Rect({
    width: canvas.width,
    height: canvas.height,
    fill: template.overlay,
    selectable: false,
  });
  
  canvas.add(overlay);
  canvas.renderAll();
}

export function setCanvasSize(canvas: fabric.Canvas, aspectRatioId: string) {
  const ratio = ASPECT_RATIOS.find(r => r.id === aspectRatioId);
  if (!ratio) return;

  canvas.setWidth(ratio.width);
  canvas.setHeight(ratio.height);
  canvas.renderAll();
}

export function exportCanvas(canvas: fabric.Canvas, format: string) {
  const exportFormat = EXPORT_FORMATS.find(f => f.id === format);
  if (!exportFormat) return;
  return canvas.toDataURL({
      format: exportFormat.id as ImageFormat,
      quality: 1,
      multiplier: 0
  });
}