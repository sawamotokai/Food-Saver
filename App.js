import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as imagePicker from 'expo-image-picker';

import uuid from 'uuid';
import Environment from './config/environment'
import firebase from './config/firebase';

console.disableYellowBox = true;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Take a photo of your grocery receipt to keep track of when your food goes bad!</Text>
      <Button
        title="Take photo"
        onPress={() => takePhoto()}>
      </Button>
    </View>
  );
}

async function takePhoto() {
  let photo = await imagePicker.launchCameraAsync({
    allowEditing: true,
    aspect: [4,3]
  });

  uploadPhoto(photo);
};

async function uploadPhoto(res) {
  if (!res.cancelled) {
    try {
      console.log('uploading photo');
      uploadUrl = await uploadImageAsync(res.uri);
      console.log(uploadUrl);
      sendToGoogle(uploadUrl);
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log('did not get back a photo');
  }
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  const url = await snapshot.ref.getDownloadURL();
  console.log(url);

  return url;
}

async function sendToGoogle(url) {
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: 'TEXT_DETECTION'},
            // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          ],
          image: {
            source: {
              imageUri: url
            }
          }
        }
      ]
    });
    console.log('sending phtoo to googe');
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        Environment['GOOGLE_CLOUD_VISION_API_KEY'] + '&fields=responses.fullTextAnnotation.text',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
      }
    );
    let responseJson = await response.json();
    console.log(responseJson);
    console.log(responseJson.responses[0].fullTextAnnotation.text.split('\n'));
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

//wrapper component holds the "edit" state 
//passed as a prop to both table and header
//wrapper holds the function to modify edit
//Custom Header will take as a prop on 