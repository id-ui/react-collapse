import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';
import { pick, omit, mapKeys } from 'lodash';
import { prop } from 'styled-tools';
import Collapse from './Collapse';

export default {
  title: 'Collapse',
  component: Collapse,
  subcomponents: {
    'Collapse.Header': Collapse.Header,
    'Collapse.Body': Collapse.Body,
  },
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
    'Collapse.Body.className': {
      control: 'text',
      description:
        'Body className. Do not set padding or margin on body, use wrapper.',
    },
    'Collapse.Body.animation': {
      control: 'object',
      description: 'framer-motion props for opening/closing animation',
      defaultValue: Collapse.Body.defaultProps.animation,
      table: {
        defaultValue: {
          summary: JSON.stringify(Collapse.Body.defaultProps.animation),
        },
      },
    },
    'Collapse.Header.className': {
      control: 'text',
      description: 'Header className',
    },
  },
};

const Header = styled(Collapse.Header)`
  padding: 10px;
  line-height: 20px;
  cursor: ${prop('cursor', 'default')};
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  width: 100%;
`;

const Body = styled(Collapse.Body)`
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

const filterProps = (props) => {
  const bodyProps = pick(
    props,
    Object.keys(props).filter((item) => item.startsWith('Collapse.Body'))
  );
  const headerProps = pick(
    props,
    Object.keys(props).filter((item) => item.startsWith('Collapse.Header'))
  );
  const CollapseProps = omit(props, [
    ...Object.keys(bodyProps),
    ...Object.keys(headerProps),
  ]);

  return {
    CollapseProps,
    bodyProps: mapKeys(bodyProps, (value, key) =>
      key.replace('Collapse.Body.', '')
    ),
    headerProps: mapKeys(headerProps, (value, key) =>
      key.replace('Collapse.Header.', '')
    ),
  };
};

export function playground(props) {
  const { bodyProps, headerProps, CollapseProps } = filterProps(props);

  return (
    <Collapse {...CollapseProps}>
      <Header {...headerProps}>Open</Header>
      <Body {...bodyProps}>
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
}

export function headerFunction(props) {
  const { bodyProps, headerProps, CollapseProps } = filterProps(props);
  return (
    <Collapse {...CollapseProps}>
      <Header {...headerProps}>
        {({ open, close, toggle }) => (
          <Fragment>
            <Button onClick={open}>Open</Button>
            <Button onClick={close}>Close</Button>
            <Button onClick={toggle}>Toggle</Button>
          </Fragment>
        )}
      </Header>
      <Body {...bodyProps}>
        <Content>:)</Content>
      </Body>
    </Collapse>
  );
}

export function bodyFunction(props) {
  const { bodyProps, headerProps, CollapseProps } = filterProps(props);
  return (
    <Collapse {...CollapseProps}>
      <Header {...headerProps}>Open</Header>
      <Body {...bodyProps}>
        {({ close }) => (
          <Content>
            <Button onClick={close}>Close</Button>
          </Content>
        )}
      </Body>
    </Collapse>
  );
}

export function ControlledCollapse(props) {
  const { bodyProps, CollapseProps } = filterProps(props);
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
      <Collapse {...CollapseProps} isOpen={isOpen}>
        <Body {...bodyProps}>:)</Body>
      </Collapse>
    </div>
  );
}

export function customAnimation() {
  return (
    <Collapse>
      <Header>Open</Header>
      <Body
        animation={{
          close: {
            opacity: 0,
          },
          open: {
            opacity: 1,
          },
          transition: {
            open: { duration: 0.2, ease: [0.3, 0.6, 0.3, 0.2] },
            close: { duration: 0.1, ease: [0.3, 0.6, 0.3, 0.2] },
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
      </Body>
    </Collapse>
  );
}
