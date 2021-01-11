import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import PropTypes from 'prop-types';

const STATES = {
  open: 'open',
  close: 'close',
};

function Body({ isOpen, children, close, animation, className, lazy }, ref) {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInitialized(true);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {lazy && !isInitialized ? null : (
        <motion.div
          ref={ref}
          initial={animation[STATES.close]}
          transition={
            isOpen
              ? animation.transition[STATES.open]
              : animation.transition[STATES.close]
          }
          animate={isOpen ? animation[STATES.open] : animation[STATES.close]}
          className={className}
        >
          {_.isFunction(children) ? children({ close }) : children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const BodyWithRef = React.forwardRef(Body);

BodyWithRef.propTypes = {
  className: PropTypes.string,
  animation: PropTypes.object,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  lazy: PropTypes.bool,
};

BodyWithRef.defaultProps = {
  animation: {
    [STATES.close]: {
      height: 0,
      overflow: 'hidden',
    },
    [STATES.open]: {
      height: 'auto',
      overflow: 'inherit',
    },
    transition: {
      [STATES.open]: { duration: 0.2, overflow: { delay: 0.2 } },
      [STATES.close]: { duration: 0.2 },
    },
  },
  lazy: true,
};

export default BodyWithRef;
