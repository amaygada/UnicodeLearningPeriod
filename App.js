import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {Login} from './Screens/details/login.js'
import Signup from './Screens/details/signup.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Parent} from './Screens/BottomNavFIles/parent.js'
import auth from '@react-native-firebase/auth';



const Stack = createStackNavigator()

export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Detail/>
    );
  }

  return (
    <Parent/>
  );
}

function Detail(){

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Sign Up" component = {Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
