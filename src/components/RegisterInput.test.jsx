/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';



describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>,
    );

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'nametest');
    expect(nameInput).toHaveValue('nametest');
  });

  it('should handle email typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>,
    );

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'email@test.com');
    expect(emailInput).toHaveValue('email@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>,
    );

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();

    render(
      <MemoryRouter>
        <RegisterInput register={mockRegister} />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByPlaceholderText('Name'), 'Test Name');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Test Name',
      email: 'test@mail.com',
      password: 'password123',
    });
  });
});