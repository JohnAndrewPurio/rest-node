import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.existtribe.restnode',
  appName: 'REST Node',
  webDir: 'build',
  plugins: {
    SplashScreen: {
      androidScaleType: 'CENTER_CROP',
      launchShowDuration: 1000,
    },
  },
};

export default config;
