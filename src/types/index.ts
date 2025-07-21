// Core application types
export interface Integration {
  name: string;
  displayName: string;
  provider: string;
  read: { objects: any[] };
  write: { objects: any[] };
}

export interface ParsedConfig {
  integrations: Integration[];
}

// Component prop types
export interface IntegrationStatsProps {
  integration: Integration | null;
}

export interface IntegrationTabsProps {
  integrations: Integration[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export interface FieldMappingViewProps {
  integration: Integration | null;
  showFieldMapping: boolean;
}

export interface FlowDiagramProps {
  integration: Integration | null;
}

export interface VisualizationPanelProps {
  parsedConfig: ParsedConfig | null;
  selectedIntegration: number;
  setSelectedIntegration: (index: number) => void;
  showFieldMapping: boolean;
  setShowFieldMapping: (show: boolean) => void;
}

export interface ConfigurationPanelProps {
  yamlConfig: string;
  setYamlConfig: (config: string) => void;
  parsedConfig: ParsedConfig | null;
}

// Field mapping types
export interface FieldMappingSectionProps {
  title: string;
  objects: any[];
  type: 'source' | 'destination';
}

export interface FieldMappingObjectProps {
  object: any;
  type: 'source' | 'destination';
}

// Flow diagram types
export interface OperationSectionProps {
  title: string;
  objects: any[];
  type: 'read' | 'write';
  bgColor: string;
  titleColor: string;
}

export interface ObjectDetailsProps {
  object: any;
  type: 'read' | 'write';
}

export interface FieldGroupsProps {
  object: any;
  type: 'read' | 'write';
}

// Stats types
export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
  titleColor: string;
}

// Storybook types
export interface HeaderProps {
  user?: {
    name: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
} 