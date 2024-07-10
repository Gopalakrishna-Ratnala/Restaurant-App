
import App from './App';
import { render, screen } from '@testing-library/react';
import React from 'react';

test('should render the login form', () => {
    render(<App />)
    const loginForm = screen.getByText(/Username/i);
    expect(loginForm).toBeInTheDocument();
})