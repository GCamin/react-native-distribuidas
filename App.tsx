/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/*import React from 'react';
import {Text, View} from 'react-native';
*/
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/ui/components/HomePage';
import ProfilePage from './app/ui/components/UserProfile';
import ProfilePageEdit from './app/ui/components/UserProfileEdit';
import Splasher from './app/ui/components/Splasher';
import LoginScreen from './app/ui/components/Login';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splasher">
        <Stack.Screen name="Splasher" component={Splasher} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileEdit" component={ProfilePageEdit} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*
const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
*/