
var environments = {
    staging: {
      FIREBASE_API_KEY: 'AIzaSyAnyrQI1VlCRAUWF8Jy3MT8JdFEZGJF95M',
      FIREBASE_AUTH_DOMAIN: 'nwhacks-e8841.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://nwhacks-e8841.firebaseio.com',
      FIREBASE_PROJECT_ID: 'nwhacks-e8841',
      FIREBASE_STORAGE_BUCKET: 'nwhacks-e8841.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '130353463524',
      GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyCMMZTTiKb8Gkq4QNkDIs8epDCaBQ_J67Q'
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  
  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return 'staging';
    } else if (releaseChannel === 'staging') {
      return 'staging';
    } else {
      return 'staging';
    }
  }
  function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());

export default Environment;