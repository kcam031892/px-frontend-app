import { SizeUnit } from 'shared/enums/SizeUnit';

export const toImperial = (number: number): string => {
  return `${number} cm`;
};

export const toMetric = (number: number): string => {
  const calc = number / 2.54;
  return `${Math.floor(calc / 12)}' ${Math.round((calc % 12) * 10) / 10}"`;
};

export const toImperialAndMetric = (number: number): string => {
  const calc = number / 2.54;
  return `${toImperial(number)} / ${Math.floor(calc / 12)}' ${Math.round(calc % 12)}"`;
};

export const convertToUnit = (number: number, unit: SizeUnit): string => {
  return unit === SizeUnit.Imperial
    ? toImperial(number)
    : unit === SizeUnit.Metric
    ? toMetric(number)
    : toImperialAndMetric(number);
};

export const bytesToSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const numberToDuration = (num: number) => {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes}:${seconds}`;
};
