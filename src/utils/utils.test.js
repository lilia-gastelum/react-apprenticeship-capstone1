import { renderHook, act } from '@testing-library/react-hooks';
import { random } from './fns';

test('should get value', () => {
  const { result } = renderHook(() => random(100));
  expect(result.current).toBeLessThanOrEqual(100);
});
