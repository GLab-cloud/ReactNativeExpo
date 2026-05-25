import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

// Mock React Native modules
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  StyleSheet: {
    create: (styles) => styles,
  },
}));

// Suppress console warnings in tests
global.console.warn = jest.fn();
global.console.error = jest.fn();