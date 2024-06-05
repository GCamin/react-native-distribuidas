// src/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../ui/components/HomePage'; // Your home screen component
//import SplashScreen from './SplashScreen'; // Your splash screen component
//import LoginScreen from './LoginScreen'; // Your login screen component
import ProfilePage from '../ui/components/UserProfile';
import ProfilePageEdit from '../ui/components/UserProfileEdit';
import Splasher from '../ui/components/Splasher';
import LoginScreen from '../ui/components/Login';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  Splasher: undefined;
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      {/* cambiar segun corresponda */}
      <Stack.Navigator initialRouteName="Login">
      {/*<Stack.Navigator initialRouteName="Home">*/}
      {/*<Stack.Navigator initialRouteName="Profile">
      {/*<Stack.Navigator initialRouteName="ProfileEdit">*/}
         {/*<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />*/}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Splasher" component={Splasher} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileEdit" component={ProfilePageEdit} options={{ headerShown: false }} />
        {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
