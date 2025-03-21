export type ContributionFrequency = 'monthly' | 'quarterly' | 'biannual' | 'yearly' | 'custom';
export type TimeUnit = 'days' | 'months' | 'years';
export type GrowthPeriodUnit = 'months' | 'years';

export interface CalculatorInputs {
  initialDeposit: number;
  growthPeriod: number;
  growthPeriodUnit: GrowthPeriodUnit;
  returnRate: number;
  contributionAmount: number;
  contributionFrequency: ContributionFrequency;
  customContributionDays?: number;
  customContributionUnit?: TimeUnit;
  stopContributionAfter?: number;
  stopContributionUnit?: TimeUnit;
}

export interface NumberScale {
  value: number;
  symbol: string;
  name: string;
}

export interface CalculationResult {
  year: number;
  balance: number;
  totalContributions: number;
  earnings: number;
}