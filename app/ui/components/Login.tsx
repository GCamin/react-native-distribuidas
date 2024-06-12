// App.js
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
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

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, user} = await GoogleSignin.signIn();
      const {
        data: {jwtToken, jwtRefreshToken},
      } = await login(idToken);
      dispatch(
        setCredentials({
          jwtToken,
          jwtRefreshToken,
        }),
      );
    } catch (error) {
      console.error('Google Sign-In error: ', error);
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
          <Text>Loading...</Text>
        )}
      </View>
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
});

export default LoginScreen;
