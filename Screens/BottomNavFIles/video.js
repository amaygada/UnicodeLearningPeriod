import * as React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import {Card , Button} from 'react-native-paper'
import YouTube from 'react-native-youtube';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {YT_API} from '@env'

let favouriteVideos = {}
export class Video extends React.Component{

    state = {
        isReady: false,
        status: "",
        quality: "",
        error: "" , 
        object: null,
        fav:'',
        email : '',
    }

    UNSAFE_componentWillMount = async () => {
        this.setState({object : this.props.route.params.result})
        await this.getFavObj()
        this.checkIfFav(this.props.route.params.result.id['videoId'])
    }

    handleFavourite = (videoId) =>{
        if(this.state.fav==='Add to Favourites'){
            this.addToFavObj(videoId)
            this.setState({fav:'Remove From Favourites'})
        }else if(this.state.fav === 'Remove From Favourites'){
            this.removeFromFav(videoId)
            this.setState({fav:'Add to Favourites'})
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
        .get()
        .then((doc) => {
            if (doc.exists) {
                if(doc.data().fav !==null){
                    let favObj = JSON.parse(doc.data().fav)
                    favouriteVideos = favObj
                }else{
                    favouriteVideos = {}
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    addToFavObj = async (videoId) => {

        const ref = firestore().collection('User')
        favouriteVideos[videoId] = {}
        favouriteVideos[videoId]['id'] = {}
        favouriteVideos[videoId]['snippet'] = this.props.route.params.result['snippet']
        favouriteVideos[videoId]['id']['videoId'] = videoId
        //console.log(favouriteVideos)
        let favString = JSON.stringify(favouriteVideos)
        await ref.doc(this.state.email).update({
            fav:favString
        });
    }

    removeFromFav = async (videoId) => {
        const ref = firestore().collection('User')
        delete favouriteVideos[videoId]
        let favString = JSON.stringify(favouriteVideos)
        await ref.doc(this.state.email).update({
            fav:favString
        });
    }

    checkIfFav = (videoId) => {
        try{
            if(typeof favouriteVideos[videoId] === 'undefined'){
                this.setState({fav:'Add to Favourites'})
            }else{
                this.setState({fav:'Remove From Favourites'})
                //console.log('not undefined')
            }
        }catch(e){
            this.setState({fav:'Add to Favourites'})
        }
    }

    render(){

        let obj = this.props.route.params.result
        const APIKEY = YT_API
        let time = obj.snippet['publishedAt']
        time = time.toString().substring(0,10)
        let Channel = obj.snippet['channelTitle']

        return(
            <View style={styles.container}>
                <Card>
                    <YouTube
                        apiKey={APIKEY}
                        videoId={obj.id['videoId']} // The YouTube video ID
                        play // control playback of video with true/false
                        fullscreen={false} // video should play in fullscreen or inline
                        loop={false} // control whether the video should loop when ended
                        onReady={e => this.setState({ isReady: true })}
                        onChangeState={e => this.setState({ status: e.state })}
                        onChangeQuality={e => this.setState({ quality: e.quality })}
                        onError={e => this.setState({ error: e.error })}
                        style={styles.youtube}
                    />
                    <Text style={{paddingLeft:10, paddingRight:0, paddingTop:3, color:"#2f2f31"}}>{Channel}    --    {time}</Text>
                    <Text style={{paddingLeft:10 , paddingRight:0, paddingTop:3, fontWeight:"bold" , fontSize:17}}>{obj.snippet['title']}</Text>
                    <Card.Actions>
                    <Button style={{backgroundColor:"1e4f74" , fontSize:20}}  color="#7d0633" onPress={()=>{ this.props.navigation.goBack()}}>GO BACK</Button>
                    <Button style={{backgroundColor:"1e4f74" , fontSize:20}}  color="#7d0633" onPress={()=>{ this.handleFavourite(obj.id['videoId']) }}>{this.state.fav}</Button>
                    </Card.Actions>
                
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    youtube: {
        alignSelf: 'stretch',
        height: 300,
        margin:0
    }
});