import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Coffee } from './AddCoffeeScreen'

const CoffeeListScreen = () => {
  const [coffeeList, setCoffeeList] = useState<Array<Coffee>>([])
  useEffect(() => {
    const getAllCoffee = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/v1/coffee/all", {
          method: "GET"
        })
        const data = await response.json();
        setCoffeeList(data)
      } catch (error) {
        console.log("error", error);
        Alert.alert("Something went wrong. Please try again later")
      }
    }
    getAllCoffee()
  }, [])
  return (
    <ScrollView style={{
      flex: 1
    }}>
      {
        coffeeList && coffeeList.length > 0 ? coffeeList.map(coffee => {
          console.log("coffee.id", coffee._id);

          return (
            <View key={coffee._id} style={styles.Container}>
              <View style={{
                gap: 5,
                flex: 1,
                flexDirection: "row",
                width: "50%",
                overflow: "hidden",
                alignItems: 'center'
              }}>
                <Image source={{
                  uri: coffee.imagelink_square
                }}
                  width={50}
                  height={50}
                  borderRadius={10}
                  resizeMode='cover'
                />
                <View style={{
                  flex: 1,
                }}>
                  <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: "#000", fontWeight: "700" }}>{coffee.name}</Text>
                  <Text style={{ color: "rgba(0,0,0,0.4)", fontSize: 14, fontWeight: "500" }}>{coffee.ingredients}</Text>
                </View>
              </View>
              <View style={{
                gap: 5,
                width: "40%",
                justifyContent: 'center',
              }}>
                <View style={{
                  flexDirection: 'row',
                  gap: 10,
                  paddingHorizontal: 10,
                  justifyContent: "space-between"
                }}>
                  {coffee?.size?.split(',').map(item => (
                    <Text style={{
                      fontWeight: "800",
                      color: "#333"
                    }}>{item}</Text>
                  ))}
                </View>
                <View style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                  {coffee?.price?.split(',').map(item => (
                    <Text style={{
                      color: "#ff9029"
                    }}>₹ {item}</Text>
                  ))}
                </View>
              </View>
            </View>
          )
        }) : <Text style={{
          textAlign: 'center',
          fontSize: 25,
          marginVertical: 10,
          color: "#000"
        }}>No coffee found</Text>
      }
    </ScrollView>
  )
}

export default CoffeeListScreen

const styles = StyleSheet.create({
  Container: {
    marginVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    paddingVertical: 20,
    marginHorizontal: 10, borderRadius: 5
  }
})