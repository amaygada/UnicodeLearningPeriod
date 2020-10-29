import * as React from 'react'
import {Image , View, Text} from 'react-native'


export default class AboutUs extends React.Component{

    render(){
        return(
            <View style ={{flex:1 , alignItems:'center' , justifyContent:'center'}}>
                <View style={{padding:10 ,  alignItems:'center'}}>
                    <Text style={{fontSize:25}}>CREATED BY</Text>
                </View>

                <View style={{padding:10 ,  alignItems:'center'}}>
                    <Image source={require('./../../image/amay.jpeg')} style={{ width: 300, height: 400 }} />
                </View>

                <View style={{padding:10 ,  alignItems:'center'}}>
                    <Text style={{fontSize:25}}>Amay Gada</Text>
                </View>

            </View>
    
        )

    }

}
