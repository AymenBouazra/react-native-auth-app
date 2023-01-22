import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { authentication } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()
    const handleSignOut = () => {
        authentication.signOut()
            .then(() => {
                navigation.navigate('Login')
            })
            .catch(() => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email: {authentication.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}>
                <Text
                    style={styles.buttonText}
                >Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#3c4b64'
    },
    text: {
        color: 'white'
    },
    button: {
        backgroundColor: '#0782f9',
        marginTop: 40,
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})