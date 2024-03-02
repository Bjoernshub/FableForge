// LoginScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

describe('LoginScreen', () => {
  it('should display the email input field', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('allows entering email', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('allows entering a password', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'mypassword');
    expect(passwordInput.props.value).toBe('mypassword');
  });

  it('navigates to the register screen when the register button is pressed', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    const registerButton = getByText("Don't have an account? Register");
    fireEvent.press(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

});
