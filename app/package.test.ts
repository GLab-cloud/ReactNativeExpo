/**
 * Package.json Validation Tests
 * Verify dependencies, scripts, and configuration
 */

describe('Package.json Validation', () => {
  const packageJson = require('./package.json');

  describe('Project Metadata', () => {
    it('should have correct name', () => {
      expect(packageJson.name).toBe('app');
    });

    it('should have version', () => {
      expect(packageJson.version).toBe('1.0.0');
    });

    it('should have main entry point', () => {
      expect(packageJson.main).toBe('index.ts');
    });

    it('should be private', () => {
      expect(packageJson.private).toBe(true);
    });
  });

  describe('Scripts', () => {
    it('should have required npm scripts', () => {
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.start).toBeDefined();
      expect(packageJson.scripts.test).toBeDefined();
      expect(packageJson.scripts.lint).toBeDefined();
    });

    it('should have start script', () => {
      expect(packageJson.scripts.start).toBe('expo start');
    });

    it('should have test script', () => {
      expect(packageJson.scripts.test).toContain('jest');
    });

    it('should have platform-specific commands', () => {
      expect(packageJson.scripts.ios).toBeDefined();
      expect(packageJson.scripts.android).toBeDefined();
      expect(packageJson.scripts.web).toBeDefined();
    });
  });

  describe('Dependencies', () => {
    it('should have React Native dependencies', () => {
      expect(packageJson.dependencies['react-native']).toBeDefined();
      expect(packageJson.dependencies['expo']).toBeDefined();
      expect(packageJson.dependencies['react']).toBeDefined();
    });

    it('should have correct React version', () => {
      expect(packageJson.dependencies.react).toBe('19.1.0');
    });

    it('should have expo-status-bar', () => {
      expect(packageJson.dependencies['expo-status-bar']).toBeDefined();
    });

    it('should have opencode-ai dependency', () => {
      expect(packageJson.dependencies['opencode-ai']).toBeDefined();
    });
  });

  describe('DevDependencies', () => {
    it('should have TypeScript dev dependency', () => {
      expect(packageJson.devDependencies.typescript).toBeDefined();
    });

    it('should have React types', () => {
      expect(packageJson.devDependencies['@types/react']).toBeDefined();
    });

    it('should have Jest for testing', () => {
      expect(packageJson.devDependencies.jest).toBeDefined();
    });

    it('should have React Testing Library', () => {
      expect(packageJson.devDependencies['@testing-library/react-native']).toBeDefined();
    });

    it('should have Jest Native utilities', () => {
      expect(packageJson.devDependencies['@testing-library/jest-native']).toBeDefined();
    });
  });

  describe('Version Compatibility', () => {
    it('should use compatible versions', () => {
      const deps = packageJson.dependencies;
      expect(deps.react).toBe('19.1.0');
      expect(deps['react-native']).toBeDefined();
    });
  });
});