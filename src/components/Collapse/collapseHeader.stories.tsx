import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './components/Header';

export default {
  title: 'Collapse.Header',
  component: Header,
  argTypes: {
    className: {
      control: 'text',
      description: 'Header className',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether Collapse expanded or not',
    },
  },
} as ComponentMeta<typeof Header>;

export const CollapseHeader: ComponentStory<typeof Header> = (props) => (
  <Header {...props} />
);
