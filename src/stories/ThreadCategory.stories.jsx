import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ThreadCategory from '../components/ThreadCategory';
import selectedCategoryReducer from '../states/category/reducer';

const store = configureStore({
  reducer: {
    category: selectedCategoryReducer,
  },
});

const story = {
  title: 'Components/ThreadCategory',
  component: ThreadCategory,
  argTypes: {
    // Tidak ada color props spesifik, kecuali Anda menambahkan props styled-nya
    // Jika ingin mengontrol warna, perlu ubah gaya styled-components agar menerima props warna
    primaryColor: { control: 'color' },
    textColor: { control: 'color' },
    activeBgColor: { control: 'color' },
    activeTextColor: { control: 'color' },
    hoverBgColor: { control: 'color' },
    hoverTextColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default story;

const Template = (args) => <ThreadCategory {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  categories: ['general', 'tech', 'news', 'fun'],
  primaryColor: 'red',
  textColor: 'white',
  activeBgColor: 'white',
  activeTextColor: 'red',
  hoverBgColor: 'white',
  hoverTextColor: 'red',
};
