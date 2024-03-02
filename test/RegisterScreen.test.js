// RegisterScreen.test.js
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';

// Mock the navigation prop to test navigation functionality
const mockNavigation = {
  goBack: jest.fn(),
};

describe('RegisterScreen', () => {
  it('allows a user to enter email, password, and confirm password', () => {
    const { getByPlaceholderText } = render(<RegisterScreen navigation={mockNavigation} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmPasswordInput.props.value).toBe('password123');
  });


  it('navigates back when the login button is pressed', () => {
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    const loginButton = getByText('Already have an account? Login');
    fireEvent.press(loginButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
