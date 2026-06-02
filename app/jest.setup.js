import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  AntDesign: () => null,
}));

// Suppress console warnings in tests
global.console.warn = jest.fn();
global.console.error = jest.fn();