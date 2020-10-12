import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function LoginForm(props) {

    const {changeForm} = props;

    return (
        <View>
            <Text>Login</Text>
            <TouchableOpacity onPress={e => changeForm()}>
                <Text style={styles.btnText} >Registrarte</Text>
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
