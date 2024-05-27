// src/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, GestureResponderEvent, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation'; // Adjust the path if necessary

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    
    function handlePress(event: GestureResponderEvent): void {
        throw new Error('Function not implemented.');
    }

  return (
    <ImageBackground
    source={require('../../assets/images/Background.png')}
    style={styles.background}
    >   
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../../assets/images/poor-things.jpeg')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 110,
    height: 171,
    borderRadius: 3,
    position: 'absolute',
    right: 55,
    bottom: 182,
    borderWidth: 1,  // Set the width of the border
    borderColor: '#FEC260',  // Set the color of the border
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // This will ensure the image covers the entire background
  },
});

export default HomeScreen;
