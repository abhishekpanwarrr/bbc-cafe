import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faStar} from '@fortawesome/free-solid-svg-icons';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Coffee} from '../StoreScreens/AddCoffeeScreen';
import LottieView from 'lottie-react-native';

const HomeScreenMain = ({navigation}: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [coffeeList, setCoffeeList] = useState<Array<Coffee>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllCoffee = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://bbc-cafe-backend.vercel.app/api/v1/coffee/all',
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        setCoffeeList(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Something went wrong. Please try again later');
      }
    };
    getAllCoffee();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          height: Dimensions.get('screen').height,
        }}>
        <ScrollView style={styles.ScrollViewContainer}>
          <Header />
          <View
            style={{
              marginBottom: 30,
            }}>
            <Text style={styles.TextTitle}>Good morning</Text>
            <Text style={styles.TextSubTitle}>
              Grab your first coffee in the morning
            </Text>
          </View>
          {/* Coffee List */}
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              marginBottom: 20,
              fontWeight: '900',
            }}>
            Coffee
          </Text>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../assets/lottie/laoding.json')}
                autoPlay
                loop
                style={{
                  width: 250,
                  height: 250,
                }}
              />
            </View>
          ) : coffeeList.length <= 0 ? (
            <Text style={{color: '#000'}}>No coffee found</Text>
          ) : (
            <FlatList
              data={coffeeList}
              keyExtractor={item => item?._id.toString()}
              horizontal
              initialNumToRender={3}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.CoffeeContainer}
                  onPress={() =>
                    navigation.navigate('DetailScreen', {id: item._id})
                  }>
                  <Image
                    source={{
                      uri: item.imagelink_square[0]?.toString(),
                    }}
                    onError={error =>
                      console.log('Image loading error:', error)
                    }
                    style={styles.FlatListImage}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{marginVertical: 5, flex: 1}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.CoffeeName}>
                        {item?.name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.CoffeeIngredient}>
                        {item?.ingredients}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesomeIcon
                        icon={faStar}
                        size={15}
                        color="#ff9029"
                      />
                      <Text style={styles.Ratings}>4.5</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      ₹ {item?.price?.split(',')?.[0]}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        backgroundColor: '#ff9029',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <FontAwesomeIcon icon={faPlus} color="#fff" size={18} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          {/* Beans List */}
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: '900',
            }}>
            Beans
          </Text>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../assets/lottie/laoding.json')}
                autoPlay
                loop
                style={{
                  width: 250,
                  height: 250,
                }}
              />
            </View>
          ) : coffeeList.length <= 0 ? (
            <Text style={{color: '#000'}}>No beans found</Text>
          ) : (
            <FlatList
              data={coffeeList}
              keyExtractor={item => item?._id.toString()}
              horizontal
              initialNumToRender={3}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.CoffeeContainer}
                  onPress={() =>
                    navigation.navigate('DetailScreen', {id: item._id})
                  }>
                  <Image
                    source={{
                      uri: item.imagelink_square[0].toString(),
                    }}
                    style={styles.FlatListImage}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{marginVertical: 5, flex: 1}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.CoffeeName}>
                        {item?.name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.CoffeeIngredient}>
                        {item?.ingredients}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesomeIcon
                        icon={faStar}
                        size={15}
                        color="#ff9029"
                      />
                      <Text style={styles.Ratings}>4.5</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      ₹ {item?.price?.split(',')?.[0]}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        backgroundColor: '#ff9029',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <FontAwesomeIcon icon={faPlus} color="#fff" size={18} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          <View
            style={{
              paddingBottom: tabBarHeight,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenMain;

const styles = StyleSheet.create({
  CoffeeIngredient: {
    fontSize: 13,
    fontWeight: '300',
    color: 'gray',
    maxWidth: '80%',
  },
  CoffeeName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  Ratings: {
    fontSize: 14,
    color: '#ff9029',
  },
  CoffeeContainer: {
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: '#fff',
    marginVertical: 'auto',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 3,
  },
  FlatListImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  TextTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  TextSubTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  ScrollViewContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
