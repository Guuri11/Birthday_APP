import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, YellowBox } from 'react-native';
import _ from 'lodash';

import {decode, encode} from 'base-64'
import firebase from "./src/utils/firebase";
import Auth from "./src/components/Auth";
import "firebase/auth";
import ListBirthday from './src/components/ListBirthday';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  
  const [user, setUser] = useState(undefined);

  useEffect(() => {

    // detectar si el estado del usuario ha cambiado
    firebase.auth().onAuthStateChanged( (response) => {
      setUser(response);
    } )
  }, [])
  
  if (user === undefined) return null;

  return (
    <>
    {/* edit devide top bar */}
    <StatusBar backgroundColor={styles.background.backgroundColor} />
    <SafeAreaView style={styles.background} >
      {user ? 
      <ListBirthday user={user}/>
      : <Auth/>}
    </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%"
  }
})