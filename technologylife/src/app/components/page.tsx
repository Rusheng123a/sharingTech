'use client'
import { useState, useEffect } from 'react';

// Mock function to simulate fetching components from Shadcn UI and local storage
const fetchComponents = async () => {
  // Simulate fetching from Shadcn UI
  const shadcnComponents = [
    { id: 1, name: 'Button', description: 'A simple button component', code: '<button className="btn">Button</button>' },
    { id: 2, name: 'Card', description: 'A card component for displaying content', code: '<div className="card">Card Content</div>' },
    { id: 3, name: 'Modal', description: 'A modal dialog component', code: '<div className="modal">Modal Content</div>' },
  ];

  // Simulate fetching from local storage or API
  const localComponents = [
    { id: 4, name: 'CustomButton', description: 'A custom button component', code: '<button className="custom-btn">Custom Button</button>' },
  ];

  return [...shadcnComponents, ...localComponents];
};

export default function Components() {
  const [components, setComponents] = useState<any[]>([]);
  const [previewComponent, setPreviewComponent] = useState<string | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      const allComponents = await fetchComponents();
      setComponents(allComponents);
    };
    loadComponents();
  }, []);

  const handleLoadComponent = (componentCode: string) => {
    setPreviewComponent(componentCode);
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((component) => (
          <div key={component.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{component.name}</h2>
            <p className="text-sm text-gray-600">{component.description}</p>
            <button
              onClick={() => handleLoadComponent(component.code)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Load Component
            </button>
          </div>
        ))}
      </div>
      {previewComponent && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: previewComponent }} />
        </div>
      )}
    </div>
  );
} 