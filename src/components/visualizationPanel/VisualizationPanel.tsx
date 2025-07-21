import React from 'react';
import IntegrationTabs from './IntegrationTabs';
import IntegrationStats from './IntegrationStats';
import FieldMappingView from './FieldMappingView';
import FlowDiagram from './FlowDiagram';
import { VisualizationPanelProps } from '../../types';

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ 
  parsedConfig, 
  selectedIntegration, 
  setSelectedIntegration, 
  showFieldMapping, 
  setShowFieldMapping 
}) => {
  if (!parsedConfig || parsedConfig.integrations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Integration Visualization</h2>
        <button
          onClick={() => setShowFieldMapping(!showFieldMapping)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {showFieldMapping ? 'Hide' : 'Show'} Field Mapping
        </button>
      </div>

      <IntegrationTabs
        integrations={parsedConfig.integrations}
        selectedIndex={selectedIntegration}
        onSelect={setSelectedIntegration}
      />

      <IntegrationStats integration={parsedConfig.integrations[selectedIntegration]} />
      <FlowDiagram integration={parsedConfig.integrations[selectedIntegration]} />
      <FieldMappingView
        integration={parsedConfig.integrations[selectedIntegration]}
        showFieldMapping={showFieldMapping}
      />
    </div>
  );
};

export default VisualizationPanel; 