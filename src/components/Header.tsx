import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { useNavigation } from '@react-navigation/native'
const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.Container}>
            <FontAwesomeIcon icon={faBars} size={25} color='#ff9029' />
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image source={require("../assets/avatar.png")}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    Container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    }
})