import * as React from 'react'
import {View , Text ,Image , StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart'
import storage from '@react-native-firebase/storage'

const styles = StyleSheet.create({
    text:{
        fontSize:18,
        color : "#74431e",
        padding:5
    }
})

export class Profile extends React.Component{
    state = {
        email:'',
        dob : '',
        gender: '',
        photo: null,
        name: ''
    }

    UNSAFE_componentWillMount = async() => {
        try{
            let emailVal = await AsyncStorage.getItem('current')
            console.log(emailVal)
            if(emailVal!==null){
                this.setState({email:emailVal})
                this.getUserData()
                this.getImage()
            }
        }catch(e){
            console.log(e)
        }
    }

    getImage = async () => {
        const url = await storage()
        .ref(`${this.state.email}.jpg`)
        .getDownloadURL();
        this.setState({photo:url})
    }

    getUserData = () => {
        const db = firestore().collection('User');
        db.doc(`${this.state.email}`)
        .onSnapshot((doc) => {
            if (doc.exists) {
                this.setState({email:doc.data().email ,dob:doc.data().dob , gender:doc.data().gender , name:doc.data().name})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    render(){
        if(this.state.photo!=null || this.state.name!='' || this.state.email!='' || this.state.dob!='' || this.state.gender!=''){
            return(
                <View style={{backgroundColor:"#fff" , flex:1 , justifyContent:'center'}}>          
                       <View style={{justifyContent:'center' , alignItems:'center' , margin:20 }}>
                            {this.state.photo && (
                                <Image
                                source={{ uri: this.state.photo}}
                                style = {{width:200 , height:200}}
                               />
                            )}
                            <Text style={styles.text}> Name : {this.state.name} </Text>
                            <Text style={styles.text}> Email Id : {this.state.email} </Text>
                            <Text style={styles.text}> Gender : {this.state.gender} </Text>
                            <Text style={styles.text}> DOB : {this.state.dob}</Text>
                            <Button  color="#373737" style = {{marginTop:10}} mode="contained" onPress={()=>{this.props.navigation.goBack()}}>Go Back</Button>
                        </View>
                </View>
            )
        }else{
            return(
                <View style = {{flex:1}}>
                    <View style = {{justifyContent:'center' , padding:20 , alignItems:'center' , flex:1 , alignContent:'center'}}>
                        <Text style = {{justifyContent:'center' , alignContent:'center' , alignItems:'center' }}>LOADING...</Text>
                        <Text style = {{justifyContent:'center' , alignContent:'center' , alignItems:'center' , color:"#aeaeae" , fontSize:15 }}>(Login again if the page doesn't load)</Text>
                    </View>
                </View>
            )
        }
       
    }

}
//<Button style={{backgroundColor:"1e4f74" , fontSize:20}}  color="#7d0633" onPress={()=>{ this.props.navigation.goBack()}}>GO BACK</Button>