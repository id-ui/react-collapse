import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { withPropsTable } from 'storybook-addon-react-docgen';
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
        'Whether collapse expanded or not. If this prop provided you should control Collapse visibility from outside.',
    },
    onChangeOpen: {
      action: 'onChangeOpen',
      description:
        'Function triggered when collapse should change isOpen state',
    },
    initialIsOpen: {
      control: 'boolean',
      description: 'Whether collapse expanded on init or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    lazy: {
      control: 'boolean',
      description:
        'Whether collapse body should be present in the document before first opening or not',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
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
      description: 'Body className',
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
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [Collapse],
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
  const bodyProps = _.pick(
    props,
    _.keys(props).filter((item) => item.startsWith('Collapse.Body'))
  );
  const headerProps = _.pick(
    props,
    _.keys(props).filter((item) => item.startsWith('Collapse.Header'))
  );
  const collapseProps = _.omit(props, [
    ..._.keys(bodyProps),
    ..._.keys(headerProps),
  ]);

  return {
    collapseProps,
    bodyProps: _.mapKeys(bodyProps, (value, key) =>
      key.replace('Collapse.Body.', '')
    ),
    headerProps: _.mapKeys(headerProps, (value, key) =>
      key.replace('Collapse.Header.', '')
    ),
  };
};

export function playground(props) {
  const { bodyProps, headerProps, collapseProps } = filterProps(props);

  return (
    <Collapse {...collapseProps}>
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
  const { bodyProps, headerProps, collapseProps } = filterProps(props);
  return (
    <Collapse {...collapseProps}>
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
  const { bodyProps, headerProps, collapseProps } = filterProps(props);
  return (
    <Collapse {...collapseProps}>
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
  const { bodyProps, collapseProps } = filterProps(props);
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
      <Collapse {...collapseProps} isOpen={isOpen}>
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
