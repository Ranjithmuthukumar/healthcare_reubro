import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import {
  StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, [])
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={'#151F6D'}
        barStyle={'light-content'}
      />
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}