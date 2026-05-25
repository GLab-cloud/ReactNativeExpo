import { registerRootComponent } from 'expo';
import App from './App';

describe('index.ts - Root Registration', () => {
  it('should export registerRootComponent properly', () => {
    expect(registerRootComponent).toBeDefined();
  });

  it('should import App component correctly', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('should be callable without errors', () => {
    // This test ensures the module can be imported
    expect(() => {
      require('./index.ts');
    }).not.toThrow();
  });
});