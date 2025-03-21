import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CalculatorInputs, ContributionFrequency, TimeUnit, GrowthPeriodUnit } from '../types/calculator';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: string | number | ContributionFrequency | TimeUnit | GrowthPeriodUnit) => void;
  darkMode: boolean;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, onInputChange, darkMode }) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className={`lg:col-span-2 rounded-xl shadow-lg p-8 space-y-5 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="space-y-5">
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Initial Deposit ($)</label>
          <input
            type="number"
            value={inputs.initialDeposit}
            onChange={(e) => onInputChange('initialDeposit', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Growth Period</label>
            <input
              type="number"
              value={inputs.growthPeriod}
              onChange={(e) => onInputChange('growthPeriod', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Unit</label>
            <select
              value={inputs.growthPeriodUnit}
              onChange={(e) => onInputChange('growthPeriodUnit', e.target.value as GrowthPeriodUnit)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Expected Annual Return (%)</label>
          <input
            type="number"
            value={inputs.returnRate}
            onChange={(e) => onInputChange('returnRate', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Contribution Amount ($)</label>
          <input
            type="number"
            value={inputs.contributionAmount}
            onChange={(e) => onInputChange('contributionAmount', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Contribution Frequency</label>
          <select
            value={inputs.contributionFrequency}
            onChange={(e) => onInputChange('contributionFrequency', e.target.value as ContributionFrequency)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="biannual">Bi-Annual</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 ${
            darkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-indigo-600 hover:text-indigo-700'
          }`}
        >
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Advanced Options
        </button>

        {showAdvanced && (
          <div className="mt-5 space-y-5 border-t pt-5 border-opacity-20">
            {inputs.contributionFrequency === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Contribution Every</label>
                  <input
                    type="number"
                    value={inputs.customContributionDays || ''}
                    onChange={(e) => onInputChange('customContributionDays', e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Unit</label>
                  <select
                    value={inputs.customContributionUnit || 'days'}
                    onChange={(e) => onInputChange('customContributionUnit', e.target.value as TimeUnit)}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Stop Contributions After</label>
                <input
                  type="number"
                  value={inputs.stopContributionAfter || ''}
                  onChange={(e) => onInputChange('stopContributionAfter', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Unit</label>
                <select
                  value={inputs.stopContributionUnit}
                  onChange={(e) => onInputChange('stopContributionUnit', e.target.value as TimeUnit)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};