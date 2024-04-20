import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClose,
  faMugSaucer,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ImagePicker, {
  Image as ImagePickerResponse,
} from 'react-native-image-crop-picker';

export interface Coffee {
  _id: string;
  name: string;
  description: string;
  ingredients: string;
  special_ingredients: string;
  roasted: string;
  size: string;
  price: string;
  imagelink_square: string;
}

const AddCoffeeScreen = () => {
  const [avatar, setAvatar] = useState<ImagePickerResponse | null>(null);
  const [coverImage, setCoverImage] = useState<ImagePickerResponse | null>(
    null,
  );
  const [coffee, setCoffee] = useState({
    name: '',
    description: '',
    ingredients: '',
    special_ingredients: '',
    roasted: '',
    size: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (key: keyof Coffee, value: string) => {
    setCoffee(prevCoffee => ({
      ...prevCoffee,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      coffee.name &&
      coffee.description &&
      coffee.ingredients &&
      coffee.special_ingredients &&
      coffee.roasted &&
      coffee.size &&
      coffee.price &&
      avatar &&
      coverImage
    ) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', coffee.name);
        formData.append('description', coffee.description);
        formData.append('ingredients', coffee.ingredients);
        formData.append('special_ingredients', coffee.special_ingredients);
        formData.append('roasted', coffee.roasted);
        formData.append('size', coffee.size);
        formData.append('price', coffee.price);
        formData.append('avatar', {
          name: 'avatar.jpg',
          type: avatar.mime,
          uri: avatar.path,
        });
        formData.append('coverImage', {
          name: 'coverImage.jpg',
          type: coverImage.mime,
          uri: coverImage.path,
        });

        const response = await fetch(
          'https://bbc-cafe-backend.vercel.app/api/v1/coffee/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: formData,
          },
        );
        const data = await response.json();
        console.log("Data", data);
        
        if (data._id) {
          Alert.alert('Coffee added');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error",error);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  const takePhotoFromPhone = async (src: string) => {
    try {
      const response = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (src === 'avatar') {
        setAvatar(response);
      } else {
        setCoverImage(response);
      }
    } catch {
      Alert.alert('Something went wrong.');
    }
  };
  
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 20,
      }}>
      {loading && (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={faSpinner} size={40} color="#000" />
        </View>
      )}
      <Text
        style={{
          fontSize: 18,
          color: '#333',
          marginBottom: 16,
          textAlign: 'center',
          fontWeight: 'bold',
          textDecorationLine: 'underline',
        }}>
        Fill coffee details
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 20,
          marginBottom: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => takePhotoFromPhone('avatar')}>
          <Image
            source={
              avatar
                ? {uri: avatar.path}
                : require('../../assets/placeholder.png')
            }
            style={{
              borderRadius: 10,
              width: 100,
              height: 100,
            }}
          />
          {avatar && (
            <TouchableOpacity
              onPress={() => setAvatar(null)}
              style={{
                position: 'absolute',
                top: -8,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 2,
                borderRadius: 30,
              }}>
              <FontAwesomeIcon icon={faClose} color="white" size={12} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePhotoFromPhone('coverImage')}>
          <Image
            source={
              coverImage
                ? {uri: coverImage.path}
                : require('../../assets/placeholder.png')
            }
            style={{
              borderRadius: 10,
              width: 100,
              height: 100,
            }}
          />
          {coverImage && (
            <TouchableOpacity
              onPress={() => setCoverImage(null)}
              style={{
                position: 'absolute',
                top: -8,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 2,
                borderRadius: 30,
              }}>
              <FontAwesomeIcon icon={faClose} color="white" size={12} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        autoFocus
        placeholder="Coffee Name"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('name', value)}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('description', value)}
      />
      <TextInput
        placeholder="Roasted or not"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('roasted', value)}
      />
      <TextInput
        placeholder="Ingredients"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('ingredients', value)}
      />
      <TextInput
        placeholder="Special Ingredients"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('special_ingredients', value)}
      />
      <TextInput
        placeholder="Size ex. (S,M,L)"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('size', value)}
      />
      <TextInput
        placeholder="Price ex. (90,120,140)"
        placeholderTextColor={'#000'}
        style={styles.TextInput}
        onChangeText={value => handleInputChange('price', value)}
      />
      <TouchableOpacity style={styles.AddButton} onPress={handleSubmit}>
        <FontAwesomeIcon icon={faMugSaucer} size={22} color="#fff" />
        <Text style={styles.AddButtonText}>Add coffee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddCoffeeScreen;

const styles = StyleSheet.create({
  AddButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  AddButton: {
    width: '90%',
    margin: '5%',
    backgroundColor: '#ff9029',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    gap: 10,
  },
  TextInput: {
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 40,
    paddingLeft: 10,
    color: '#000',
    marginBottom: 10,
  },
});
