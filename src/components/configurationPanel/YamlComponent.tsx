import { parse } from 'yaml';
import { ParsedConfig } from '../../types';

// Utility functions
const yamlParser = {
  parse: (yamlText: string): ParsedConfig | null => {
    try {
      const parsed = parse(yamlText);
      return parsed as ParsedConfig;
    } catch (error) {
      console.error('Error parsing YAML:', error);
      return null;
    }
  }
};

const integrationUtils = {
  getStats: (integration: any) => {
    if (!integration) return { readObjects: 0, writeObjects: 0, totalFields: 0 };
    
    const readObjects = integration.read?.objects?.length || 0;
    const writeObjects = integration.write?.objects?.length || 0;
    
    const readFields = integration.read?.objects?.reduce((acc: number, obj: any) => {
      const requiredFields = obj.requiredFields?.length || 0;
      const optionalFields = obj.optionalFields?.length || 0;
      return acc + requiredFields + optionalFields;
    }, 0) || 0;
    
    const writeFields = integration.write?.objects?.reduce((acc: number, obj: any) => {
      return acc + (obj.fields?.length || 0);
    }, 0) || 0;
    
    const totalFields = readFields + writeFields;
    
    return { readObjects, writeObjects, totalFields };
  }
};

// Components
const YAMLEditor = ({ value, onChange, onCopy, onDownload }: {
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  onDownload: () => void;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">YAML Configuration</label>
        <div className="flex gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-96 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Paste your YAML configuration here..."
      />
    </div>
  );
};

const ParseStatus = ({ parsedConfig, isValid }: {
  parsedConfig: any;
  isValid: boolean;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium">Parse Status</span>
        {isValid ? (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <div className="bg-gray-50 p-3 rounded-lg h-96 overflow-y-auto">
        {isValid && parsedConfig ? (
          <ParsedConfigDisplay parsedConfig={parsedConfig} />
        ) : (
          <div className="text-sm text-red-600">
            ✗ Unable to parse configuration. Please check your YAML syntax.
          </div>
        )}
      </div>
    </div>
  );
};

const ParsedConfigDisplay = ({ parsedConfig }: { parsedConfig: any }) => {
  return (
    <div>
      <div className="text-sm text-green-600 mb-3">✓ Configuration parsed successfully</div>
      <div className="text-sm">
        <div className="mb-2">
          <strong>Integrations found:</strong> {parsedConfig.integrations?.length || 0}
        </div>
        {parsedConfig.integrations?.map((integration: any, idx: number) => (
          <IntegrationSummaryCard key={idx} integration={integration} />
        )) || []}
      </div>
    </div>
  );
};

const IntegrationSummaryCard = ({ integration }: { integration: any }) => {
  const stats = integrationUtils.getStats(integration);
  
  return (
    <div className="mb-2 p-2 bg-white rounded border">
      <div className="font-medium">{integration.displayName || integration.name || 'Unnamed Integration'}</div>
      <div className="text-xs text-gray-600">Provider: {integration.provider || 'N/A'}</div>
      <div className="text-xs text-gray-600">Read: {stats.readObjects} objects</div>
      <div className="text-xs text-gray-600">Write: {stats.writeObjects} objects</div>
    </div>
  );
};

export { yamlParser, integrationUtils, YAMLEditor, ParseStatus, ParsedConfigDisplay, IntegrationSummaryCard };
