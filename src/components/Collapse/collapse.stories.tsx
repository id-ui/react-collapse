import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { ComponentMeta, ComponentStory, Story } from '@storybook/react';
import Collapse from './Collapse';
import {
  CollapseCloserProps,
  CollapseProps,
  CollapseState,
  CollapseToggleProps,
} from './types';
import { CollapseHeader } from './collapseHeader.stories';
import { CollapseBody } from './collapseBody.stories';
import { defaultAnimation } from './components/Body/config';

export default {
  title: 'Collapse',
  component: Collapse,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        'Whether Collapse expanded or not. If this prop provided you should control Collapse visibility from outside.',
    },
    onChangeOpen: {
      action: 'onChangeOpen',
      description:
        'Function triggered when Collapse should change isOpen state',
    },
    initialIsOpen: {
      control: 'boolean',
      description: 'Whether Collapse expanded on init or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    lazy: {
      control: 'boolean',
      description:
        'Whether Collapse should render Collapse.Body on init or not. If false Collapse.Body will be first rendered on first open',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether close on escape button press or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnEnter: {
      control: 'boolean',
      description: 'Whether close on enter button press or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnRemoteClick: {
      control: 'boolean',
      description: 'Whether close on remote click or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    animation: {
      control: 'object',
      description:
        'framer-motion props for opening/closing animation. Pass this prop to Collapse.Body.',
      defaultValue: defaultAnimation,
      table: {
        defaultValue: {
          summary: JSON.stringify(defaultAnimation),
        },
      },
    },
  },
} as ComponentMeta<typeof Collapse>;

const Header = styled(CollapseHeader)`
  padding: 10px;
  line-height: 20px;
  cursor: ${prop('cursor', 'default')};
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  width: 100%;
`;

const Body = styled(CollapseBody)`
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 100%;
`;

const Content = styled.div`
  height: 300px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0 1.5rem;
  background-color: #580b9e;
  color: #ffffff;
  height: 3.5rem;
  &:hover {
    background-color: #9552d4;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Playground: Story<CollapseProps> = (props) => {
  return (
    <Collapse {...props}>
      <Header {...CollapseHeader.args}>Open</Header>
      <Body {...props}>
        <Content>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words. Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words.
        </Content>
      </Body>
    </Collapse>
  );
};

export const HeaderFunction: Story<CollapseProps> = (props) => {
  return (
    <Collapse {...props}>
      <Header {...CollapseHeader.args}>
        {({ open, close, toggle }: CollapseToggleProps) => (
          <Fragment>
            <Button onClick={open}>Open</Button>
            <Button onClick={close}>Close</Button>
            <Button onClick={toggle}>Toggle</Button>
          </Fragment>
        )}
      </Header>
      <Body {...props}>
        <Content>:)</Content>
      </Body>
    </Collapse>
  );
};

export const BodyFunction: Story<CollapseProps> = (props) => {
  return (
    <Collapse {...props}>
      <Header {...CollapseHeader.args}>Open</Header>
      <Body {...props}>
        {({ close }: CollapseCloserProps) => (
          <Content>
            <Button onClick={close}>Close</Button>
          </Content>
        )}
      </Body>
    </Collapse>
  );
};

export const ControlledCollapse: Story<CollapseProps> = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    const result = confirm(
      `Are you sure you want to ${isOpen ? 'close' : 'open'} Collapse?`
    );
    if (result) {
      setOpen(!isOpen);
    }
  }, [isOpen]);

  return (
    <div>
      <button onClick={handleToggle}>Click me</button>
      <Collapse {...props} isOpen={isOpen}>
        <Body {...props}>:)</Body>
      </Collapse>
    </div>
  );
};

export const CustomAnimation: ComponentStory<typeof Collapse> = () => {
  return (
    <Collapse>
      <Header>Open</Header>
      <Collapse.Body
        animation={{
          [CollapseState.close]: {
            opacity: 0,
          },
          [CollapseState.open]: {
            opacity: 1,
          },
          transition: {
            [CollapseState.open]: { duration: 0.2, ease: [0.3, 0.6, 0.3, 0.2] },
            [CollapseState.close]: {
              duration: 0.1,
              ease: [0.3, 0.6, 0.3, 0.2],
            },
          },
        }}
      >
        <Content>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words. Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words.
        </Content>
      </Collapse.Body>
    </Collapse>
  );
};
