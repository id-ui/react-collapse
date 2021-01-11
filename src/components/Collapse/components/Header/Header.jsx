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
    ...props
  },
  ref
) {
  return _.isFunction(children) ? (
    <div ref={ref} {...props}>
      {children({ isOpen, open, close, toggle })}
    </div>
  ) : (
    <div ref={ref} onClick={toggle} {...props}>
      {children}
    </div>
  );
}

const HeaderWithRef = React.forwardRef(Header);

HeaderWithRef.propTypes = {
  className: PropTypes.string,
};

export default HeaderWithRef;
