import { renderHook, act } from '@testing-library/react-hooks'
import {useFortune} from './useFortune'

test('should get value', () => {
  const { result } = renderHook(() => useFortune())

  act(() => {
    console.log(result);
    result
  })

  expect(result).not.toBe(null)
})