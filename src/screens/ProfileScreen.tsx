import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {
  faCreditCard,
  faEnvelope,
  faGears,
  faHeadset,
  faLocationPinLock,
  faPhone,
  faRightFromBracket,
  faShareAlt,
  faStoreAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Appearance,
  Alert,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Login from '../components/Login';
import RegisterScreen from './RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../app/user/userSlice';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const {user} = useSelector((state: any) => state.user);
  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (e) {}
  };
  const [theme, setTheme] = useState<string | null | undefined>(null);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme);
  }, []);
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
      ]}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        {user?.token ? (
          <View>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image
                  source={require('../assets/avatar.png')}
                  size={80}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                />
                <View style={{marginLeft: 20}}>
                  <Title
                    style={[
                      styles.title,
                      {
                        marginTop: 15,
                        marginBottom: 5,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {/* Abhishek Panwar */}
                    {user?.fullName}
                  </Title>
                  <Caption style={styles.caption}>@{user.phone}</Caption>
                </View>
              </View>
            </View>

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  color="#777777"
                  size={20}
                  icon={faLocationPinLock}
                />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  Gurugram, India
                </Text>
              </View>
              <View style={styles.row}>
                <FontAwesomeIcon color="#777777" size={20} icon={faPhone} />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  +91-{user.phone}
                </Text>
              </View>
              <View style={styles.row}>
                <FontAwesomeIcon color="#777777" size={20} icon={faEnvelope} />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  {user.email}
                </Text>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                  },
                ]}>
                <Title>₹ 140.50</Title>
                <Caption>Wallet</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>12</Title>
                <Caption>Orders</Caption>
              </View>
            </View>

            <View style={styles.menuWrapper}>
              {user?.isAdmin && (
                <TouchableRipple onPress={() => navigation.navigate('Store')}>
                  <View style={styles.menuItem}>
                    <FontAwesomeIcon
                      color="#FF6347"
                      size={20}
                      icon={faStoreAlt}
                    />
                    <Text style={styles.menuItemText}>Your Store</Text>
                  </View>
                </TouchableRipple>
              )}
              <TouchableRipple onPress={() => navigation.navigate('Favourite')}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon color="#FF6347" size={20} icon={faHeart} />
                  <Text style={styles.menuItemText}>Your Favorites</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon
                    color="#FF6347"
                    size={20}
                    icon={faCreditCard}
                  />
                  <Text style={styles.menuItemText}>Payment</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon
                    color="#FF6347"
                    size={20}
                    icon={faShareAlt}
                  />
                  <Text style={styles.menuItemText}>Tell Your Friends</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon color="#FF6347" size={20} icon={faHeadset} />
                  <Text style={styles.menuItemText}>Support</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon color="#FF6347" size={20} icon={faGears} />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={handleLogout}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon
                    color="#FF6347"
                    size={20}
                    icon={faRightFromBracket}
                  />
                  <Text style={styles.menuItemText}>Logout</Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        ) : (
          <>
            {action ? (
              <RegisterScreen theme={theme} setAction={setAction} />
            ) : (
              <Login theme={theme} setAction={setAction} />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
