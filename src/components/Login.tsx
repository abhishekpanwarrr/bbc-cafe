import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Appearance,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AuthProps, User} from '../screens/RegisterScreen';
import {areAllValuesFilled} from '../utils/utils';
import {useDispatch} from 'react-redux';
import {addUser} from '../app/user/userSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
const initialUser: User = {
  email: '',
  password: '',
};

const Login: FC<AuthProps> = ({setAction, theme}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>(initialUser);
  const handleInputChange = (key: keyof User, value: string) => {
    setUser(prevUser => ({
      ...prevUser,
      [key]: value,
    }));
  };
  const handleSubmit = async () => {
    if (areAllValuesFilled(user)) {
      try {
        const payload = {
          email: user.email,
          password: user.password,
        };

        const response = await fetch(
          'https://bbc-cafe-backend.vercel.app/api/v1/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          },
        );
        const data = await response.json();
        if (data === 'Invalid password') {
          return Alert.alert('Check your email & password');
        }
        if (data.token) {
          try {
            const storagePermissionStatus = await check(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            );

            if (storagePermissionStatus === RESULTS.GRANTED) {
              console.log('Storage permission already granted.');
            } else {
              const result = await request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.PHOTO_LIBRARY
                  : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              );

              if (result === RESULTS.GRANTED) {
                console.log('Storage permission granted.');
              } else {
                console.log('Storage permission denied.');
              }
            }
          } catch (error) {
            console.error('Error requesting storage permission:', error);
          }
          dispatch(addUser(data));
        }
      } catch (error) {
        console.log('error', error);
        Alert.alert('Something went wrong. Please try again later');
      }
    } else {
      Alert.alert('Please fill all fields');
    }
  };
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardSpace(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardSpace(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fafafa' : '#000',
          }}>
          Login{' '}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Enter email"
            style={{
              backgroundColor: '#ddd',
              width: '90%',
              height: 50,
              paddingLeft: 10,
              borderRadius: 5,
              marginVertical: 10,
            }}
            placeholderTextColor={theme === 'dark' ? '#000' : '#fff'}
            onChangeText={value => handleInputChange('email', value)}
          />
          <TextInput
            placeholder="Enter password"
            style={{
              backgroundColor: '#ddd',
              width: '90%',
              height: 50,
              paddingLeft: 10,
              borderRadius: 5,
            }}
            placeholderTextColor={theme === 'dark' ? '#000' : '#fff'}
            onChangeText={value => handleInputChange('password', value)}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.LoginButton}>
            <Text style={styles.LoginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: theme === 'dark' ? '#fafafa' : '#000',
            }}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => setAction('register')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#ff9039',
                  textDecorationLine: 'underline',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {' '}
                Sign up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButton: {
    backgroundColor: '#ff9029',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 15,
  },
  LoginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
