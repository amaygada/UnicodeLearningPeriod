import * as React from 'react'
import {View , Text , FlatList , TouchableOpacity,RefreshControl} from 'react-native'
import {Searchbar} from 'react-native-paper'
import {ListComponent} from '../Components/list_component.js'
import {Video} from '../BottomNavFIles/video.js'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';


class Search extends React.Component{

    state = {
        searchquery : "",
        resultObj : {things:"None"},
        refreshing : false
    }

    setSearchQuery = (query) =>{
        this.setState({searchquery:query})
    }

    getData = async () => {
        //this.setState({resultObj : {things:None}})
        const APIKEY = 'AIzaSyCZ9bu1mR6GgG5nyc5dYRK97GI_GdMxf2E'
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.searchquery}&type=video&key=${APIKEY}`
        
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

    componentDidMount = async() => {
        await this.getData()
        //this.logOut()
    }

    navigateToVideo = (obj) =>{
        const {navigation} = this.props
        navigation.navigate('Video' , {result:obj})
    }

    submit = async () => {
        this.setState({resultObj:{things:"None"}})
        await this.getData()
    }

    render(){
        if(this.state.resultObj.things==='None'){
            return(
                <View>
                    <View style={{padding:5}}>
                    <Searchbar
                        placeholder="Search"
                        value = {this.state.searchquery}
                        onChangeText = {this.setSearchQuery}/>
                    </View>

                    <View style = {{justifyContent:'center' , padding:20 , alignItems:'center' , flex:1 , alignContent:'center'}}>
                        <Text style = {{justifyContent:'center' , alignContent:'center' , alignItems:'center' }}>loading...</Text>
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
                        onSubmitEditing={this.submit}
                    />                    
                </View>
                
                    <FlatList style ={{flex:1}}
                        data = {this.state.resultObj.items}
                        renderItem = {({item}) => (
                        <TouchableOpacity onPress={() => {this.navigateToVideo(item)}}>
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

export default function(props) {
    const navigation = useNavigation();
  
    return <Search {...props} navigation={navigation} />;
  }
