import React, { Fragment } from 'react';
import { noop } from 'lodash';
import Header from './components/Header';
import Body from './components/Body';
import { useOpen } from './hooks';
import { CollapseProps } from './types';

const Collapse = ({
  children,
  initialIsOpen = false,
  isOpen: providedIsOpen,
  onChangeOpen = noop,
  closeOnRemoteClick = false,
  closeOnEscape = false,
  closeOnEnter = false,
  lazy = true,
}: CollapseProps) => {
  const { addTarget, isOpen, open, close, toggle } = useOpen({
    initialIsOpen,
    closeOnRemoteClick,
    closeOnEscape,
    closeOnEnter,
    isOpen: providedIsOpen,
    onChangeOpen,
  });

  return (
    <Fragment>
      {React.Children.map(children, (item, index) =>
        React.cloneElement(item, {
          isOpen,
          open,
          close,
          toggle,
          ref: addTarget(index),
          lazy,
          initialIsOpen,
        })
      )}
    </Fragment>
  );
};

Collapse.Header = Header;
Collapse.Body = Body;

export default Collapse;
