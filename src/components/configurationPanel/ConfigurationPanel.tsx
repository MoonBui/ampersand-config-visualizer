import React from 'react';
import { YAMLEditor, ParseStatus } from './YamlComponent';
import { ConfigurationPanelProps } from '../../types';

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ yamlConfig, setYamlConfig, parsedConfig }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlConfig);
  };

  const downloadConfig = () => {
    const blob = new Blob([yamlConfig], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'integration-config.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YAMLEditor
          value={yamlConfig}
          onChange={setYamlConfig}
          onCopy={copyToClipboard}
          onDownload={downloadConfig}
        />
        
        <ParseStatus
          parsedConfig={parsedConfig}
          isValid={parsedConfig !== null}
        />
      </div>
    </div>
  );
};

export default ConfigurationPanel; 