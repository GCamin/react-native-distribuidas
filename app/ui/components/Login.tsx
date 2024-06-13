// App.js
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React , {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {setCredentials} from '../../redux/user';
import {useLoginMutation} from '../../redux/authApi';


GoogleSignin.configure({
  webClientId:
    '889659772018-e2b450naiqjmjsir1c382lgj5vpihfsi.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const LoginScreen = ({navigation}) => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const [isConnectionModalVisible, setConnectionModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const {
        data: {idUsuario, jwtToken, jwtRefreshToken},
      } = await login(idToken);
      console.log(idToken, 'ACA ESTA EL ID');
      dispatch(
        setCredentials({
          id: idUsuario,
          jwtToken,
          jwtRefreshToken,
        }),
      );
    } catch (error) {
      console.error('Google Sign-In error: ', error);
    }
  };

  useEffect(() => {
    // Suscribirse a los cambios en el estado de la conexión a internet
    let timeoutId: NodeJS.Timeout;
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false;
      setIsConnected(connected);
      clearTimeout(timeoutId);
      if (!connected) {
        // Si no hay conexión, establecer un timeout para mostrar el modal después de 3 segundos
        timeoutId = setTimeout(() => {
          setConnectionModalVisible(true);
        }, 2000);
      } else {
        // Si hay conexión, ocultar el modal
        setConnectionModalVisible(false);
      }
    });

    // Verificar el estado de la conexión al cargar el componente
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false);
    });
    return () => {
      unsubscribe(); // Limpia la suscripción al desmontar el componente
      clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente
    };
  }, []);

  const handleRetry = () => {
    setConnectionModalVisible(false);
    NetInfo.fetch().then(state => {
      const isCurrentlyConnected = state.isConnected && state.isInternetReachable !== null ? state.isInternetReachable : false;
      setIsConnected(isCurrentlyConnected);
      if (isCurrentlyConnected) {
        setConnectionModalVisible(false);
      } else {
        setConnectionModalVisible(true);
      }
    });
  };

  const checkConnectionAndNavigate = (action: () => void) => {
    if (!isConnected) {
      setConnectionModalVisible(true);
    } else {
      action();
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a Moviestar</Text>
        <Image
          source={require('../../assets/images/app-logo.png')}
          style={styles.iconImage}
        />
        {!isLoading ? (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={onGoogleButtonPress}>
            <Image
              source={{
                uri: 'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png',
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
      {/* Modal de error de conexión */}
      <Modal isVisible={isConnectionModalVisible} backdropOpacity={0.5} style={styles.modal}>
          <View style={styles.modalContainer}>
            <BlurView style={styles.absolute} blurType="light" blurAmount={10}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitleConnection}>Error de conexión</Text>
                <Text style={styles.modalMessageConnection}>No hay conexión a internet. Por favor, verifica tu conexión e inténtalo de nuevo.</Text>
                <View style={styles.modalButtonsConnection}>
                  <TouchableOpacity style={styles.modalButtonConnection} onPress={handleRetry}>
                    <Text style={styles.modalButtonTextConnection}>Reintentar</Text>
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
  background: {
    flex: 1,
    resizeMode: 'cover', // Make sure the background covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FEC260',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#101010', // Añade un borde negro
    textShadowOffset: {width: -1, height: 1}, // Ajusta el desplazamiento de la sombra
    textShadowRadius: 10,
  },
  iconImage: {
    width: 150,
    height: 150,
    marginBottom: 80,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 50,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#101010',
    paddingRight: 50,
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
    borderWidth: 2, // Añade esta línea para definir el grosor del borde
    borderColor: '#FEC260', // Añade esta línea para definir el color del borde
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
  modalTitleConnection: {
    color: '#FEC260',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessageConnection: {
    color: '#FEC260',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsConnection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButtonConnection: {
    backgroundColor: '#FEC260',
    padding: 10,
    borderRadius: 5,
    margin: 5,  
    width: 130,
    right: 30,
  },
  modalButtonTextConnection: {
    color: '#101010',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
