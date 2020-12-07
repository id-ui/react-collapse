import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from './components/Header';
import Body from './components/Body';
import { useOpen } from './hooks';

const Collapse = ({
  children,
  isOpen: providedIsOpen,
  onChangeOpen,
  isOpenControlled,
  closeOnRemoteClick,
  closeOnEscape,
  closeOnEnter,
}) => {
  const { addTarget, isOpen, open, close, toggle } = useOpen({
    closeOnRemoteClick,
    closeOnEscape,
    closeOnEnter,
    isOpen: providedIsOpen,
    isOpenControlled,
    onChangeOpen,
  });

  return React.Children.map(children, (item, index) =>
    React.cloneElement(item, {
      isOpen,
      open,
      close,
      toggle,
      ref: addTarget(index),
    })
  );
};

Collapse.propTypes = {
  closeOnRemoteClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnEnter: PropTypes.bool,
  onChangeOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  isOpenControlled: PropTypes.bool,
};

Collapse.defaultProps = {
  closeOnRemoteClick: false,
  closeOnEscape: false,
  closeOnEnter: false,
  isOpen: false,
  isOpenControlled: false,
  onChangeOpen: _.noop,
};

Collapse.Header = Header;
Collapse.Body = Body;

export default Collapse;
