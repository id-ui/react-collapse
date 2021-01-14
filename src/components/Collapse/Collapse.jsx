import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from './components/Header';
import Body from './components/Body';
import { useOpen } from './hooks';

const Collapse = ({
  children,
  initialIsOpen,
  isOpen: providedIsOpen,
  onChangeOpen,
  closeOnRemoteClick,
  closeOnEscape,
  closeOnEnter,
  lazy,
}) => {
  const { addTarget, isOpen, open, close, toggle } = useOpen({
    initialIsOpen,
    closeOnRemoteClick,
    closeOnEscape,
    closeOnEnter,
    isOpen: providedIsOpen,
    onChangeOpen,
  });

  return React.Children.map(children, (item, index) =>
    React.cloneElement(item, {
      isOpen,
      open,
      close,
      toggle,
      ref: addTarget(index),
      lazy,
      initialIsOpen,
    })
  );
};

Collapse.propTypes = {
  closeOnRemoteClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnEnter: PropTypes.bool,
  onChangeOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  initialIsOpen: PropTypes.bool,
  lazy: PropTypes.bool,
  children: PropTypes.any,
};

Collapse.defaultProps = {
  closeOnRemoteClick: false,
  closeOnEscape: false,
  closeOnEnter: false,
  initialIsOpen: false,
  onChangeOpen: _.noop,
  lazy: true,
};

Collapse.Header = Header;
Collapse.Body = Body;

export default Collapse;
