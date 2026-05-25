import {
  render,
  fireEvent,
  screen,
  within,
} from '@testing-library/react-native';
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

describe('FlatList Integration Tests', () => {
  const testData = [
    { id: 1, name: 'GLab', age: 18 },
    { id: 2, name: 'GLab1', age: 19 },
    { id: 3, name: 'GLab2', age: 20 },
  ];

  const TestComponent = ({ data = testData }) => (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ padding: 30, backgroundColor: 'blue', marginBottom: 30 }}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  describe('Rendering', () => {
    it('should render FlatList with test data', () => {
      const { getByText } = render(<TestComponent />);
      
      expect(getByText('GLab')).toBeTruthy();
      expect(getByText('GLab1')).toBeTruthy();
      expect(getByText('GLab2')).toBeTruthy();
    });

    it('should render all items in data array', () => {
      const { getAllByText } = render(<TestComponent data={testData} />);
      
      const items = getAllByText(/GLab/);
      expect(items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Performance', () => {
    it('should handle large lists without errors', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Student${i}`,
        age: 18 + (i % 4),
      }));

      expect(() => {
        render(<TestComponent data={largeData} />);
      }).not.toThrow();
    });
  });

  describe('Empty State', () => {
    it('should render gracefully with empty data', () => {
      const { container } = render(<TestComponent data={[]} />);
      expect(container).toBeTruthy();
    });
  });
});