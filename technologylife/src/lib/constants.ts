export const ASPECT_RATIOS = [
    { id: '1:1', width: 1080, height: 1080, label: '1:1 Square' },
    { id: '4:3', width: 1440, height: 1080, label: '4:3 Landscape' },
    { id: '3:4', width: 1080, height: 1440, label: '3:4 Portrait' },
    { id: '16:9', width: 1920, height: 1080, label: '16:9 Landscape' },
    { id: '9:16', width: 1080, height: 1920, label: '9:16 Portrait' },
  ] as const;
  
  export const EXPORT_FORMATS = [
    { id: 'png', label: 'PNG', mimeType: 'image/png' },
    { id: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
    { id: 'webp', label: 'WebP', mimeType: 'image/webp' },
  ] as const;
  
  export const TEMPLATES = [
    {
      id: 'quote',
      name: 'Quote Template',
      background: '#F8F9FA',
      overlay: 'rgba(0, 0, 0, 0.4)',
      fontSize: 36,
      fontFamily: 'Arial',
      textColor: '#FFFFFF',
    },
    {
      id: 'title',
      name: 'Title Template',
      background: '#212529',
      overlay: 'rgba(0, 0, 0, 0.6)',
      fontSize: 48,
      fontFamily: 'Times New Roman',
      textColor: '#FFFFFF',
    },
  ] as const;