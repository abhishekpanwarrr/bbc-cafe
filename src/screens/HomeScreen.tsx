import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenMain from './HomeScreenContainer/HomeScreenMain';
import DetailScreen from './HomeScreenContainer/DetailScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeScreenMain" component={HomeScreenMain} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})