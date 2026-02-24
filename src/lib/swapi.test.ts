import { describe, it, expect } from 'vitest';
import { getIdFromUrl } from './swapi';

describe('getIdFromUrl', () => {
  it('extracts ID from resource URL with trailing slash', () => {
    expect(getIdFromUrl('https://swapi.dev/api/people/1/')).toBe(1);
    expect(getIdFromUrl('https://swapi.dev/api/planets/5/')).toBe(5);
  });

  it('extracts ID from URL without trailing slash', () => {
    expect(getIdFromUrl('https://swapi.dev/api/people/1')).toBe(1);
    expect(getIdFromUrl('https://swapi.dev/api/films/3')).toBe(3);
  });

  it('handles multi-digit IDs', () => {
    expect(getIdFromUrl('https://swapi.dev/api/starships/12/')).toBe(12);
    expect(getIdFromUrl('https://swapi.dev/api/vehicles/99')).toBe(99);
  });

  it('handles relative paths', () => {
    expect(getIdFromUrl('/api/people/42/')).toBe(42);
  });
});
