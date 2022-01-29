import React, { MutableRefObject, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isFunction } from 'lodash';
import { CollapseBodyProps, CollapseState } from '../../types';
import { defaultAnimation } from './config';

const Body = (
  {
    isOpen,
    initialIsOpen,
    children,
    close,
    animation = defaultAnimation,
    className,
    lazy = true,
  }: CollapseBodyProps,
  ref: MutableRefObject<HTMLDivElement>
) => {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInitialized(true);
    }
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      {lazy && !isInitialized ? null : (
        <motion.div
          ref={ref}
          initial={initialIsOpen ? false : animation[CollapseState.close]}
          transition={
            isOpen
              ? animation.transition[CollapseState.open]
              : animation.transition[CollapseState.close]
          }
          animate={
            isOpen
              ? animation[CollapseState.open]
              : animation[CollapseState.close]
          }
          className={className}
        >
          {isFunction(children) ? children({ close }) : children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BodyWithRef = React.forwardRef(Body);

export default BodyWithRef;
