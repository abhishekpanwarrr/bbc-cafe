import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCoffeeScreen from './AddCoffeeScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCoffee, faList } from '@fortawesome/free-solid-svg-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoffeeList from './CoffeeListScreen';

const Tab = createMaterialTopTabNavigator();

const StoreScreen = () => {
    return (

        <SafeAreaView style={{
            flex: 1
        }}>
            <Tab.Navigator
                initialRouteName="AddCoffee"
                screenOptions={{
                    tabBarActiveTintColor: '#ff9029',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        borderBottomColor: "#eee",
                        borderBottomWidth: 2
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#ff9029"
                    }
                }}
            >
                <Tab.Screen
                    name="AddCoffee"
                    component={AddCoffeeScreen}
                    options={{
                        tabBarLabel: 'Add Coffee',
                        tabBarLabelStyle: {
                            color: '#444',
                            fontWeight: "700"
                        },
                        tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faCoffee} size={25} color={focused ? '#ff9029' : "#444"} />
                    }}
                />
                <Tab.Screen
                    name="CoffeeList"
                    component={CoffeeList}
                    options={{
                        tabBarLabel: 'Coffee List',
                        tabBarLabelStyle: {
                            color: '#222',
                            fontWeight: "700"
                        },
                        tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faList} size={25} color={focused ? '#ff9029' : "#444"} />
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default StoreScreen

const styles = StyleSheet.create({})