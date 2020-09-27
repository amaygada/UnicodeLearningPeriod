import * as React from 'react'
import {View , Text} from 'react-native'
import {Card} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';


export let ListComponent = (props) =>{

    const picture = props.snip.thumbnails.high['url']
    let time = props.snip['publishedAt']
    const title = props.snip['title']
    time = time.toString().substring(0,10)
    const channel = props.snip['channelTitle']

    return(
        <Card style={{margin:10 , elevation:10}}>
            <Card.Cover source={{ uri: picture}} />
            <View style = {{flexDirection:'row' , paddingRight:10 , paddingLeft:10 , paddingTop:10 }}>
                <Icon name="user-circle" size={30} color="#900" style={{paddingTop:5 , paddingRight:10 , paddingLeft:10}}/>
                <View style={{flex:1}}>
                    <Text style = {{paddingTop:5 , fontSize:15, flex:1 ,flexWrap:'wrap'}}>{title}</Text>
                    <Text style={{textAlign:'left',paddingBottom:5,paddingTop:3 , color:"#808080" }}>{channel}   -   {time}</Text>
                </View>   
            </View>
        </Card>
    )
}
