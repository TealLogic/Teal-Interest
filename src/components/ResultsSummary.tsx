import React from 'react';
import { CalculationResult } from '../types/calculator';
import { formatResultValue } from '../utils/formatters';

interface ResultsSummaryProps {
  results: CalculationResult[];
  darkMode: boolean;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results, darkMode }) => {
  const finalResult = results[results.length - 1];

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${
        darkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>Final Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-indigo-300' : 'text-indigo-700'
          }`}>Total Balance</p>
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-indigo-200' : 'text-indigo-900'
          }`}
            dangerouslySetInnerHTML={{
              __html: formatResultValue(finalResult.balance)
            }}
          />
        </div>
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-green-900/30' : 'bg-green-50'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-green-300' : 'text-green-700'
          }`}>Total Contributions</p>
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-green-200' : 'text-green-900'
          }`}
            dangerouslySetInnerHTML={{
              __html: formatResultValue(finalResult.totalContributions)
            }}
          />
        </div>
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-orange-300' : 'text-orange-700'
          }`}>Total Earnings</p>
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-orange-200' : 'text-orange-900'
          }`}
            dangerouslySetInnerHTML={{
              __html: formatResultValue(finalResult.earnings)
            }}
          />
        </div>
      </div>
    </div>
  );
};