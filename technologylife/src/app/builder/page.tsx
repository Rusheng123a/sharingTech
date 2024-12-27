'use client'

import { useState } from 'react';

const componentsList = [
  { id: 1, name: 'Button', code: '<button>Button</button>', properties: { text: 'Button', color: 'blue' } },
  { id: 2, name: 'Input', code: '<input type="text" />', properties: { placeholder: 'Enter text', size: 'medium' } },
  { id: 3, name: 'Card', code: '<div className="card">Card</div>', properties: { title: 'Card Title', content: 'Card Content' } },
];

export default function PageBuilder() {
  const [previewComponents, setPreviewComponents] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [aiInput, setAiInput] = useState('');

  const handleDragStart = (event: React.DragEvent, componentCode: string) => {
    event.dataTransfer.setData('componentCode', componentCode);
  };

  const handleDrop = (event: React.DragEvent) => {
    const componentCode = event.dataTransfer.getData('componentCode');
    setPreviewComponents((prev) => [...prev, componentCode]);
  };

  const handleExport = () => {
    const pageCode = previewComponents.join('\n');
    console.log('Exported Page Code:', pageCode);
    // Here you can implement the logic to download the code as a file
  };

  const handleComponentClick = (component: any) => {
    setSelectedComponent(component);
  };

  const handleAiSubmit = () => {
    // Simulate AI generating code
    const generatedCode = `<div>${aiInput}</div>`;
    setPreviewComponents((prev) => [...prev, generatedCode]);
    setAiInput('');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4  p-4">
        <h2 className="text-xl font-bold mb-4">Components</h2>
        <ul>
          {componentsList.map((component) => (
            <li
              key={component.id}
              draggable
              onDragStart={(event) => handleDragStart(event, component.code)}
              onClick={() => handleComponentClick(component)}
              className="cursor-pointer"
            >
              {component.name}
            </li>
          ))}
        </ul>
      </aside>
      <main
        className="flex-1 p-4 border"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="h-full">
          {previewComponents.map((component, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: component }} />
          ))}
        </div>
      </main>
      <aside className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4">Properties & AI Chat</h2>
        <div>
          <h3 className="font-bold">Properties Panel</h3>
          {selectedComponent ? (
            <div>
              <h4>{selectedComponent.name} Properties</h4>
              {Object.entries(selectedComponent.properties).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => {
                      const newProperties = { ...selectedComponent.properties, [key]: e.target.value };
                      setSelectedComponent({ ...selectedComponent, properties: newProperties });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Select a component to view its properties.</p>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-bold">AI Chat Box</h3>
          <textarea
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full h-24 p-2 border rounded"
          />
          <button onClick={handleAiSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Generate Code
          </button>
        </div>
        <button onClick={handleExport} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Export Page
        </button>
      </aside>
    </div>
  );
} 