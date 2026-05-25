/**
 * App Configuration Tests
 * Verify that app.json is correctly structured
 */

describe('App Configuration (app.json)', () => {
  const appConfig = require('./app.json');

  describe('Expo Config Structure', () => {
    it('should have expo configuration object', () => {
      expect(appConfig.expo).toBeDefined();
    });

    it('should have required app properties', () => {
      const { expo } = appConfig;
      expect(expo.name).toBe('app');
      expect(expo.slug).toBe('app');
      expect(expo.version).toBe('1.0.0');
    });

    it('should have orientation set to portrait', () => {
      expect(appConfig.expo.orientation).toBe('portrait');
    });

    it('should have new arch enabled', () => {
      expect(appConfig.expo.newArchEnabled).toBe(true);
    });
  });

  describe('Platform Configurations', () => {
    it('should have iOS configuration', () => {
      expect(appConfig.expo.ios).toBeDefined();
      expect(appConfig.expo.ios.supportsTablet).toBe(true);
    });

    it('should have Android configuration', () => {
      expect(appConfig.expo.android).toBeDefined();
      expect(appConfig.expo.android.adaptiveIcon).toBeDefined();
      expect(appConfig.expo.android.edgeToEdgeEnabled).toBe(true);
    });

    it('should have Web configuration', () => {
      expect(appConfig.expo.web).toBeDefined();
      expect(appConfig.expo.web.favicon).toBeDefined();
    });
  });

  describe('Splash Screen', () => {
    it('should have splash configuration', () => {
      const { splash } = appConfig.expo;
      expect(splash).toBeDefined();
      expect(splash.resizeMode).toBe('contain');
      expect(splash.backgroundColor).toBe('#ffffff');
    });
  });

  describe('User Interface', () => {
    it('should have UI style set to light', () => {
      expect(appConfig.expo.userInterfaceStyle).toBe('light');
    });
  });
});