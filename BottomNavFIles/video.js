import * as React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import {Card , Button} from 'react-native-paper'
import YouTube from 'react-native-youtube';

export class Video extends React.Component{

    state = {
        isReady: false,
        status: "",
        quality: "",
        error: "" , 
        object: null
    }

    UNSAFE_componentWillMount = () => {
        this.setState({object : this.props.route.params.result})
    }

    render(){
        let obj = this.props.route.params.result
        //console.log(obj)
        const APIKEY = 'AIzaSyCZ9bu1mR6GgG5nyc5dYRK97GI_GdMxf2E'
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