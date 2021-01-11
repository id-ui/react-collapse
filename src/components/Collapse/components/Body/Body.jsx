import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import PropTypes from 'prop-types';

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
          initial={animation.closed}
          transition={animation.transition}
          animate={isOpen ? animation.open : animation.closed}
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
    closed: {
      scaleY: 0,
      originY: 0,
      overflow: 'hidden',
    },
    open: {
      scaleY: 1,
      originY: 0,
      overflow: 'inherit',
      transition: { overflow: { delay: 0.2 } },
    },
    transition: { duration: 0.2 },
  },
  lazy: true,
};

export default BodyWithRef;
