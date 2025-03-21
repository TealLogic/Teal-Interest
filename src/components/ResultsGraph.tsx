import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types/calculator';
import { formatAxisValue, formatTooltipValue } from '../utils/formatters';

interface ResultsGraphProps {
  results: CalculationResult[];
  darkMode: boolean;
}

export const ResultsGraph: React.FC<ResultsGraphProps> = ({ results, darkMode }) => {
  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={results} 
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={darkMode ? '#374151' : '#e5e7eb'}
          />
          <XAxis 
            dataKey="year" 
            stroke={darkMode ? '#9CA3AF' : '#4B5563'}
            tickFormatter={(value) => value}
          />
          <YAxis 
            stroke={darkMode ? '#9CA3AF' : '#4B5563'}
            tickFormatter={formatAxisValue}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
              border: 'none',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            formatter={(value: number) => [formatTooltipValue(value), '']}
            labelFormatter={(value) => `Year ${value}`}
            labelStyle={{ color: darkMode ? '#E5E7EB' : '#111827' }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '30px'
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            name="Total Balance"
            stroke="#4f46e5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="totalContributions"
            name="Total Contributions"
            stroke="#059669"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            name="Total Earnings"
            stroke="#ea580c"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};