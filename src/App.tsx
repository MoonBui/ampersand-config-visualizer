import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigurationPanel from './components/configurationPanel/ConfigurationPanel';
import VisualizationPanel from './components/visualizationPanel/VisualizationPanel';
import { yamlParser } from './components/configurationPanel/YamlComponent';
import { ParsedConfig } from './types';
import './App.css';

function App() {
  const [yamlConfig, setYamlConfig] = useState(`specVersion: 1.0.0
integrations:
  - name: salesforce
    displayName: My Salesforce Integration
    provider: salesforce
    read:
      objects:
        - objectName: contact
          destination: contactWebhook
          schedule: "*/10 * * * *"
          requiredFields:
            - fieldName: firstName
            - fieldName: lastName
            - fieldName: email
          optionalFields:
            - fieldName: phone
            - fieldName: company
    write:
      objects:
        - objectName: lead
          source: leadAPI
          fields:
            - fieldName: firstName
            - fieldName: lastName
            - fieldName: email
            - fieldName: company`);

  const [parsedConfig, setParsedConfig] = useState<ParsedConfig | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState(0);
  const [showFieldMapping, setShowFieldMapping] = useState(false);

  useEffect(() => {
    const parsed = yamlParser.parse(yamlConfig);
    setParsedConfig(parsed);
  }, [yamlConfig]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <ConfigurationPanel
          yamlConfig={yamlConfig}
          setYamlConfig={setYamlConfig}
          parsedConfig={parsedConfig}
        />

        <VisualizationPanel
          parsedConfig={parsedConfig}
          selectedIntegration={selectedIntegration}
          setSelectedIntegration={setSelectedIntegration}
          showFieldMapping={showFieldMapping}
          setShowFieldMapping={setShowFieldMapping}
        />
      </div>
    </div>
  );
}

export default App;
