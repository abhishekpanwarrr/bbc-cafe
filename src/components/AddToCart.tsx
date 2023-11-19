import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { DataProps } from '../screens/HomeScreenContainer/DetailScreen'
import { useDispatch } from 'react-redux'
import { addToCart } from '../app/cartSlice'
import { useNavigation } from '@react-navigation/native'

interface AddToCartProps {
    data: DataProps
    tabBarHeight: any
    quantity: number
}
const AddToCart: FC<AddToCartProps> = ({ data, tabBarHeight, quantity }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const handleAddToCart = () => {
        try {
            dispatch(addToCart({ ...data, quantity }));
            Alert.alert("Added in cart");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Something went wrong")
        }
    }
    return (
        <TouchableOpacity
            onPress={handleAddToCart}
            style={{
                backgroundColor: '#000',
                height: 60,
                borderRadius: 15,
                flex: 1,
                alignItems: 'center',
                justifyContent: "space-between",
                flexDirection: 'row',
                paddingHorizontal: 30,
                gap: 10,
                position: 'absolute',
                width: "90%",
                marginHorizontal: "5%",
                bottom: 10
            }}
        >
            <FontAwesomeIcon icon={faBagShopping} color='#fff' size={18} />
            <Text style={{ color: "#fff", fontSize: 16 }}>Add To bag</Text>
        </TouchableOpacity>
    )
}

export default AddToCart

const styles = StyleSheet.create({})