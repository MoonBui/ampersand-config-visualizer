import React from 'react';
import { integrationUtils } from './YamlComponent';

interface Integration {
  name: string;
  displayName: string;
  provider: string;
  read: { objects: any[] };
  write: { objects: any[] };
}

interface IntegrationStatsProps {
  integration: Integration | null;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
  titleColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor, textColor, titleColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className={`text-sm font-medium ${titleColor}`}>{title}</span>
      </div>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    </div>
  );
};

const IntegrationStats: React.FC<IntegrationStatsProps> = ({ integration }) => {
  if (!integration) return null;

  const stats = integrationUtils.getStats(integration);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        icon={
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        }
        title="Read Objects"
        value={stats.readObjects}
        bgColor="bg-blue-50"
        textColor="text-blue-600"
        titleColor="text-blue-800"
      />
      <StatCard
        icon={
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        }
        title="Write Objects"
        value={stats.writeObjects}
        bgColor="bg-green-50"
        textColor="text-green-600"
        titleColor="text-green-800"
      />
      <StatCard
        icon={
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        title="Total Fields"
        value={stats.totalFields}
        bgColor="bg-purple-50"
        textColor="text-purple-600"
        titleColor="text-purple-800"
      />
    </div>
  );
};

export default IntegrationStats; 