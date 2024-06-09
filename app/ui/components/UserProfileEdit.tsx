import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/Navigation';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ImageBackground, GestureResponderEvent, KeyboardAvoidingView, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileEdit'>;

const ProfilePageEdit: React.FC<Props> = ({ navigation }) => {
  const profileImageUrl = 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png';
  const [profileImage, setProfileImage] = useState({ uri: profileImageUrl });
  const [nickname, setNickname] = useState('ana_herrera');
  const [fullName, setFullName] = useState('Anabelle Herrera');
  const [email, setEmail] = useState('ana_herrera@gmail.com');
  const [errors, setErrors] = useState({ nickname: false, fullName: false });

  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  const validateFields = () => {
    let valid = true;
    let newErrors = { nickname: false, fullName: false };

    if (!nickname) {
      newErrors.nickname = true;
      valid = false;
    }
    if (!fullName) {
      newErrors.fullName = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveChanges = () => {
    if (validateFields()) {
      // Save changes logic here
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Title */}
        <Text style={styles.title}>Mi perfil</Text>

        <View style={styles.profileImageContainer}>
          {/* Profile Picture */}
          <Image source={profileImage} style={styles.profileImage} />
          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
            <Image source={require('../../assets/images/upload-icon.png')} style={styles.uploadIcon} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Nickname:</Text>
          <TextInput
            style={[styles.userInfoText, errors.nickname && styles.errorInput]}
            value={nickname}
            onChangeText={setNickname}
            editable={true}
          />
          {errors.nickname && <Text style={styles.errorText}>Campo Obligatorio</Text>}
          
          <TextInput
            style={[styles.userInfoText, errors.fullName && styles.errorInput]}
            value={fullName}
            onChangeText={setFullName}
            editable={true}
          />
          {errors.fullName && <Text style={styles.errorText}>Campo Obligatorio</Text>}
          
          <TextInput
            style={styles.userInfoBlurText}
            value={email}
            editable={false}
          />
        </View>
        <View style={styles.bottomContainer}>
          {/* Buttons */}
          <TouchableOpacity style={styles.SaveChangesButton} onPress={handleSaveChanges}>
            <Text style={styles.SaveChangesButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.CancelChangesText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  profileImageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FEC260',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 44,
    height: 44,
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
  userInfoBlurText: {
    color: '#FAFAFA',
    textShadowColor: '#101010',
    textShadowOffset: { width: 100, height: 100 },
    textAlign: 'left',
    backgroundColor: '#3B185F',
    marginBottom: 8,
    padding: 10,
    width: 300,
    borderRadius: 5,
    opacity: 0.6,
  },
  form: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 40,
    top: 60,
  },
  label: {
    color: '#FEC260',
    marginBottom: 8,
    fontSize: 16,
  },
  bottomContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    top: 250,
  },
  SaveChangesButton: {
    backgroundColor: '#A12568',
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 5,
    marginBottom: 10,
    width: 360,
  },
  SaveChangesButtonText: {
    color: '#FEC260',
    textAlign: 'center',
    fontSize: 16,
  },
  CancelChangesText: {
    color: '#FEC260',
    textAlign: 'center',
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default ProfilePageEdit;

