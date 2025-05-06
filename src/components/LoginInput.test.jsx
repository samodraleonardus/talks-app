// /**
//  * skenario testing
//  *
//  * - LoginInput component
//  *   - should handle email typing correctly
//  *   - should handle password typing correctly
//  *   - should call Login function when login button is clicked
//  */

// import React from 'react';
// import { describe, it, expect, afterEach, vi } from 'vitest';
// import { render, screen, cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import matchers from '@testing-library/jest-dom/matchers';
// import { MemoryRouter } from 'react-router-dom'; // ✅ Tambahkan ini
// import LoginInput from './LoginInput';

// expect.extend(matchers);

// describe('LoginInput component', () => {
//   afterEach(() => {
//     cleanup();
//   });

//   const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>); // ✅ Helper function

//   it('should handle email typing correctly', async () => {
//     renderWithRouter(<LoginInput Login={() => {}} />);
//     const emailInput = await screen.getByPlaceholderText('Email');

//     await userEvent.type(emailInput, 'email@example.com');

//     expect(emailInput).toHaveValue('email@example.com');
//   });

//   it('should handle password typing correctly', async () => {
//     renderWithRouter(<LoginInput Login={() => {}} />);
//     const passwordInput = await screen.getByPlaceholderText('Password');

//     await userEvent.type(passwordInput, 'password123');

//     expect(passwordInput).toHaveValue('password123');
//   });

//   it('should call Login function when login button is clicked', async () => {
//     const mockLogin = vi.fn();
//     renderWithRouter(<LoginInput Login={mockLogin} />);

//     const emailInput = await screen.getByPlaceholderText('Email');
//     const passwordInput = await screen.getByPlaceholderText('Password');
//     const loginButton = await screen.getByRole('button', { name: /login/i });

//     await userEvent.type(emailInput, 'email@example.com');
//     await userEvent.type(passwordInput, 'password123');
//     await userEvent.click(loginButton);

//     expect(mockLogin).toHaveBeenCalledWith({
//       email: 'email@example.com',
//       password: 'password123',
//     });
//   });
// });


/**
 * Skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call Login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './LoginInput';

// Tidak perlu expect.extend(matchers) jika setup benar

describe('LoginInput component', () => {
  afterEach(cleanup);

  const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

  it('should handle email typing correctly', async () => {
    renderWithRouter(<LoginInput Login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'email@example.com');

    expect(emailInput).toHaveValue('email@example.com');
  });

  it('should handle password typing correctly', async () => {
    renderWithRouter(<LoginInput Login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call Login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    renderWithRouter(<LoginInput Login={mockLogin} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'email@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: 'password123',
    });
  });
});