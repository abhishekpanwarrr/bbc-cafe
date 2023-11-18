import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

const AddToCart = () => {
    return (
        <TouchableOpacity style={{
            backgroundColor: '#000',
            width: '100%',
            height: 60,
            borderRadius: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            marginTop: 20
        }}>
            <FontAwesomeIcon icon={faBagShopping} color='#fff' size={18} />
            <Text style={{ color: "#fff", fontSize: 16 }}>Add To bag</Text>
        </TouchableOpacity>
    )
}

export default AddToCart

const styles = StyleSheet.create({})