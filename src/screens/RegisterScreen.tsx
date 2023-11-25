import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { areAllValuesFilled } from '../utils/utils';

export interface User {
    fullName?: string;
    email: string;
    phone?: number;
    password: string;
}

export interface AuthProps {
    setAction: Dispatch<SetStateAction<string>>;
}

const initialUser: User = {
    fullName: "",
    email: "",
    phone: 0,
    password: ""
};

const RegisterScreen: FC<AuthProps> = ({ setAction }) => {
    const [user, setUser] = useState<User>(initialUser);



    const handleInputChange = (key: keyof User, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        if (user?.phone?.toString().length !== 10) {
            return Alert.alert("Phone number must be of 10 digits")
        }
        if (areAllValuesFilled(user)) {
            try {
                const payload = {
                    name: user.fullName,
                    email: user.email,
                    phone: Number(user.phone),
                    password: user.password
                }

                const response = await fetch("http://localhost:9000/api/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                })
                const data = await response.json();
                if (data === "User already exists") {
                    return Alert.alert("Email already exists")
                }
                if (data._id) {
                    Alert.alert("User created successfully ✌️")
                    setAction("")
                }
            } catch (error) {
                Alert.alert("Something went wrong. Please try again later")
            }

        } else {
            Alert.alert("Please fill all fields")
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Text style={{
                    textAlign: 'center',
                    marginVertical: 20,
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Register</Text>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: 'center',
                }}>
                    <TextInput
                        placeholder='Enter fullname'
                        style={{
                            backgroundColor: '#ddd',
                            width: "90%",
                            height: 50,
                            paddingLeft: 10,
                            borderRadius: 5,
                            marginVertical: 10
                        }}
                        onChangeText={(value) => handleInputChange("fullName", value)}
                    />
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
                        placeholder='Enter mobile '
                        style={{
                            backgroundColor: '#ddd',
                            width: "90%",
                            height: 50,
                            paddingLeft: 10,
                            borderRadius: 5,
                            marginVertical: 10
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(value) => handleInputChange("phone", value)}
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
                    <TouchableOpacity
                        style={styles.LoginButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.LoginButtonText}>Register</Text>
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
                    }}>Already have an account? <TouchableOpacity
                        onPress={() => setAction("")}
                    ><Text style={{
                        textAlign: "center",
                        fontSize: 16,
                        color: "#ff9039",
                        textDecorationLine: "underline",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>Log in</Text></TouchableOpacity></Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

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
});
