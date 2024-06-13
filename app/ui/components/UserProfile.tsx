import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app/navigation/Navigation.tsx';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import NetInfo from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {useUserInfoQuery, useUserDeleteMutation} from '../../redux/profileApi.js';
import {logOut} from '../../redux/user.js';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfilePage: React.FC<Props> = ({navigation}) => {
  const userId = useSelector(state => state?.user?.id);
  const {data, isLoading} = useUserInfoQuery(userId);
  const [deleteUser, {isLoading: isDeleting, error}] = useUserDeleteMutation();
  const dispatch = useDispatch();
  const profileImageUrl =
    'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png';
  const [profileImage, setProfileImage] = useState({uri: profileImageUrl});
  const [nickname, setNickname] = useState(data?.nickName);
  const [fullName, setFullName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isConnectionModalVisible, setConnectionModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

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

  const handleDeleteProfile = async () => {
    // Ocultar el modal de eliminación
    setDeleteModalVisible(false);

    // Verificar conexión y mostrar modal de error de conexión si es necesario
    if (!isConnected) {
      setConnectionModalVisible(true);
    } else {
      try {
        deleteUser(userId).unwrap();
        console.log("Perfil eliminado");
        dispatch(logOut());
        navigation.replace("Login");
      } catch (error) {
        console.log(userId)
        console.error("Error al eliminar el perfil:", error);
        if (error.status === 401) {
          alert('Error de autenticación. Por favor, inicia sesión nuevamente.');
          dispatch(logOut());
          navigation.replace("Login");
        } else {
          alert('Error al eliminar el perfil. Por favor, intenta de nuevo.');
        }
      }
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  function handlePress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}>
      {isLoading && data ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={() => checkConnectionAndNavigate(navigation.goBack)}>
              <Image
                source={require('../../assets/images/arrow-back.png')}
                style={styles.backIcon}
              />
              <Text style={styles.backButton}>Volver</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Mi perfil</Text>

            {/* Profile Picture */}
            <Image
              source={{
                uri:
                  data.profileImageUrl || 'https://i.stack.imgur.com/l60Hf.png',
              }}
              style={styles.profileImage}
            />

            {/* Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => checkConnectionAndNavigate(() => navigation.navigate('ProfileEdit'))}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>Nickname:</Text>
              <TextInput
                style={styles.userInfoText}
                value={nickname}
                onChangeText={setNickname}
                editable={false}
              />
              <TextInput
                style={styles.userInfoText}
                value={fullName}
                onChangeText={setFullName}
                editable={false}
              />
              <TextInput
                style={styles.userInfoText}
                value={email}
                editable={false}
              />
            </View>

            <View style={styles.bottomContainer}>
              {/* Buttons */}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                <Text style={styles.deleteProfileText}>Eliminar perfil</Text>
              </TouchableOpacity>
            </View>
            <Modal
              isVisible={isDeleteModalVisible}
              backdropOpacity={0.5}
              style={styles.modal}>
              <View style={styles.modalContainer}>
                <BlurView
                  style={styles.absolute}
                  blurType="light"
                  blurAmount={10}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>¿Está seguro?</Text>
                    <Text style={styles.modalMessage}>
                      Al eliminar el perfil, perderá todos sus datos grabados.
                    </Text>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleDeleteProfile}>
                        <Text style={styles.modalButtonText}>Eliminar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setDeleteModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </BlurView>
              </View>
            </Modal>
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
          </View>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Asegura que el contenido comience desde la parte superior
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingTop: 16, // Añade un margen superior para evitar la superposición con el header
  },
  backButton: {
    color: '#FEC260',
    marginLeft: 0,
    fontSize: 16,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    color: '#FEC260',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#101010', // Añade un borde negro
    textShadowOffset: {width: -1, height: 1}, // Ajusta el desplazamiento de la sombra
    textShadowRadius: 10, // Ajusta el radio de la sombra
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#A12568',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FEC260',
    fontSize: 16,
  },
  userInfoText: {
    color: '#FAFAFA',
    textAlign: 'left',
    backgroundColor: '#3B185F',
    marginBottom: 8,
    padding: 10,
    width: 300,
    borderRadius: 5,
  },
  form: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  label: {
    color: '#FEC260',
    marginBottom: 8,
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#A12568',
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 5,
    marginBottom: 10,
    width: 360,
  },
  logoutButtonText: {
    color: '#FEC260',
    textAlign: 'center',
    fontSize: 16,
  },
  deleteProfileText: {
    color: '#FEC260',
    textAlign: 'center',
    fontSize: 16,
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

export default ProfilePage;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

