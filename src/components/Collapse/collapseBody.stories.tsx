import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { defaultAnimation } from './components/Body/config';
import Body from './components/Body';

export default {
  title: 'Collapse.Body',
  component: Body,
  argTypes: {
    className: {
      control: 'text',
      description:
        'Body className. Do not set padding or margin on body, use wrapper.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether Collapse expanded or not',
    },
    animation: {
      control: 'object',
      description: 'framer-motion props for opening/closing animation',
      defaultValue: defaultAnimation,
      table: {
        defaultValue: {
          summary: JSON.stringify(defaultAnimation),
        },
      },
    },
  },
} as ComponentMeta<typeof Body>;

export const CollapseBody: ComponentStory<typeof Body> = (props) => (
  <Body {...props} />
);
