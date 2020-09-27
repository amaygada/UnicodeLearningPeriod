import 'react-native-gesture-handler';
import * as React from 'react'
import {Login} from './details/login.js'
import Signup from './details/signup.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Parent} from '/home/amay/Desktop/RN/task_one/BottomNavFIles/parent.js'


const Stack = createStackNavigator()

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Sign Up" component = {Signup}/>
        <Stack.Screen name="Parent" component={Parent}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}