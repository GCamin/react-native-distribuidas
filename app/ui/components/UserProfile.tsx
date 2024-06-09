import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/Navigation.tsx';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ImageBackground, GestureResponderEvent } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfilePage: React.FC<Props> = ({ navigation }) => {
  const profileImageUrl = 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png';
  const [profileImage, setProfileImage] = useState({ uri: profileImageUrl });
  const [nickname, setNickname] = useState('ana_herrera');
  const [fullName, setFullName] = useState('Anabelle Herrera');
  const [email, setEmail] = useState('ana_herrera@gmail.com');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeleteProfile = () => {
    // Lógica para eliminar el perfil
    toggleModal();
  };

  function handlePress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/arrow-back.png')} style={styles.backIcon} />
          <Text style={styles.backButton}>Volver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Mi perfil</Text>

        {/* Profile Picture */}
        <Image source={profileImage} style={styles.profileImage} />

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
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
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.deleteProfileText}>Eliminar perfil</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible} backdropOpacity={0.5} style={styles.modal}>
          <View style={styles.modalContainer}>
            <BlurView style={styles.absolute} blurType="light" blurAmount={10}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>¿Está seguro?</Text>
                <Text style={styles.modalMessage}>Al eliminar el perfil, perderá todos sus datos grabados.</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleDeleteProfile}>
                    <Text style={styles.modalButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </Modal>
      </View>
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
    textShadowOffset: { width: -1, height: 1 }, // Ajusta el desplazamiento de la sombra
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

export default ProfilePage;

