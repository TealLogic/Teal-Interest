import { numberScales } from './numberScales';

export const formatAxisValue = (value: number) => {
  if (!isFinite(value)) return 'Ad Infinitum';
  
  for (const scale of numberScales) {
    if (value >= scale.value) {
      return `$${(value / scale.value).toFixed(2)}${scale.symbol}`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatTooltipValue = (value: number) => {
  if (!isFinite(value)) return 'Ad Infinitum';
  
  for (const scale of numberScales) {
    if (value >= scale.value) {
      return `$${(value / scale.value).toFixed(2)}${scale.symbol} (${scale.name})`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatResultValue = (value: number) => {
  if (!isFinite(value)) return '<span>Ad Infinitum</span>';
  
  for (const scale of numberScales) {
    if (value >= scale.value) {
      const formatted = `$${(value / scale.value).toFixed(2)}${scale.symbol}`;
      return `<span title="${scale.name}">${formatted}</span>`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};