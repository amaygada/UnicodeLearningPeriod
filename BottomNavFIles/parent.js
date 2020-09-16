import * as React from 'react'
import { BottomNavigation, Text } from 'react-native-paper';
import {Profile} from '/home/amay/Desktop/RN/task_one/BottomNavFIles/Profile.js'
import {Search} from '/home/amay/Desktop/RN/task_one/BottomNavFIles/Search.js'
import {Favourite} from '/home/amay/Desktop/RN/task_one/BottomNavFIles/Favourites.js'

export const Parent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'profile', title: 'Profile', icon:'account-box' , color:'#1e4f74'},
    { key: 'search', title: 'Search' , icon:'search-web' ,color:'#1e4f74'},
    { key: 'favourites', title: 'Favourites', icon:'heart' , color:'#1e4f74'},
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
      />
    );
  };

  // account-box (p) search-web heart(fav)