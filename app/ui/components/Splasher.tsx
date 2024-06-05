import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/Navigation.tsx';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ImageBackground, GestureResponderEvent } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

type Props = NativeStackScreenProps<RootStackParamList, 'Splasher'>;

const Splasher: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        // Navega a la página "Profile" después de 5 segundos. Cambiar luego a "Login"
        const timer = setTimeout(() => {
          navigation.replace('Login');
        }, 5000);
        return () => clearTimeout(timer);
      }, [navigation]);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDeleteProfile = () => {
    // Lógica para eliminar el perfil
    toggleModal();
  };
  //incluir logica de errores de servidor (sacar de userprofile modal pop-up)
  function handlePress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
}
  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
        <View style={styles.container}>    
            {/* Icono de aplicacion */}
            <Image source={require('../../assets/images/app-logo.png')} style={styles.iconImage} />
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    width: 125,
    height: 125,
    borderRadius: 80,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Asegura que el contenido comience desde la parte superior
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingTop: 16, // Añade un margen superior para evitar la superposición con el header
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Asegura que la imagen cubra todo el fondo
  },
  modal: {
    justifyContent: 'center',
    margin: 0, // Añadir esta línea para eliminar el margen por defecto
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: '#3B185F',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,  // Añade esta línea para definir el grosor del borde
    borderColor: '#FEC260',  // Añade esta línea para definir el color del borde
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    color: '#FEC260',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    color: '#FEC260',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FEC260',
    padding: 10,
    borderRadius: 5,
    margin: 5,  
    width: 100,
  },
  modalButtonText: {
    color: '#101010',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Splasher;