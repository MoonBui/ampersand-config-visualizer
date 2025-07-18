import React from 'react';

interface Integration {
  name: string;
  displayName: string;
  provider: string;
  read: { objects: any[] };
  write: { objects: any[] };
}

interface IntegrationTabsProps {
  integrations: Integration[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const IntegrationTabs: React.FC<IntegrationTabsProps> = ({ integrations, selectedIndex, onSelect }) => {
  if (integrations.length <= 1) return null;

  return (
    <div className="flex gap-2 mb-4">
      {integrations.map((integration, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`px-4 py-2 rounded transition-colors ${
            selectedIndex === idx
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {integration.displayName}
        </button>
      ))}
    </div>
  );
};

export default IntegrationTabs; 