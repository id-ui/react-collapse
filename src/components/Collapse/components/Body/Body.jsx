import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import PropTypes from 'prop-types';

function Body({ isOpen, children, close, animation, className }, ref) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div ref={ref} {...animation} className={className}>
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
};

BodyWithRef.defaultProps = {
  animation: {
    initial: {
      height: 0,
      overflow: 'hidden',
    },
    animate: {
      height: 'auto',
      overflow: 'inherit',
      transition: { overflow: { delay: 0.2 } },
    },
    exit: {
      height: 0,
      overflow: 'hidden',
    },
    transition: { duration: 0.2 },
  },
};

export default BodyWithRef;
