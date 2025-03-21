import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';
import { CalculatorInputs, ContributionFrequency, TimeUnit, GrowthPeriodUnit } from './types/calculator';
import { calculateResults } from './utils/calculator';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsGraph } from './components/ResultsGraph';
import { ResultsSummary } from './components/ResultsSummary';
import { AnimatedTitle } from './components/AnimatedTitle';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialDeposit: 10000,
    growthPeriod: 10,
    growthPeriodUnit: 'years',
    returnRate: 7,
    contributionAmount: 500,
    contributionFrequency: 'monthly',
    customContributionDays: 1,
    customContributionUnit: 'months',
    stopContributionUnit: 'years'
  });

  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  const results = useMemo(() => calculateResults(inputs), [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number | ContributionFrequency | TimeUnit | GrowthPeriodUnit) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && 
               field !== 'contributionFrequency' && 
               field !== 'customContributionUnit' && 
               field !== 'stopContributionUnit' &&
               field !== 'growthPeriodUnit'
        ? parseFloat(value) || 0 
        : value,
    }));
  };

  const handleScreenshot = async () => {
    if (resultsRef.current) {
      try {
        const scale = 2;
        const style = {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
        };

        const dataUrl = await toPng(resultsRef.current, {
          quality: 1.0,
          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
          pixelRatio: 3,
          style,
          width: resultsRef.current.offsetWidth * scale,
          height: resultsRef.current.offsetHeight * scale,
        });
        
        const link = document.createElement('a');
        link.download = 'compound-interest-results.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error taking screenshot:', err);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
    }`}>
      <div className="container mx-auto px-6 py-6 max-w-[1920px] h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="/dist/icons/favicon-32x32.png" 
              alt="Calculator" 
              className="w-8 h-8"
            />
            <AnimatedTitle 
              text="Compound Interest Calculator"
              darkMode={darkMode}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleScreenshot}
              className={`p-2 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white hover:bg-gray-100'
              } transition-colors duration-200`}
              title="Take Screenshot"
            >
              <Camera className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 flex-1">
          <CalculatorForm 
            inputs={inputs}
            onInputChange={handleInputChange}
            darkMode={darkMode}
          />

          <div 
            ref={resultsRef}
            className={`lg:col-span-3 rounded-xl shadow-lg p-6 space-y-6 flex flex-col ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <ResultsGraph results={results} darkMode={darkMode} />
            <ResultsSummary results={results} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
