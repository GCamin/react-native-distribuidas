// src/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../ui/components/HomePage'; // Your home screen component
import SearchScreen from '../ui/components/SearchPage'; // Your splash screen component
//import LoginScreen from './LoginScreen'; // Your login screen component
import ProfilePage from '../ui/components/UserProfile';
import ProfilePageEdit from '../ui/components/UserProfileEdit';
import Splasher from '../ui/components/Splasher';
import LoginScreen from '../ui/components/Login';
import {useSelector} from 'react-redux';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  Splasher: undefined;
  Login: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const isLogged = useSelector(state => state?.user?.isLogged);
  const session = useSelector(state => state?.user);
  console.log('SESSION:', session);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {!isLogged ? (
          <Stack.Group>
            <Stack.Screen
              name="Splasher"
              component={Splasher}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfilePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileEdit"
              component={ProfilePageEdit}
              options={{headerShown: false}}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
