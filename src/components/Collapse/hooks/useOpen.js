import { useCallback, useState, useEffect, useRef } from 'react';
import { isBoolean } from 'lodash';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnRemoteClick,
  isOpen: providedIsOpen,
  initialIsOpen,
  onChangeOpen,
}) => {
  const targetsMap = useRef({});
  const parentNode = useRef(document.body);

  const addTarget = (index) => (node) => {
    targetsMap.current[index] = node;
  };

  const [isOpen, setOpen] = useState(initialIsOpen);

  const isOpenControlled = isBoolean(providedIsOpen);

  const updateOpen = useCallback(
    (value, force) => {
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
    (value) => {
      updateOpen(isBoolean(value) ? value : !isOpen);
    },
    [isOpen, updateOpen]
  );

  useEffect(() => {
    const remoteClickListener = (e) => {
      const targets = Object.values(targetsMap.current).filter(Boolean);
      if (
        isOpen &&
        closeOnRemoteClick &&
        !targets.find((item) => item.contains(e.target)) &&
        (e.which || e.button) === 1 &&
        (!parentNode.current || parentNode.current.contains(e.target))
      ) {
        close();
      }
    };

    const keyDownListener = (e) => {
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
