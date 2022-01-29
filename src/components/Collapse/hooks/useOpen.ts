import {
  useCallback,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import { isBoolean } from 'lodash';
import { CollapseToggleableProps } from '../types';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnRemoteClick,
  isOpen: providedIsOpen,
  initialIsOpen,
  onChangeOpen,
}: CollapseToggleableProps) => {
  const targetsMap: MutableRefObject<{ [key: number]: HTMLElement }> = useRef(
    {}
  );
  const parentNode = useRef(document.body);

  const addTarget = (index: number) => (node: HTMLElement) => {
    targetsMap.current[index] = node;
  };

  const [isOpen, setOpen] = useState(initialIsOpen);

  const isOpenControlled = isBoolean(providedIsOpen);

  const updateOpen = useCallback(
    (value: boolean, force?: boolean) => {
      if (!force && (!isOpenControlled || providedIsOpen !== value)) {
        onChangeOpen(value);
      }

      if (force || !isOpenControlled) {
        setOpen(value);
      }
    },
    [isOpenControlled, onChangeOpen, providedIsOpen]
  );

  useEffect(() => {
    if (isOpenControlled) {
      setOpen(providedIsOpen);
    }
  }, [providedIsOpen, isOpenControlled]);

  const open = useCallback(() => {
    updateOpen(true);
  }, [updateOpen]);

  const close = useCallback(() => {
    updateOpen(false);
  }, [updateOpen]);

  const toggle = useCallback(
    (value?: boolean | unknown) => {
      updateOpen(isBoolean(value) ? value : !isOpen);
    },
    [isOpen, updateOpen]
  );

  useEffect(() => {
    const remoteClickListener = (e: MouseEvent) => {
      if ((e.which || e.button) !== 1) {
        return;
      }

      if (!isOpen || !closeOnRemoteClick) {
        return;
      }

      if (!(e.target instanceof Node)) {
        return;
      }

      const targetNode: Node = e.target;

      const isInsideClick =
        (parentNode.current && !parentNode.current.contains(targetNode)) ||
        Object.values(targetsMap.current).find(
          (item) => item && item.contains(targetNode)
        );

      if (!isInsideClick) {
        close();
      }
    };

    const keyDownListener = (e: KeyboardEvent) => {
      if (
        isOpen &&
        [closeOnEscape && 'Escape', closeOnEnter && 'Enter'].includes(e.key)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', remoteClickListener);
    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('mousedown', remoteClickListener);
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [isOpen, closeOnRemoteClick, close, closeOnEscape, closeOnEnter]);

  return {
    isOpen,
    setOpen: updateOpen,
    open,
    close,
    toggle,
    addTarget,
    parentNode,
  };
};
