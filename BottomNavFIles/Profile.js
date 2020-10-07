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
        .get()
        .then((doc) => {
            if (doc.exists) {
                this.setState({email:doc.data().email ,dob:doc.data().dob , gender:doc.data().gender , name:doc.data().name})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }


    logOut = async () =>{
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
            RNRestart.Restart()
        });
        
    }

    deleteAccount = async ()=>{
        const user = auth().currentUser;
        try{
            this.deleteFirestoreDoc()
            if (user) {
                user.delete().then(
                    () => {console.log('account deleted')}
                )
            }
        }catch(e){
        alert('Login again to perform this operation!')
        }
    }

    deleteFirestoreDoc = () => {
        const db = firestore().collection('User');
        db.doc(`${this.state.email}`).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    render(){
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
                        <Button  color="#1e4f74" style = {{marginTop:10}} mode="outlined" onPress={this.logOut}>Logout</Button>
                        <Button  color="#1e4f74" style = {{marginTop:10}} mode="outlined" onPress={this.deleteAccount}>Delete Account</Button>
                        <Text style={{fontSize:12,padding:3 , color:"#aeaeae"}}>(LOGIN AGAIN TO DELETE ACCOUNT)</Text>
                    </View>
            </View>
        )
    }

}
