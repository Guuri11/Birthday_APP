import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function RegisterForm(props) {

    const {changeForm} = props;

    return (
        <View>
            <Text>Register Form</Text>
            <TouchableOpacity onPress={e => changeForm()}>
                <Text style={styles.btnText} >Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: "#fff",
        fontSize: 18,
    }
})
