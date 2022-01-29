import { CollapseState } from '../../types';

export const defaultAnimation = {
  [CollapseState.close]: {
    height: 0,
    overflow: 'hidden',
  },
  [CollapseState.open]: {
    height: 'auto',
    overflow: 'visible',
  },
  transition: {
    [CollapseState.open]: { duration: 0.2, overflow: { delay: 0.2 } },
    [CollapseState.close]: { duration: 0.2 },
  },
};
