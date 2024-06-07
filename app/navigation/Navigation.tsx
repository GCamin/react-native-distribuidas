// src/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../ui/components/HomePage'; // Your home screen component
import SearchScreen from '../ui/components/SearchPage'; // Your splash screen component
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
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      {/* cambiar segun corresponda */}
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;