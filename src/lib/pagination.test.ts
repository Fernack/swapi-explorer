import { describe, it, expect } from 'vitest';
import { getVisiblePageNumbers } from './pagination';

describe('getVisiblePageNumbers', () => {
  it('returns empty array for totalPages <= 0', () => {
    expect(getVisiblePageNumbers(1, 0)).toEqual([]);
  });

  it('returns all pages when totalPages <= 7', () => {
    expect(getVisiblePageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getVisiblePageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns first 7 pages when currentPage is near the start', () => {
    expect(getVisiblePageNumbers(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(getVisiblePageNumbers(4, 10)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns last 7 pages when currentPage is near the end', () => {
    expect(getVisiblePageNumbers(10, 10)).toEqual([4, 5, 6, 7, 8, 9, 10]);
    expect(getVisiblePageNumbers(7, 10)).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });

  it('returns a window of 7 around currentPage in the middle', () => {
    expect(getVisiblePageNumbers(5, 10)).toEqual([2, 3, 4, 5, 6, 7, 8]);
    expect(getVisiblePageNumbers(6, 12)).toEqual([3, 4, 5, 6, 7, 8, 9]);
  });
});
