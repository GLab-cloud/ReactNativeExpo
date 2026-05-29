import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByText } = render(<App />);
      expect(getByText('ToDo App')).toBeTruthy();
    });

    it('should render the title', () => {
      const { getByText } = render(<App />);
      const title = getByText('ToDo App');
      expect(title).toBeDefined();
    });

    it('should render the ADD TODO button', () => {
      const { getByText } = render(<App />);
      expect(getByText('ADD TODO')).toBeTruthy();
    });
  });

  describe('Input', () => {
    it('should have a TextInput for entering todos', () => {
      const { getByDisplayValue } = render(<App />);
      const input = getByDisplayValue('');
      expect(input).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should not throw errors during render', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });
});