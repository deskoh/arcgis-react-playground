import { renderHook, act } from '@testing-library/react';
import { watch } from '@arcgis/core/core/reactiveUtils';
import { useMapWatchValue } from './Util';

jest.mock('@arcgis/core/core/reactiveUtils', () => ({
  watch: jest.fn(),
}));

const mockWatch = watch as jest.MockedFunction<typeof watch>;

describe('useMapWatchValue', () => {
  let trigger: () => void;
  const removeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockWatch.mockImplementation((getValue, callback) => {
      trigger = () => (callback as (v: unknown) => void)(getValue());
      return { remove: removeMock };
    });
  });

  it('returns initial value before trigger', () => {
    const { result } = renderHook(() => useMapWatchValue(() => 'updated', 'initial'));
    expect(result.current).toBe('initial');
  });

  it('updates value to result of getValue when triggered', () => {
    const { result } = renderHook(() => useMapWatchValue(() => 'updated', 'initial'));

    act(() => { trigger(); });

    expect(result.current).toBe('updated');
  });

  it('reflects latest getValue result on each trigger', () => {
    let count = 0;
    const { result } = renderHook(() => useMapWatchValue(() => ++count, 0));

    act(() => { trigger(); });
    expect(result.current).toBe(1);

    act(() => { trigger(); });
    expect(result.current).toBe(2);
  });

  it('removes watch handle on unmount', () => {
    const { unmount } = renderHook(() => useMapWatchValue(() => 'x', 'initial'));
    unmount();
    expect(removeMock).toHaveBeenCalledTimes(1);
  });
});
