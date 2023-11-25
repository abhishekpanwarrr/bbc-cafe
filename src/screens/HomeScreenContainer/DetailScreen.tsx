import {
  Alert,
  Image,
  ImageProps,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleChevronLeft,
  faHeart,
  faMinusCircle,
  faPlusCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import AddToCart from '../../components/AddToCart';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import {addToFavourite} from '../../app/cartSlice';

export interface DataProps {
  _id: string;
  name: string;
  imagelink_square: Array<ImageProps>;
  description: string;
  ingredients: string;
  price: string;
  size: string;
  createdAt: string;
  updatedAt: string;
}
const DetailScreen = ({navigation, route}: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [data, setData] = useState<DataProps>({} as DataProps);
  const id = route.params.id;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCoffee = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:9000/api/v1/coffee/${id}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();

        if (data) {
          setData(data);
          setLoading(false);
        } else {
          setData({} as DataProps);
        }
      } catch (error) {
        Alert.alert('Something went wrong. Please try again later');
        setLoading(false);
      }
    };
    getAllCoffee();
  }, []);

  const handleFavourite = (data: DataProps) => {
    dispatch(addToFavourite(data));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {loading ? (
        <Text>Loading....</Text>
      ) : (
        <>
          <ScrollView
            style={{
              padding: 10,
              position: 'relative',
            }}>
            <View>
              {data && (
                <Image
                  source={{
                    uri: data.imagelink_square?.[1]?.toString(),
                  }}
                  style={styles.ImageBackground}
                />
              )}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.BackButton}>
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  color="#b7a99d"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFavourite(data)}
                style={styles.FavouriteButton}>
                <FontAwesomeIcon icon={faHeart} size={25} color="gray" />
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  left: 20,
                  top: '80%',
                  backgroundColor: '#000',
                  borderRadius: 25,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  gap: 3,
                }}>
                <FontAwesomeIcon icon={faStar} size={15} color="#ff9029" />
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  4.5
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: 120,
                  bottom: -15,
                  left: '35%',
                  right: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  flexDirection: 'row',
                  gap: 15,
                  backgroundColor: '#fafafa',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity == 1) return;
                    setQuantity(prev => prev - 1);
                  }}>
                  <FontAwesomeIcon icon={faMinusCircle} size={25} color="" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity == 10) return;
                    setQuantity(prev => prev + 1);
                  }}>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size={25}
                    color="#451718"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View style={{marginVertical: 5, flex: 1}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.CoffeeName}>
                  {data?.name}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.CoffeeIngredient}>
                  {data?.ingredients}
                </Text>
              </View>
              {data && data.price && (
                <Text
                  style={{
                    color: '#ff9029',
                    fontSize: 24,
                    fontWeight: '700',
                  }}>
                  ₹ {data?.price?.split(',')?.[0]}
                </Text>
              )}
            </View>
            <Text
              style={{
                color: '#512626',
                fontSize: 14,
                fontWeight: '800',
                marginTop: 10,
                marginBottom: 8,
              }}>
              Description
            </Text>
            <Text
              style={{
                color: '#333',
              }}>
              {data?.description}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}></View>
            <View
              style={{
                marginBottom: tabBarHeight,
              }}
            />
          </ScrollView>
          <AddToCart
            data={data}
            quantity={quantity}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  CoffeeIngredient: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ff9029',
    maxWidth: '80%',
  },
  CoffeeName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  BackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  FavouriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  ImageBackground: {
    width: '100%',
    height: 300,
    borderRadius: 25,
  },
});
