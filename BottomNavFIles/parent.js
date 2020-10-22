import * as React from 'react'
import { BottomNavigation} from 'react-native-paper';
import {Profile} from '../BottomNavFIles/Profile.js'
import Search from '../BottomNavFIles/Search.js'
import Favourite from '../BottomNavFIles/Favourites.js'
import {Video} from '../BottomNavFIles/video.js'
import Settings from '../BottomNavFIles/Settings.js'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const TabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'search', title: 'Search' , icon:'select-search' ,color:'#fff'},
      { key: 'favourites', title: 'Favourites', icon:'heart' , color:'#fff'},
      { key: 'settings', title: 'Settings', icon:'nut' , color:'#fff'},
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      search: Search,
      settings: Settings,
      favourites: Favourite
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor="#4d4b50"
        inactiveColor="#aeaeae"
      />
    );
  };

  const Stack = createStackNavigator();

  export function Parent(){
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="tabbar" screenOptions={{headerShown:false}}>
          <Stack.Screen name = "tabbar" component={TabBar} />
          <Stack.Screen name="Video" component={Video}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


