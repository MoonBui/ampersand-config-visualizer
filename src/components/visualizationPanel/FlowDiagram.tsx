import React from 'react';
import NodeDiagram from './nodeDiagram/NodeDiagram';
import { FlowDiagramProps, OperationSectionProps, ObjectDetailsProps, FieldGroupsProps, Integration } from '../../types';

const FieldGroups: React.FC<FieldGroupsProps> = ({ object, type }) => {
  const fieldGroups = type === 'read' 
    ? [
        { fields: object.requiredFields || [], label: 'Required', bgColor: 'bg-blue-200', textColor: 'text-blue-800' },
        { fields: object.optionalFields || [], label: 'Optional', bgColor: 'bg-blue-100', textColor: 'text-blue-700' }
      ]
    : [
        { fields: object.fields || [], label: 'Fields', bgColor: 'bg-green-200', textColor: 'text-green-800' }
      ];

  return (
    <>
      {fieldGroups.map((group, idx) => (
        group.fields.length > 0 && (
          <div key={idx} className="mt-1">
            <div className="text-xs text-gray-600">{group.label}:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {group.fields.map((field: any, fidx: number) => (
                <span key={fidx} className={`${group.bgColor} ${group.textColor} px-2 py-1 rounded text-xs`}>
                  {field.fieldName || 'Unnamed Field'}
                </span>
              ))}
            </div>
          </div>
        )
      ))}
    </>
  );
};

const ObjectDetails: React.FC<ObjectDetailsProps> = ({ object, type }) => {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-sm font-medium">{object.objectName}</div>
        {object.schedule && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {object.schedule}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-600">
        {type === 'read' ? '→' : '←'} {object.destination || object.source || (type === 'read' ? 'webhook' : 'API')}
      </div>
      
      <FieldGroups object={object} type={type} />
    </div>
  );
};

const OperationSection: React.FC<OperationSectionProps> = ({ title, objects, type, bgColor, titleColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h4 className={`font-semibold ${titleColor} mb-2 flex items-center gap-2`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        {title}
      </h4>
      {objects.map((obj, idx) => (
        <ObjectDetails key={idx} object={obj} type={type} />
      ))}
    </div>
  );
};

const DataFlowDetails: React.FC<{ integration: Integration }> = ({ integration }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {integration.read?.objects?.length > 0 && (
        <OperationSection
          title="Read Operations"
          objects={integration.read.objects}
          type="read"
          bgColor="bg-blue-50"
          titleColor="text-blue-800"
        />
      )}
      
      {integration.write?.objects?.length > 0 && (
        <OperationSection
          title="Write Operations"
          objects={integration.write.objects}
          type="write"
          bgColor="bg-green-50"
          titleColor="text-green-800"
        />
      )}
    </div>
  );
};

const FlowDiagram: React.FC<FlowDiagramProps> = ({ integration }) => {
  if (!integration) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        {integration.displayName} Flow
      </h3>
      
      <NodeDiagram integration={integration} />
      <DataFlowDetails integration={integration} />
    </div>
  );
};

export default FlowDiagram; 