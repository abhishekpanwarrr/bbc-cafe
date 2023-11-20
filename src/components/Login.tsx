import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { FC, useState } from 'react'
import { AuthProps, User } from '../screens/RegisterScreen'
import { areAllValuesFilled } from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialUser: User = {
    email: "",
    password: ""
};
const storeData = async (value:object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('bbc_user', jsonValue);
    } catch (e:any) {
      // saving error
      Alert.alert("error in saving user", e)
    }
  };

const Login: FC<AuthProps> = ({ setAction, setIsUser }) => {
    const [user, setUser] = useState<User>(initialUser)
    const handleInputChange = (key: keyof User, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: value,
        }));
    };
    const handleSubmit = async () => {
        if (areAllValuesFilled(user)) {
            try {
                const payload = {
                    email: user.email,
                    password: user.password
                }
                console.log("payload", payload);

                const response = await fetch("http://localhost:9000/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                })
                const data = await response.json();
                console.log("data", data);
                if (data === "Invalid password") {
                    return Alert.alert("Check your email & password");
                }
                if (data.token) {
                    storeData(data)
                    setIsUser((prev) => !prev)
                }
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
        <View>
            <Text style={{
                textAlign: 'center',
                marginVertical: 20,
                fontSize: 20,
                fontWeight: "bold"
            }}>Login </Text>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center',
            }}>
                <TextInput
                    placeholder='Enter email'
                    style={{
                        backgroundColor: '#ddd',
                        width: "90%",
                        height: 50,
                        paddingLeft: 10,
                        borderRadius: 5,
                        marginVertical: 10
                    }}
                    onChangeText={(value) => handleInputChange("email", value)}
                />
                <TextInput
                    placeholder='Enter password'
                    style={{
                        backgroundColor: '#ddd',
                        width: "90%",
                        height: 50,
                        paddingLeft: 10,
                        borderRadius: 5
                    }}
                    onChangeText={(value) => handleInputChange("password", value)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.LoginButton}>
                    <Text style={styles.LoginButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 16
                }}>Don't have an account? <TouchableOpacity
                    onPress={() => setAction("register")}
                ><Text style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "#ff9039",
                    textDecorationLine: "underline",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}> Sign up</Text></TouchableOpacity></Text>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginButton: {
        backgroundColor: '#ff9029',
        width: "90%",
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 15
    },
    LoginButtonText: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    }
})