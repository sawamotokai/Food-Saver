import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions'
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';

/*
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAnyrQI1VlCRAUWF8Jy3MT8JdFEZGJF95M",
  authDomain: "nwhacks-e8841.firebaseapp.com",
  databaseURL: "https://nwhacks-e8841.firebaseio.com",
  projectId: "nwhacks-e8841",
  storageBucket: "nwhacks-e8841.appspot.com",
  messagingSenderId: "130353463524",
  appId: "1:130353463524:web:86db7a2c91d49851cc2cf1",
  measurementId: "G-HFSCYR506G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/

/*
let serviceAccount = require('./config/nwhacks-e8841-firebase-adminsdk-4a6ho-f9ddac3d91.json');
let admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nwhacks-e8841.firebaseio.com"
});
*/

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
    Permissions.askAsync(Permissions.CAMERA_ROLL), //unsure if this will be fine for ios
    Permissions.askAsync(Permissions.CAMERA),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
