import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faShoppingBasket, faHeart, faUser, faStore } from '@fortawesome/free-solid-svg-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { store } from './src/app/store'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreScreen from './src/screens/StoreScreens/StoreScreen';
const Tab = createBottomTabNavigator();

function App() {

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: 0,
    token: "",
    isAdmin: false
  })
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('bbc_user');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);

      } catch (e: any) {
        console.log("e", e);
      }
    };
    getData()
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') {
                return <FontAwesomeIcon icon={faHome} size={size} color={color} />
              }
              else if (route.name === 'Favourite') {
                return <FontAwesomeIcon icon={faHeart} size={size} color={color} />;
              }
              else if (route.name === 'Profile') {
                return <FontAwesomeIcon icon={faUser} size={size} color={color} />;
              }
              else if (route.name === 'Cart') {
                return <FontAwesomeIcon icon={faShoppingBasket} size={size} color={color} />;
              }
              else if (route.name === 'Store') {
                return <FontAwesomeIcon icon={faStore} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: '#ff9029',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
        >{user && user.isAdmin ? <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favourite" component={FavouriteScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Store" component={StoreScreen} />
        </> : <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favourite" component={FavouriteScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
