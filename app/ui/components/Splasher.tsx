import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/Navigation.tsx';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import NetInfo from '@react-native-community/netinfo';

type Props = NativeStackScreenProps<RootStackParamList, 'Splasher'>;

const Splasher: React.FC<Props> = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Suscribirse a los cambios en el estado de la conexión a internet
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false);
    });

    // Verificar el estado de la conexión al cargar el componente
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false);
    });

    // Navega a la página "Login" después de 5 segundos si hay conexión a internet
    const timer = setTimeout(() => {
      if (isConnected) {
        navigation.replace('Login');
      } else {
        setModalVisible(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [isConnected, navigation]);

  const handleRetry = () => {
    setModalVisible(false);
    NetInfo.fetch().then(state => {
      const isCurrentlyConnected = state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false;
      setIsConnected(isCurrentlyConnected);
      if (isCurrentlyConnected) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
      <View style={styles.container}>
        {/* Icono de aplicacion */}
        <Image source={require('../../assets/images/app-logo.png')} style={styles.iconImage} />
      </View>
      <Modal isVisible={isModalVisible} backdropOpacity={0.5} style={styles.modal}>
        <View style={styles.modalContainer}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={10}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Error de conexión</Text>
              <Text style={styles.modalMessage}>No hay conexión a internet. Por favor, verifica tu conexión e inténtalo de nuevo.</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleRetry}>
                  <Text style={styles.modalButtonText}>Reintentar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>
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
    width: 130,
    right: 30,
  },
  modalButtonText: {
    color: '#101010',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Splasher;