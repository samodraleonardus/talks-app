import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ButtonThread from '../components/ButtonThread';

const story = {
  title: 'Components/ButtonThread',
  component: ButtonThread,
  argTypes: {
    to: { control: 'text' },
    bgColor: { control: 'color' },
    iconColor: { control: 'color' },
    border: { control: 'text' },
    beforeBg: { control: 'text' },
    afterBg: { control: 'text' },
    iconName: {
      control: {
        type: 'select',
        options: ['FaComments', 'FaHome', 'HiChatBubbleLeftRight'],
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default story;

const Template = (args) => <ButtonThread {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  to: '/',
  bgColor: 'white',
  iconColor: 'red',
  border: 'none',
  beforeBg: 'conic-gradient(yellow 0deg 90deg, red 90deg 270deg, yellow 270deg 360deg)',
  afterBg: 'conic-gradient(white 0deg 90deg, white 90deg 270deg, white 270deg 360deg)',
  iconName: 'FaComments',
};
