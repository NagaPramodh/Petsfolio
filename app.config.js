export default {
  expo: {
    name: "fbphoneAuth",
    slug: "fbphoneAuth",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "relatedtoanysample.sampleapp",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
  extra: {
    extra: {
      eas: {
        projectId: "0ae8f188-4f98-4054-9508-15194152d68d",
      },
    },
    firebaseApiKey: "AIzaSyBpbtY2abEebs4loD31MSyASI_KIR81gPY",
    firebaseAuthDomain: "infasta-85e53.firebaseapp.com",
    firebaseProjectId: "infasta-85e53",
    firebaseStorageBucket: "infasta-85e53.appspot.com",
    firebaseMessagingSenderId: "90786779043",
    firebaseAppId: "1:90786779043:web:4c3cbe6f68e8ecfea31416",
  },
};
