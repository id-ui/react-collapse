import { ReactElement, HTMLAttributes, ReactNode } from 'react';

export enum CollapseState {
  open = 'open',
  close = 'close',
}

type CollapseTransition = {
  [state in CollapseState]: object;
};

type CollapseAnimation = {
  [state in CollapseState]: object;
} & { transition: CollapseTransition };

export interface CollapseCloserProps {
  /**
   * Function called when Collapse.Body should close (Provided by Collapse)
   */
  close?: () => void;
}

export interface CollapseBodyProps
  extends CollapseCloserProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Whether Collapse.Body expanded or not (provided by Collapse, but if you want use only Collapse.Body you should provide this prop)
   */
  isOpen?: boolean;
  /**
   * Body className (Do not set padding or margin, use wrapper for it)
   */
  className?: string;
  /**
   * framer-motion props for opening/closing animation variants
   */
  animation?: CollapseAnimation;
  /**
   * Whether Collapse.Body expanded on init or not (Provided by Collapse)
   */
  initialIsOpen?: boolean;
  /**
   * Whether Collapse.Body should render content on init or not. If false content will be rendered on first open
   * @default false
   */
  lazy?: boolean;
  /**
   * Collapse.Body content
   */
  children?:
    | ReactNode
    | ReactNode[]
    | ((props: CollapseCloserProps) => ReactNode | ReactNode[]);
}

export interface CollapseToggleProps extends CollapseCloserProps {
  /**
   * is Collapse opened (Provided by Collapse)
   */
  isOpen?: boolean;
  /**
   * Function called when Collapse.Body should open (Provided by Collapse)
   */
  open?: () => void;
  /**
   * Function called when Collapse.Body should open if it closed or close if it opened (Provided by Collapse)
   */
  toggle?: () => void;
}

export interface CollapseHeaderProps
  extends CollapseToggleProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Collapse.Header className
   */
  className?: string;
  /**
   * Collapse.Header content
   */
  children?:
    | ReactNode
    | ReactNode[]
    | ((props: CollapseToggleProps) => ReactNode | ReactNode[]);
}

export interface CollapseToggleableProps {
  /**
   * Function triggered when Collapse should change isOpen state
   */
  onChangeOpen?: (isOpen: boolean) => void;
  /**
   * Whether Collapse expanded or not. If this prop provided you should control Collapse visibility from outside.
   */
  isOpen?: boolean;
  /**
   * Whether Collapse expanded on init or not
   * @default false
   */
  initialIsOpen?: boolean;
  /**
   * Whether close on remote click or not
   * @default false
   */
  closeOnRemoteClick?: boolean;
  /**
   * Whether close on escape button press or not
   * @default false
   */
  closeOnEscape?: boolean;
  /**
   * Whether close on enter button press or not
   * @default false
   */
  closeOnEnter?: boolean;
}

export interface CollapseProps extends CollapseToggleableProps {
  /**
   * Whether Collapse should render Collapse.Body on init or not. If false Collapse.Body will be first rendered on first open
   * @default true
   */
  lazy?: boolean;
  /**
   * Collapse children (Collapse.Body and Collapse.Header)
   */
  children?: ReactElement | ReactElement[];
}
