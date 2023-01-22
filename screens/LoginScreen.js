import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authentication } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignUp = () => {
        createUserWithEmailAndPassword(authentication, email, password).then(userCredentials => {
            const user = userCredentials.user;
            alert('Successfully registered')
            console.log(user.email);
        })
            .catch(error => alert(error.message))
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(authentication, email, password).then(userCredentials => {
            const user = userCredentials.user;
            navigation.navigate('Home')
            console.log(user.email);
            setIsSignedIn(true)
        })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if (user) {
                if (isSignedIn) {
                    navigation.navigate('Home')
                }
            }
        })
        return unsubscribe
    }, [])
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
                {isSignedIn ? <Text style={styles.text}>You are logged in</Text> : null}
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#3c4b64'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5

    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16
    },
    text: {
        color: 'white'
    },
})