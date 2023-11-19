import { faCircleXmark, faClose, faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageProps,
  Button
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { coffeeList } from '../data/coffee';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectCartTotalPrice } from '../app/totalCartPrice';
import { addToCart, emptyCart } from '../app/cartSlice';

interface CartItem {
  id?: number
  key: string
  title: string
  details: string
  image: ImageProps
  price: number
  quantity: number
}
const CartScreen = ({ navigation }: any) => {
  const { cart } = useSelector((state: RootState) => state.cart)
  const tabBarHeight = useBottomTabBarHeight()
  const [coffeeCount, setCoffeeCount] = useState(1)
  const [listData, setListData] = useState<Array<CartItem>>([]);
  const totalCartPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch()

  useEffect(() => {
    setListData(
      cart?.map((cartItem, index) => ({
        key: `${index}`,
        title: cartItem.name,
        details: cartItem.ingredients,
        image: cartItem.image,
        price: cartItem.price,
        quantity: cartItem.quantity
      }))
    );
  }, [cart]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = (rowKey: any) => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey: any) => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = (rowKey: any) => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = (props: any) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }
    
    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
        <TouchableHighlight
          onPress={() => console.log('Element touched')}
          underlayColor={'#aaa'}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            padding: 5,
            gap: 20
          }}>
            {/* Image */}
            <View>
              <Image source={data.item.image} style={styles.Image} />
            </View>
            {/* Text */}
            <View style={{
              flex: 1,
            }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>{data.item.title}</Text>
              <Text style={{ color: "gray", fontSize: 12 }}>{data.item.details}</Text>
              <Text style={{ color: "#ff9029", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>₹ {data.item.price}</Text>
            </View>
            {/* Quantity */}
            <View style={{
              justifyContent: 'center',
              alignItems: "center",
              marginRight: 10
            }}>
              <TouchableOpacity onPress={() => {}} >
                <FontAwesomeIcon icon={faMinusCircle} size={18} color='' />
              </TouchableOpacity>
              <Text style={{
                fontSize: 18,
                marginVertical: 5
              }}>{data.item.quantity}</Text>
              <TouchableOpacity onPress={() => {}}>
                <FontAwesomeIcon icon={faPlusCircle} size={18} color='#451718' />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data: any, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(100);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props: any) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            {/* <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            /> */}
            <FontAwesomeIcon
              icon={faClose}
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                {/* <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                /> */}
                <FontAwesomeIcon
                  icon={faTrash}
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const handleCartEmpty = () => dispatch(emptyCart("empty"))

  return (
    <SafeAreaView style={[styles.container, { marginBottom: tabBarHeight }]}>
      {cart.length > 0 ? <>
        <Text style={{
          color: "#000", textAlign: 'center', fontSize: 18,
          fontWeight: "800", marginVertical: 20
        }}>Cart</Text>
        <TouchableOpacity
          onPress={handleCartEmpty}
          style={{
            position: "absolute",
            right: 20,
            top: 40,
            backgroundColor: "#ff9029",
            padding: 3,
            borderRadius: 15
          }}>
          <FontAwesomeIcon icon={faClose} size={25} color='#fff' />
        </TouchableOpacity>


        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          onRowDidOpen={onRowDidOpen}
          leftActivationValue={100}
          rightActivationValue={-200}
          leftActionValue={0}
          rightActionValue={-500}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
        />
        <TouchableOpacity 
        style={{
          position: 'absolute',
          bottom: -tabBarHeight + 5,
          left: 0,
          right: 0,
          backgroundColor: '#000',
          height: 60,
          justifyContent: "space-between",
          alignItems: 'center',
          width: Dimensions.get("window").width - 30,
          marginHorizontal: 15,
          borderRadius: 20,
          flexDirection: 'row',
          paddingHorizontal: 30,
          marginBottom: 5
        }}
          disabled={totalCartPrice <= 0}
          onPress={() => { }}
        >
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "600"
          }}>₹ {totalCartPrice}</Text>
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "600"
          }}>Checkout</Text>
        </TouchableOpacity>
      </> : <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 20
        }}>
          <FontAwesomeIcon icon={faCircleXmark} size={28} color='#ff9029' />
          <Text style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#000"
          }}>No item in cart</Text>
        </View>
        <TouchableOpacity style={{
          marginVertical: 20,
          backgroundColor: "#ff9029",
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderRadius: 10
        }} onPress={() => navigation.navigate("HomeScreenMain")}>
          <Text style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "700"
          }}>Home</Text>
        </TouchableOpacity>
      </View>}
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
    marginTop: 5
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 5
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 100,
    marginVertical: 10
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