import dayjs from 'dayjs';
import { expect, describe, it } from 'vitest'

import { formatDate, isOldTOS } from './date'; 

describe('formatDate', () => {
  it('should format date without time in US format', () => {
    const result = formatDate('US', '01/02/2022');
    expect(result.format('MM/DD/YYYY')).toBe('01/02/2022');
  });

  it('should format date with time in US format', () => {
    const result = formatDate('US', '01/02/2022', '10:30');
    expect(result.format('MM/DD/YYYY HH:mm')).toBe('01/02/2022 10:30');
  });

  it('should format date without time in non-US format', () => {
    const result = formatDate('Europe', '02/01/2022');
    expect(result.format('DD/MM/YYYY')).toBe('02/01/2022'); 
  });

  it('should format date with time in non-US format', () => {
    const result = formatDate('Europe', '02/07/2022', '15:45');
    expect(result.format('DD/MM/YYYY HH:mm')).toBe('02/07/2022 15:45'); 
  });
});


describe('isOldTOS', () => {
  it('should return true if dayjsObject is before old TOS', () => {
    const dayjsObject = dayjs('01/01/2020', 'MM/DD/YYYY');
    expect(isOldTOS(dayjsObject)).toBe(true);
  });

  it('should return false if dayjsObject is after or equal to old TOS', () => {
    const dayjsObject1 = dayjs('01/02/2020', 'MM/DD/YYYY');
    const dayjsObject2 = dayjs('01/03/2020', 'MM/DD/YYYY');
    expect(isOldTOS(dayjsObject1)).toBe(false);
    expect(isOldTOS(dayjsObject2)).toBe(false);
  });

  it('should handle edge case of equal date and time', () => {
    const dayjsObject = dayjs('01/02/2020 12:34:56', 'MM/DD/YYYY HH:mm:ss');
    expect(isOldTOS(dayjsObject)).toBe(false);
  });

  it('should handle equal date with time in different formats', () => {
    const dayjsObject1 = dayjs('01/02/2020 12:34:56', 'MM/DD/YYYY HH:mm:ss');
    const dayjsObject2 = dayjs('01/02/2020 12:34', 'MM/DD/YYYY HH:mm');
    expect(isOldTOS(dayjsObject1)).toBe(false);
    expect(isOldTOS(dayjsObject2)).toBe(false);
  });
});