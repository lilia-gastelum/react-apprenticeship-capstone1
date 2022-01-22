import { renderHook, act } from '@testing-library/react-hooks'
import {useFortune} from './useFortune'

test('should get value', () => {
  const { result } = renderHook(() => useFortune())

  act(() => {
    result
  })

  expect(result).not.toBe(null)
})