import * as React from 'react'
import {View , Text ,Image , FlatList , TouchableOpacity,RefreshControl} from 'react-native'
import {Searchbar} from 'react-native-paper'
import {ListComponent} from '../Components/list_component.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Video} from '../BottomNavFIles/video.js'

const Stack = createStackNavigator();

export function Search(){
    return (
      <NavigationContainer independent = {true}>
        <Stack.Navigator initialRouteName="SPage" screenOptions={{headerShown:false}}>
          <Stack.Screen name = "Spage" component={SPage} />
          <Stack.Screen name="Video" component={Video} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export class SPage extends React.Component{

    state = {
        searchquery : "",
        resultObj : {things:"None"},
        refreshing : false
    }

    setSearchQuery = (query) =>{
        this.setState({searchquery:query})
    }

    getData = async () => {
        const APIKEY = 'AIzaSyCZ9bu1mR6GgG5nyc5dYRK97GI_GdMxf2E'
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.searchquery}&type=video&key=${APIKEY}`
        
        try{
            let response = await fetch(`${url}`)
            let result = await response.json()
            this.setState({resultObj:result})
        }catch(e){
            console.log(`ERROR + ${e}`)
        }
        this.setState({refreshing:false})
    }

    onRefresh = async () =>{
        this.setState({refreshing:true})
        await this.getData()
    }

    UNSAFE_componentWillMount = async() => {
        await this.getData()
    }

    navigatToVideo = (obj) =>{
        this.props.navigation.navigate('Video' , {result:obj})
    }

    render(){
        if(this.state.resultObj.things==='None'){
            return(
                <View>
                    <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
                       <Text>loading...</Text>
                    </View>
                </View>
            )
        }else{
        return(
            <View style = {{flex:1 , backgroundColor:"#FFFFFF"}}>
                <View style = {{padding:5}}>
                    <Searchbar
                        placeholder="Search"
                        value = {this.state.searchquery}
                        onChangeText = {this.setSearchQuery}
                        onSubmitEditing={this.getData}
                    />                    
                </View>
                
                    <FlatList style ={{flex:1}}
                        data = {this.state.resultObj.items}
                        renderItem = {({item}) => (
                        <TouchableOpacity onPress={() => {this.navigatToVideo(item)}}>
                            <ListComponent snip = {item.snippet}/>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item['etag']}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                    />
            </View>
        )}
    }
}
