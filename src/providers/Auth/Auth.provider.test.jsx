import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import AuthProvider, { useAuth } from './Auth.provider'

test('should get value', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
        result
    })

    expect(result).not.toBe(null)
});