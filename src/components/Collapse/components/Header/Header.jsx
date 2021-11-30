import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

function Header(
  {
    isOpen,
    open,
    close,
    toggle,
    children,
    // eslint-disable-next-line no-unused-vars
    lazy,
    // eslint-disable-next-line no-unused-vars
    initialIsOpen,
    ...props
  },
  ref
) {
  if (_.isFunction(children)) {
    return (
      <div ref={ref} {...props}>
        {children({ isOpen, open, close, toggle })}
      </div>
    );
  }

  return (
    <div ref={ref} onClick={toggle} {...props}>
      {children}
    </div>
  );
}

const HeaderWithRef = React.forwardRef(Header);

HeaderWithRef.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  open: PropTypes.func,
  close: PropTypes.func,
  toggle: PropTypes.func,
  children: PropTypes.any,
};

export default HeaderWithRef;
