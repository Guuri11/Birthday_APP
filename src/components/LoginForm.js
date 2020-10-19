import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const {changeForm} = props;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [formError, setFormError] = useState({})

    const login = () => {
        let errors = {};


        if (!formData.email || !formData.password ) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        }else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else {
             console.log(formData);

            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .catch(e => {
                setFormError({
                    email: true,
                    password: true
                })
            })
         }

        setFormError(errors);
    }


    return (
        <>
            <TextInput placeholder="Email"
            placeholderTextColor="#969696"
            style={[styles.input, formError.email && styles.errorInput]} onChange={e => setFormData({...formData, email:e.nativeEvent.text})} />

            <TextInput placeholder="Contraseña"
            placeholderTextColor="#969696"
            secureTextEntry={true}
            style={[styles.input, formError.password && styles.errorInput]}
            onChange={e => setFormData({...formData, password:e.nativeEvent.text})}/>

            <TouchableOpacity onPress={e => login()}>
                <Text style={styles.btnText} >Iniciar sesión</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={e => changeForm()}>
                    <Text style={styles.btnText} >Registrarse</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: "#fff",
        fontSize: 18,
    },
    input: {
        height: 40,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"

    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 15
    },
    errorInput: {
        borderColor: "#940c0c",
    }
})
