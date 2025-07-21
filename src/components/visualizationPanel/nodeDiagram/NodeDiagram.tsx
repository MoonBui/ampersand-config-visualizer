import React from 'react';
import { ReactFlow, Controls, Background, Node, Edge, NodeTypes, EdgeTypes, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './NodeDiagram.css';
import { Integration } from '../../../types';

interface NodeDiagramProps {
  integration: Integration | null;
}

// Custom Node Component
const CustomNode: React.FC<{ data: any }> = ({ data }) => {
  // Get custom styling from data or use defaults
  const backgroundColor = data.backgroundColor || 'bg-white';
  const borderColor = data.borderColor || 'border-gray-200';
  const textColor = data.textColor || 'text-gray-700';
  
  return (
    <div className="custom-node-wrapper">
      <div 
        className={`custom-node ${backgroundColor} ${borderColor}`}
      >
        {/* Left handle (input) - only show if hasLeftHandle is true */}
        {data.hasLeftHandle && (
          <Handle type="target" position={Position.Left} className="custom-node__handle" />
        )}
        
        <div className="custom-node__content">
          {
            data.iconColor && (
            <svg className={`w-6 h-6 ${data.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            )
          }
          <div className={`custom-node__label ${textColor}`}>{data.label.charAt(0).toUpperCase() + data.label.slice(1)}</div>
        </div>
        
        {/* Right handle (output) - only show if hasRightHandle is true */}
        {data.hasRightHandle && (
          <Handle type="source" position={Position.Right} className="custom-node__handle" />
        )}
      </div>
      
      {/* Subtitle text underneath the node */}
      {data.subtitle && (
        <div className="custom-node__subtitle">{data.subtitle}</div>
      )}
    </div>
  );
};

// Custom Edge Component with Animation
const CustomEdge: React.FC<{ id: string; sourceX: number; sourceY: number; targetX: number; targetY: number }> = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      {/* Animated flowing line */}
      <path
        id={`${id}-animated`}
        style={{
          stroke: '#6122e7',
          strokeWidth: 2,
          strokeDasharray: '10,10',
          strokeDashoffset: 0,
          animation: 'flowAnimation 2s linear infinite',
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />
      
      {/* Moving dots along the path */}
      <defs>
        <pattern id={`dots-${id}`} patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="2" fill="#6122e7">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </pattern>
      </defs>
      
      <path
        id={`${id}-dots`}
        style={{
          stroke: `url(#dots-${id})`,
          strokeWidth: 4,
          strokeDasharray: '1,19',
          strokeDashoffset: 0,
          animation: 'flowAnimation 2s linear infinite',
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />
    </>
  );
};

// Helper function for bezier path calculation
const getBezierPath = ({ sourceX, sourceY, targetX, targetY }: { sourceX: number; sourceY: number; targetX: number; targetY: number }): string => {
  const centerX = (sourceX + targetX) / 2;
  return `M ${sourceX} ${sourceY} Q ${centerX} ${sourceY} ${targetX} ${targetY}`;
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const NodeDiagram: React.FC<NodeDiagramProps> = ({ integration }) => {
  if (!integration) return null;

  // Generate nodes dynamically based on integration data
  const generateNodes = (): Node[] => {
    const nodes: Node[] = [];
    let xPosition = 0;
    const yPosition = 150;
    const xSpacing = 200;

    // Source node (provider)
    nodes.push({
      id: 'source',
      type: 'custom',
      data: { 
        label: integration.provider, 
        textColor: 'text-blue-700',
        hasLeftHandle: false,
        hasRightHandle: true,
        backgroundColor: 'bg-blue-100',  
        borderColor: 'border-blue-300',
        iconColor: 'text-blue-600',
        subtitle: 'Source System'
      },
      position: { x: xPosition, y: yPosition },
    });
    xPosition += xSpacing;

    // Ampersand node (middle)
    nodes.push({
      id: 'ampersand',
      type: 'custom',
      data: { 
        label: 'Ampersand', 
        textColor: 'text-white',
        hasLeftHandle: true,
        hasRightHandle: true,
        backgroundColor: 'bg-[#6122e7]', 
        borderColor: 'border-[#6122e7]',      
        subtitle: 'Integration Layer'
      },
      position: { x: xPosition, y: yPosition },
    });
    xPosition += xSpacing;

    // Destination node (your app)
    nodes.push({
      id: 'destination',
      type: 'custom',
      data: { 
        label: 'Your app', 
        textColor: 'text-green-700',
        hasLeftHandle: true,
        hasRightHandle: false,
        backgroundColor: 'bg-green-100',
        borderColor: 'border-green-500',
        iconColor: 'text-green-600',
        subtitle: 'Destination'
      },
      position: { x: xPosition, y: yPosition },
    });

    return nodes;
  };

  // Generate edges
  const generateEdges = (): Edge[] => {
    return [
      { 
        id: 'source-ampersand', 
        source: 'source', 
        target: 'ampersand', 
        type: 'custom'
      },
      { 
        id: 'ampersand-destination', 
        source: 'ampersand', 
        target: 'destination', 
        type: 'custom'
      }
    ];
  };

  const nodes = generateNodes();
  const edges = generateEdges();

  return (
    <div className="node-diagram-container">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="react-flow-container"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={true}
      >
        <Background 
          color="#e5e7eb" 
          gap={20} 
          size={1}
          className="react-flow__background"
        />
        <Controls className="react-flow__controls" />
      </ReactFlow>
    </div>
  );
}

export default NodeDiagram;
