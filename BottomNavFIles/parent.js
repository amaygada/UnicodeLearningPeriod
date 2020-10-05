import * as React from 'react'
import { BottomNavigation} from 'react-native-paper';
import {Profile} from '../BottomNavFIles/Profile.js'
import Search from '../BottomNavFIles/Search.js'
import {Favourite} from '../BottomNavFIles/Favourites.js'
import {Video} from '../BottomNavFIles/video.js'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const TabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'search', title: 'Search' , icon:'search-web' ,color:'#fff'},
      { key: 'favourites', title: 'Favourites', icon:'heart' , color:'#fff'},
      { key: 'profile', title: 'Profile', icon:'account-box' , color:'#fff'},
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      search: Search,
      profile: Profile,
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
        <Stack.Navigator initialRouteName="Search" screenOptions={{headerShown:false}}>
          <Stack.Screen name = "tabbar" component={TabBar} />
          <Stack.Screen name="Video" component={Video}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


