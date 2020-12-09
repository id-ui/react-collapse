import React from 'react';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Container } from './styled';

function Body({ isOpen, children, close, animation, className }, ref) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Container ref={ref} {...animation} className={className}>
          {_.isFunction(children) ? children({ close }) : children}
        </Container>
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
    },
    animate: {
      height: 'auto',
    },
    exit: {
      height: 0,
    },
    transition: { duration: 0.2 },
  },
};

export default BodyWithRef;
