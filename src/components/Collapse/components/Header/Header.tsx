import React, { MutableRefObject } from 'react';
import { isFunction, omit } from 'lodash';
import { CollapseHeaderProps } from '../../types';

const collapseChildExtraProps = ['lazy', 'initialIsOpen'];

const Header = (
  { isOpen, open, close, toggle, children, ...props }: CollapseHeaderProps,
  ref: MutableRefObject<HTMLDivElement>
) => {
  if (isFunction(children)) {
    return (
      <div ref={ref} {...omit(props, collapseChildExtraProps)}>
        {children({ isOpen, open, close, toggle })}
      </div>
    );
  }

  return (
    <div ref={ref} onClick={toggle} {...omit(props, collapseChildExtraProps)}>
      {children}
    </div>
  );
};

const HeaderWithRef = React.forwardRef(Header);

export default HeaderWithRef;
