import { noop } from '../components/Collapse/helpers';
import { renderHook, act } from '@testing-library/react-hooks';
import { useOpen } from '../components/Collapse/hooks';

describe('useOpen', () => {
  it('handles toggle, open, close', async () => {
    const { result } = renderHook(useOpen, {
      initialProps: {
        closeOnRemoteClick: true,
        closeOnEscape: true,
        closeOnEnter: false,
        onChangeOpen: noop,
        initialIsOpen: false,
      },
    });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle(false));
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.setOpen(true, true));
    expect(result.current.isOpen).toBe(true);
  });

  it('handles controlled visibility', async () => {
    const { result } = renderHook(useOpen, {
      initialProps: {
        onChangeOpen: noop,
        initialIsOpen: false,
        isOpen: false,
      },
    });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
