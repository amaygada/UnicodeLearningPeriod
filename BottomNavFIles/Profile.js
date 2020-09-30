import * as React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import RNRestart from 'react-native-restart'

const styles = StyleSheet.create({
    text:{
        fontSize:18,
        color : "#74431e",
        padding:5
    }
})

export class Profile extends React.Component{
    // state = {
    //     obj:{},
    // }

    // UNSAFE_componentWillMount = async() => {
    //     try{
    //         let jsonValue = await AsyncStorage.getItem('current')
    //         let o ={}
    //         if(jsonValue!==null){
    //             o = JSON.parse(jsonValue)
    //         }else{o={}}

    //         if(o!=={}){
    //             this.setState({obj:o})
    //         }
    //     }catch(e){
    //         console.log(e)
    //     }

    // }


    logOut = async () =>{
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
            RNRestart.Restart()
        });
        
    }


    render(){
        return(
            <View style={{backgroundColor:"#fff" , flex:1 , justifyContent:'center'}}>          
                   <View style={{justifyContent:'center' , alignItems:'center' , margin:20 }}>
                        <Button  color="#1e4f74" style={{margin:50}} mode="outlined" onPress={this.logOut}>Logout</Button>
                    </View>
            </View>
        )
    }

}

/*
<Text style={styles.text}> Name : {this.state.obj.name} </Text>
                        <Text style={styles.text}> Email Id : {this.state.obj.email} </Text>
                        <Text style={styles.text}> Gender : {this.state.obj.gender} </Text>
                        <Text style={styles.text}> Paassword : {this.state.obj.password}</Text>
                         */