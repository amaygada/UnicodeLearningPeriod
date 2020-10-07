import * as React from 'react'
import {View , Text} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

let favouriteVideos = {}

export class Favourite extends React.Component{

    state = {
        email : ''
    }

    ComponentWillMount = async () => {
        await this.getFavObj()
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
                    console.log(favObj)
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
    
    render(){
        return(
            <View style={{backgroundColor:"#fff" , flex:1}}>
                <Text>hi</Text>
            </View>
        )
    }
}