import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { areAllValuesFilled } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'

export interface Coffee {
    _id:string
    name: string
    description: string
    ingredients: string
    special_ingredients: string
    roasted: string
    size: string
    price: string
    imagelink_square: string
}
const AddCoffeeScreen = () => {
    const navigation = useNavigation()
    const [coffee, setCoffee] = useState({
        name: "",
        description: "",
        ingredients: "",
        special_ingredients: "",
        roasted: "",
        size: "",
        price: "",
        imagelink_square: "",
    })
    const handleInputChange = (key: keyof Coffee, value: string) => {
        setCoffee((prevCoffee) => ({
            ...prevCoffee,
            [key]: value,
        }));
    };
    const handleSubmit = async () => {
        if (coffee.name &&
            coffee.description &&
            coffee.ingredients &&
            coffee.special_ingredients &&
            coffee.roasted &&
            coffee.size &&
            coffee.price ||
            coffee.imagelink_square) {
            try {
                const payload = {
                    name: coffee.name,
                    description: coffee.description,
                    ingredients: coffee.ingredients,
                    special_ingredients: coffee.special_ingredients,
                    roasted: coffee.roasted,
                    size: coffee.size,
                    price: coffee.price,
                    imagelink_square: "",
                }
                const response = await fetch("http://localhost:9000/api/v1/coffee/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                })
                const data = await response.json();
                if (data._id) {
                    Alert.alert("Coffee added")
                    navigation.navigate("Profile")
                }
                console.log("data", data);
            } catch (error) {
                console.log("error", error);
                Alert.alert("Something went wrong. Please try again later")
            }
        } else {
            Alert.alert("Please fill all fields")
            console.log("Please fill in all values");
        }
    };
    return (
        <ScrollView style={{
            flex: 1,
            paddingTop: 20
        }}>
            <TextInput
                autoFocus
                placeholder='Coffee Name'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("name", value)}
            />
            <TextInput
                placeholder='Description'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("description", value)}
            />
            <TextInput
                placeholder='Roasted or not'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("roasted", value)}
            />
            <TextInput
                placeholder='Ingredients'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("ingredients", value)}
            />
            <TextInput
                placeholder='Special Ingredients'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("special_ingredients", value)}
            />
            <TextInput
                placeholder='Size ex. (S,M,L)'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("size", value)}
            />
            <TextInput
                placeholder='Price ex. (90,120,140)'
                placeholderTextColor={"#000"}
                style={styles.TextInput}
                onChangeText={(value) => handleInputChange("price", value)}
            />
            <TouchableOpacity style={styles.AddButton} onPress={handleSubmit}>
                <FontAwesomeIcon icon={faMugSaucer} size={22} color='#fff' />
                <Text style={styles.AddButtonText}>Add coffee</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddCoffeeScreen

const styles = StyleSheet.create({
    AddButtonText: {
        color: "#fff",
        fontSize: 18,
    },
    AddButton: {
        width: "90%",
        margin: "5%",
        backgroundColor: "#ff9029",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        gap: 10
    },
    TextInput: {
        width: "90%",
        marginHorizontal: "5%",
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 40,
        paddingLeft: 10,
        color: "#000",
        marginBottom: 10
    }
})