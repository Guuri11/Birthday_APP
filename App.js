import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet, StatusBar} from 'react-native';
import firebase from "./src/utils/firebase";
import Auth from "./src/components/Auth";
import "firebase/auth";

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
      {user ? <Text>Estás logueado</Text> : <Auth/>}
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