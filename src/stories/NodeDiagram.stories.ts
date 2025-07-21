import type { Meta, StoryObj } from '@storybook/react-webpack5';
import NodeDiagram from '../components/visualizationPanel/nodeDiagram/NodeDiagram';

const meta = {
  title: 'Example/NodeDiagram',
  component: NodeDiagram,
  parameters: {
    // Set a specific height for the flow diagram to display properly
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A ReactFlow-based node diagram component that displays connected nodes with a background and controls.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
} satisfies Meta<typeof NodeDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

// Since NodeDiagram doesn't accept props, we just export a default story
export const Default: Story = {
  args: {
    integration: null,
  },
  parameters: {
    // Ensure the component has enough height to display properly
    docs: {
      description: {
        story: 'Default NodeDiagram showing two connected nodes with ReactFlow controls and background.',
      },
    },
  },
};