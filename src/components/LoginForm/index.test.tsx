
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from "./index";  
import React from 'react';


it('should render the username field', () => {
    render(<LoginForm />)
    const usernameField = screen.getByLabelText(/Username/i);
    expect(usernameField).toBeInTheDocument();
})

it('should render the password field', () => {
    render(<LoginForm />)
    const passwordField = screen.getByLabelText(/Password/i);
    expect(passwordField).toBeInTheDocument();
})

it('should render the email field', () => {
    render(<LoginForm />)
    const emailField = screen.getByLabelText(/Email/i);
    expect(emailField).toBeInTheDocument();
})

it('should render the login button', () => {
    render(<LoginForm />)
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
})

it('should update the username field', () => {
    render(<LoginForm />)
    const usernameField = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameField, { target: { value: 'testuser' } });
    expect(usernameField).toHaveValue('testuser');
})

it('should update the password field', () => {
    render(<LoginForm />)
    const passwordField = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordField, { target: { value: 'testpassword' } });
    expect(passwordField).toHaveValue('testpassword');
})

it('should update the email field', () => {
    render(<LoginForm />)
    const emailField = screen.getByLabelText(/Email/i);
    fireEvent.change(emailField, { target: { value: 'testemail' } });
    expect(emailField).toHaveValue('testemail');
})

it('should submit the form', () => {
    render(<LoginForm />)
    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const emailField = screen.getByLabelText(/Email/i);
    const loginButton = screen.getByText(/Login/i);
    fireEvent.change(usernameField, { target: { value: 'testuser' } });
    fireEvent.change(passwordField, { target: { value: 'testpassword' } });
    fireEvent.change(emailField, { target: { value: 'testemail' } });
    fireEvent.click(loginButton);
    expect(usernameField).toHaveValue('');
    expect(passwordField).toHaveValue('');
    expect(emailField).toHaveValue('');
})

