/**
 * TypeScript Configuration Tests
 * Verify that the TypeScript configuration is correctly set up
 */

describe('TypeScript Configuration', () => {
  it('should have strict mode enabled', () => {
    // This ensures type safety is enforced
    const tsConfig = require('./tsconfig.json');
    expect(tsConfig.compilerOptions.strict).toBe(true);
  });

  it('should extend expo base config', () => {
    const tsConfig = require('./tsconfig.json');
    expect(tsConfig.extends).toBe('expo/tsconfig.base');
  });

  it('should parse tsconfig without errors', () => {
    expect(() => {
      require('./tsconfig.json');
    }).not.toThrow();
  });
});