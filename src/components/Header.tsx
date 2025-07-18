import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h1 className="text-2xl font-bold mb-2">Integration Configuration Visualizer</h1>
      <p className="text-gray-600 mb-4">
        Paste your Ampersand YAML configuration below to visualize your integration flow and field mappings.
      </p>
    </div>
  );
};

export default Header; 