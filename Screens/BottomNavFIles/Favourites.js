import * as React from 'react'
import {View , Text ,FlatList,TouchableOpacity , RefreshControl} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {ListComponent} from '../Components/list_component.js'
import { useNavigation } from '@react-navigation/native';
let favv = []
class Favourite extends React.Component{

    state = {
        email : '',
        favouriteVideos : {},
        refreshing:false
    }

    UNSAFE_componentWillMount = async () => {
        await this.getFavObj()
        //console.log(this.state.email)
    }

    componentDidUpdate = (prevProps , prevState) => {
        if(prevState.email!==this.state.email || prevState.favouriteVideos!==this.state.favouriteVideos  || prevState.refreshing!==this.state.refreshing){
            this.putInList()
        }
    }

    putInList = () => {
        favv = []
        let a = this.state.favouriteVideos
        if(a!=={}){
            for(const f in a){
                favv.push(a[f])
            }
            let e = this.state.email
            this.setState({email:e})
        }
    }

    getEmail = async () =>{
        try{
            let eml = await AsyncStorage.getItem('current')
            return eml
        }catch(e){
            console.log(e)
        }
    }

    getFavObj = async () => {
        let email = await this.getEmail()
        this.setState({email:email})
        const db = firestore().collection('User');
        db.doc(`${email}`)
        .onSnapshot( (doc) => {
            if (doc.exists) {
                if(doc.data().fav !==null){
                    let favObj = JSON.parse(doc.data().fav)
                    this.setState({favouriteVideos:favObj})
                }else{
                    this.setState({favouriteVideos:{}})
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    navigateToVideo = (obj) =>{
        const {navigation} = this.props
        navigation.navigate('Video' , {result:obj})
    }

    onRefresh = async () =>{
        this.setState({refreshing:true})
        this.componentDidUpdate()
    }
    
    render(){
        if(typeof favv[0] === 'undefined'){
            return(
                <View style={{flex:1}}>
                    <View style = {{justifyContent:'center' , padding:20 , alignItems:'center' , flex:1 , alignContent:'center'}}>
                        <Text style = {{justifyContent:'center' , alignContent:'center' , alignItems:'center' }}>Nothing to Show</Text>
                    </View>
                </View>
            )
        }else{
            return(
                <View style = {{flex:1 , backgroundColor:"#FFFFFF"}}>
                    <FlatList style ={{flex:1}}
                        data = {favv}
                        renderItem = {({item}) => (
                        <TouchableOpacity onPress={() => {this.navigateToVideo(item)}}>
                            <ListComponent snip = {item.snippet}/>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item['id']['videoId']}/>
            </View>
            )
        }
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <Favourite {...props} navigation={navigation} />;
}