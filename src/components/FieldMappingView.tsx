import React from 'react';

interface Integration {
  name: string;
  displayName: string;
  provider: string;
  read: { objects: any[] };
  write: { objects: any[] };
}

interface FieldMappingViewProps {
  integration: Integration | null;
  showFieldMapping: boolean;
}

interface FieldMappingSectionProps {
  title: string;
  objects: any[];
  type: 'source' | 'destination';
}

interface FieldMappingObjectProps {
  object: any;
  type: 'source' | 'destination';
}

const FieldMappingObject: React.FC<FieldMappingObjectProps> = ({ object, type }) => {
  const fields = type === 'source' 
    ? [...(object.requiredFields || []), ...(object.optionalFields || [])]
    : (object.fields || []);
  
  const dotColor = type === 'source' ? 'bg-blue-400' : 'bg-green-400';

  return (
    <div className="bg-white p-3 rounded border">
      <div className="font-medium text-sm mb-2">{object.objectName || 'Unnamed Object'}</div>
      {fields.map((field: any, fidx: number) => (
        <div key={fidx} className="flex items-center gap-2 py-1">
          <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
          <span className="text-sm">{field.fieldName || 'Unnamed Field'}</span>
          {type === 'source' && (
            <span className="text-xs text-gray-500">
              ({(object.requiredFields || []).includes(field) ? 'required' : 'optional'})
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const FieldMappingSection: React.FC<FieldMappingSectionProps> = ({ title, objects, type }) => {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="space-y-2">
        {objects.map((obj, idx) => (
          <FieldMappingObject key={idx} object={obj} type={type} />
        ))}
      </div>
    </div>
  );
};

const FieldMappingView: React.FC<FieldMappingViewProps> = ({ integration, showFieldMapping }) => {
  if (!integration || !showFieldMapping) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 mt-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Field Mapping Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldMappingSection
          title={`Source Fields (${integration.provider || 'Unknown'})`}
          objects={integration.read?.objects || []}
          type="source"
        />
        
        <FieldMappingSection
          title="Destination Fields (Your App)"
          objects={integration.write?.objects || []}
          type="destination"
        />
      </div>
    </div>
  );
};

export default FieldMappingView; 