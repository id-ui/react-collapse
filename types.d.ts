import * as React from 'react';

type VoidFunction = (...args: any[]) => void;

interface CollapseTransition {
    open: object;
    close: object;
}

interface CollapseAnimation {
    open: object;
    close: object;
    transition: CollapseTransition;
}

interface CollapseBodyProps {
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
     * Function called when Collapse.Body should close (Provided by Collapse)
     */
    close?: VoidFunction;
    /**
     * Whether Collapse.Body should render content on init or not. If false content will be rendered on first open
     * @default false
     */
    lazy?: boolean;
    /**
     * Collapse.Body content
     */
    children?: React.ReactChildren | (({ close: VoidFunction }) => React.ReactChildren);
}

class CollapseBody extends React.Component<CollapseBodyProps> {}

interface CollapseHeaderProps {
    /**
     * Collapse.Header className
    */
    className?: string;
    /**
     * is Collapse opened (Provided by Collapse)
    */
    isOpen: boolean;
    /**
     * Function called when Collapse.Body should open (Provided by Collapse)
    */
    open: VoidFunction;
    /**
     * Function called when Collapse.Body should close (Provided by Collapse)
    */
    close: VoidFunction;
    /**
     * Function called when Collapse.Body should open if it closed or close if it opened (Provided by Collapse)
    */
    toggle: VoidFunction;
    /**
     * Collapse.Header content
    */
    children?: React.ReactChildren | (({ close: VoidFunction, open: VoidFunction, toggle: VoidFunction, isOpen: boolean }) => React.ReactChildren);
}

class CollapseHeader extends React.Component<CollapseHeaderProps> {}

interface CollapseProps {
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
     * Whether Collapse should render Collapse.Body on init or not. If false Collapse.Body will be first rendered on first open
     * @default true
     */
    lazy?: boolean;
    /**
     * Collapse children (Collapse.Body and Collapse.Header)
     */
    children?: React.ReactChildren;
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

export default class Collapse extends React.Component<CollapseProps> {
    static Header: CollapseHeader;
    static Body: CollapseBody;
}