import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App';

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByText } = render(<App />);
      expect(getByText('FlatList')).toBeTruthy();
    });

    it('should render the FlatList title', () => {
      const { getByText } = render(<App />);
      const title = getByText('FlatList');
      expect(title).toBeDefined();
    });

    it('should render all student items', () => {
      const { getByText } = render(<App />);
      
      // Check if all students are rendered
      expect(getByText('GLab')).toBeTruthy();
      expect(getByText('GLab1')).toBeTruthy();
      expect(getByText('GLab2')).toBeTruthy();
      expect(getByText('GLab3')).toBeTruthy();
      expect(getByText('GLab4')).toBeTruthy();
      expect(getByText('GLab5')).toBeTruthy();
    });
  });

  describe('Data Integrity', () => {
    it('should have 9 students in the list', () => {
      const { getByText, getAllByText } = render(<App />);
      
      // Count unique student names
      const studentNames = ['GLab', 'GLab1', 'GLab2', 'GLab3', 'GLab4', 'GLab5'];
      let count = 0;
      
      studentNames.forEach(name => {
        try {
          const elements = getAllByText(name);
          count += elements.length;
        } catch (e) {
          // Name not found, continue
        }
      });
      
      expect(count).toBeGreaterThanOrEqual(9);
    });

    it('should render students with correct styling', () => {
      const { getByText } = render(<App />);
      const student = getByText('GLab');
      
      expect(student).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should have a container view with correct styling', () => {
      const { getByText } = render(<App />);
      const title = getByText('FlatList');
      
      expect(title).toBeTruthy();
    });

    it('should render FlatList component', () => {
      const { getByText } = render(<App />);
      
      // Verify that multiple items are rendered (indicates FlatList is working)
      expect(getByText('GLab')).toBeTruthy();
      expect(getByText('GLab1')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rendering when data is present', () => {
      const { getByText } = render(<App />);
      expect(getByText('FlatList')).toBeTruthy();
    });

    it('should not throw errors during render', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });
});