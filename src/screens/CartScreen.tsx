import {
  faClose,
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartTotalPrice} from '../app/totalCartPrice';
import {
  emptyCart,
  increaseQuantity,
  minusQuantity,
  selectTotalQuantity,
} from '../app/cartSlice';
import LottieView from 'lottie-react-native';
import {useStripe} from '@stripe/stripe-react-native';

const CartScreen = () => {
  const {cart} = useSelector((state: any) => state.cart);
  const tabBarHeight = useBottomTabBarHeight();
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCartPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const handleCartEmpty = () => dispatch(emptyCart());

  const onCheckout = async () => {
    const response = await fetch(
      'https://bbc-cafe-backend.vercel.app/api/v1/stripe/intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: totalCartPrice * 100}),
      },
    );
    const data = await response.json();

    if (data.error) {
      Alert.alert('Something went wrong');
      return;
    }

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'BBC Cafe',
      paymentIntentClientSecret: data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }

    Alert.alert('Payment successful.');
    handleCartEmpty();
  };
  return (
    <SafeAreaView style={[styles.container, {marginBottom: tabBarHeight}]}>
      <Text
        style={{
          color: '#000',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '800',
          marginVertical: 20,
        }}>
        Cart
      </Text>
      {cart.length > 0 && (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <View
            style={{
              backgroundColor: '#ff9029',
              borderRadius: 40,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
              }}>
              {totalQuantity}
            </Text>
          </View>
        </View>
      )}
      {cart.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={handleCartEmpty}
            style={{
              position: 'absolute',
              right: 20,
              top: 40,
              backgroundColor: '#ff9029',
              padding: 3,
              borderRadius: 15,
            }}>
            <FontAwesomeIcon icon={faClose} size={25} color="#fff" />
          </TouchableOpacity>

          {cart &&
            cart.length > 0 &&
            cart.map((data: any) => {
              return (
                <View style={[styles.rowFront]}>
                  <TouchableHighlight
                    onPress={() => console.log('Element touched')}
                    underlayColor={'#aaa'}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 5,
                        gap: 20,
                      }}>
                      <View>
                        <Image
                          source={{
                            uri: data?.imagelink_square[0].toString(),
                          }}
                          style={styles.Image}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          {data?.name}
                        </Text>
                        <Text style={{color: 'gray', fontSize: 12}}>
                          {data?.ingredients}
                        </Text>
                        <Text
                          style={{
                            color: '#ff9029',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                          }}>
                          ₹ {data?.price.split(',')[0]}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(minusQuantity(data._id));
                          }}>
                          <FontAwesomeIcon
                            icon={faMinusCircle}
                            size={18}
                            color=""
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 18,
                            marginVertical: 5,
                          }}>
                          {data?.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(increaseQuantity(data._id));
                          }}>
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            size={18}
                            color="#451718"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            })}

          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: -tabBarHeight + 5,
              left: 0,
              right: 0,
              backgroundColor: '#000',
              height: 60,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: Dimensions.get('window').width - 30,
              marginHorizontal: 15,
              borderRadius: 20,
              flexDirection: 'row',
              paddingHorizontal: 30,
              marginBottom: 5,
            }}
            disabled={totalCartPrice <= 0}
            onPress={onCheckout}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
              ₹ {totalCartPrice}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../assets/lottie/cart.json')}
            autoPlay
            loop
            style={{
              width: 250,
              height: 250,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  Image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 5,
  },
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 100,
    marginVertical: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
