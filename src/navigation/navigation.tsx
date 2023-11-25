import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
  faHome,
  faShoppingBasket,
  faStore,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StoreScreen from '../screens/StoreScreens/StoreScreen';

const Tab = createBottomTabNavigator();
const Navigation = () => {
  const {user} = useSelector((state: any) => state.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Home') {
              return (
                <FontAwesomeIcon icon={faHome} size={size} color={color} />
              );
            } else if (route.name === 'Favourite') {
              return (
                <FontAwesomeIcon icon={faHeart} size={size} color={color} />
              );
            } else if (route.name === 'Profile') {
              return (
                <FontAwesomeIcon icon={faUser} size={size} color={color} />
              );
            } else if (route.name === 'Cart') {
              return (
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Store') {
              return (
                <FontAwesomeIcon icon={faStore} size={size} color={color} />
              );
            }
          },
          tabBarActiveTintColor: '#ff9029',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        {user && user.isAdmin ? (
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favourite" component={FavouriteScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Store" component={StoreScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favourite" component={FavouriteScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
