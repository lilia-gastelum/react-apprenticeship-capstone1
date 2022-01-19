import { renderHook } from '@testing-library/react-hooks';
import { FAVORITES_LIST } from './constants';
import { random } from './fns';
import { storage } from './storage';

test('should get value', () => {
  const { result } = renderHook(() => random(100));
  expect(result.current).toBeLessThanOrEqual(100);
});


test('should get storage', () => {
    renderHook(() => storage.set(FAVORITES_LIST, JSON.stringify([])));
    const { result } = renderHook(() => storage.get(FAVORITES_LIST));
    expect((JSON.parse(result.current)).length).toBe(0);
});

test('storage catches error', () => {
  renderHook(() => storage.set(FAVORITES_LIST, []));
  const { result } = renderHook(() => storage.get('error'));
  expect(result.current).toBe(null);
});