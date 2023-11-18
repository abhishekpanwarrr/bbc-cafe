import { Image, ImageProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { coffeeList } from '../../data/coffee'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronLeft, faMinusCircle, faMugHot, faPlusCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import AddToCart from '../../components/AddToCart'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
interface Data {
    name: string
    image: ImageProps
    description: string
    ingredients: string
    price: []
    size: []
}
const DetailScreen = ({ navigation, route }: any) => {
    const tabBarHeight = useBottomTabBarHeight()
    const [coffeeCount, setCoffeeCount] = useState(1)
    const [data, setData] = useState<Data>({} as Data)
    const routeName = route.params.name

    useEffect(() => {
        const filtered = coffeeList.filter(coffee => coffee.name === routeName)[0]
        setData(filtered)
    }, [])
    console.log("data", data);

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <ScrollView style={{
                padding: 10,
                position: "relative"
            }}>
                {/* image container */}
                <View>
                    <Image source={data.image} style={styles.ImageBackground} />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} color='#b7a99d' size={25} />
                    </TouchableOpacity>
                    <View style={{
                        position: "absolute",
                        left: 20,
                        top: "80%",
                        backgroundColor: "#000",
                        borderRadius: 25,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        gap: 3
                    }}>
                        <FontAwesomeIcon icon={faStar} size={15} color='#ff9029' />
                        <Text style={{
                            color: "#fff"
                        }}>4.5</Text>
                    </View>
                </View>
                {/* Coffee name and price container */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10
                }}>
                    <View style={{ marginVertical: 5, flex: 1 }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.CoffeeName}>{data?.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.CoffeeIngredient}>{data?.ingredients}</Text>
                    </View>
                    {
                        data && data.price && <Text style={{
                            color: "#000",
                            fontSize: 24,
                            fontWeight: "700"
                        }}>₹ {data?.price[0]}</Text>
                    }
                </View>
                {/* Description */}
                <Text style={{
                    color: "#512626",
                    fontSize: 14,
                    fontWeight: "800",
                    marginTop: 10,
                    marginBottom: 8
                }}>Description</Text>
                <Text style={{
                    color: "#b6b6b6"
                }}>{data?.description}</Text>
                {/* Coffee size */}
                <Text style={{
                    color: "#512626",
                    fontSize: 17,
                    fontWeight: "800",
                    marginTop: 16,
                    marginBottom: 8
                }}>Coffee size</Text>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: "row",
                        gap: 20
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#ff9029",
                            padding: 15,
                            borderRadius: 25
                        }}>
                            <FontAwesomeIcon icon={faMugHot} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "#f2cbb3",
                            padding: 15,
                            borderRadius: 25
                        }}>
                            <FontAwesomeIcon icon={faMugHot} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "#f2cbb3",
                            padding: 15,
                            borderRadius: 25
                        }}>
                            <FontAwesomeIcon icon={faMugHot} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        marginRight: 10
                    }}>
                        <TouchableOpacity onPress={() => {
                            if (coffeeCount == 1) return
                            setCoffeeCount(prev => prev - 1)
                        }}>
                            <FontAwesomeIcon icon={faMinusCircle} size={18} color='' />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 18,
                            marginVertical: 5
                        }}>{coffeeCount}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (coffeeCount == 10) return
                                setCoffeeCount(prev => prev + 1)
                            }}>
                            <FontAwesomeIcon icon={faPlusCircle} size={18} color='#451718' />
                        </TouchableOpacity>
                    </View>
                </View>
                <AddToCart />
                <View style={{
                    marginBottom: tabBarHeight
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    CoffeeIngredient: {
        fontSize: 13,
        fontWeight: "500",
        color: "#ff9029",
        maxWidth: "80%"
    },
    CoffeeName: {
        fontSize: 16,
        fontWeight: "700",
        flex: 1
    },
    BackButton: {
        position: "absolute",
        top: 20,
        left: 20
    },
    ImageBackground: {
        width: "100%",
        height: 300,
        borderRadius: 25
    }
})