import { CalculatorInputs, CalculationResult } from '../types/calculator';

export const calculateResults = (inputs: CalculatorInputs): CalculationResult[] => {
  const {
    initialDeposit,
    growthPeriod,
    growthPeriodUnit,
    returnRate,
    contributionAmount,
    contributionFrequency,
    customContributionDays,
    customContributionUnit,
    stopContributionAfter,
    stopContributionUnit,
  } = inputs;

  const DAYS_PER_YEAR = 365.25; // Account for leap years
  const DAYS_PER_MONTH = DAYS_PER_YEAR / 12;
  
  // Convert growth period to years
  const years = growthPeriodUnit === 'months' ? growthPeriod / 12 : growthPeriod;
  
  // Convert contribution interval to days
  let contributionIntervalDays = 30.4375; // Default monthly (365.25 / 12)
  if (contributionFrequency === 'quarterly') contributionIntervalDays = DAYS_PER_YEAR / 4;
  else if (contributionFrequency === 'biannual') contributionIntervalDays = DAYS_PER_YEAR / 2;
  else if (contributionFrequency === 'yearly') contributionIntervalDays = DAYS_PER_YEAR;
  else if (contributionFrequency === 'custom' && customContributionDays) {
    if (customContributionUnit === 'days') {
      contributionIntervalDays = customContributionDays;
    } else if (customContributionUnit === 'months') {
      contributionIntervalDays = customContributionDays * DAYS_PER_MONTH;
    } else if (customContributionUnit === 'years') {
      contributionIntervalDays = customContributionDays * DAYS_PER_YEAR;
    }
  }

  const dailyRate = returnRate / 100 / DAYS_PER_YEAR;
  let balance = initialDeposit;
  let totalContributions = initialDeposit;
  
  // Start with a negative lastContributionDay to ensure first contribution happens at the right time
  let lastContributionDay = -contributionIntervalDays;

  // Convert stop contribution time to days
  let stopAfterDays = Infinity;
  if (stopContributionAfter && stopContributionUnit) {
    if (stopContributionUnit === 'days') {
      stopAfterDays = stopContributionAfter;
    } else if (stopContributionUnit === 'months') {
      stopAfterDays = stopContributionAfter * DAYS_PER_MONTH;
    } else if (stopContributionUnit === 'years') {
      stopAfterDays = stopContributionAfter * DAYS_PER_YEAR;
    }
  }

  const totalDays = Math.ceil(years * DAYS_PER_YEAR);
  const results: CalculationResult[] = [];
  
  // Record initial state at day 0
  results.push({
    year: 0,
    balance,
    totalContributions,
    earnings: 0
  });
  
  let currentDay = 1; // Start from day 1
  let lastRecordedYear = 0;

  while (currentDay <= totalDays) {
    // Check if it's time for a contribution (do this before interest calculation)
    if (currentDay >= lastContributionDay + contributionIntervalDays && 
        currentDay < stopAfterDays) {
      balance += contributionAmount;
      totalContributions += contributionAmount;
      lastContributionDay = currentDay;
    }

    // Apply daily compound interest
    balance *= (1 + dailyRate);
    
    // Check for infinity
    if (!isFinite(balance)) {
      balance = Number.MAX_VALUE;
      totalContributions = Math.min(totalContributions, Number.MAX_VALUE);
      break;
    }

    // Record results at each year mark and at the final point
    const currentYear = currentDay / DAYS_PER_YEAR;
    const shouldRecord = 
      Math.floor(currentYear) > lastRecordedYear || // Record at each year mark
      currentDay === totalDays; // Record at the final point

    if (shouldRecord) {
      results.push({
        year: currentYear === Math.floor(currentYear) ? currentYear : Number(currentYear.toFixed(2)),
        balance: Math.min(balance, Number.MAX_VALUE),
        totalContributions: Math.min(totalContributions, Number.MAX_VALUE),
        earnings: Math.min(balance - totalContributions, Number.MAX_VALUE),
      });
      lastRecordedYear = Math.floor(currentYear);
    }

    currentDay++;
  }

  return results;
};