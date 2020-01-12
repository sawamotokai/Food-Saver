import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DummyWrapper from './components/DummyWrapper';


export default function App() {
  return (
    <View style={styles.container}>

      <DummyWrapper>
      </DummyWrapper>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//wrapper component holds the "edit" state 
//passed as a prop to both table and header
//wrapper holds the function to modify edit
//Custom Header will take as a prop on 