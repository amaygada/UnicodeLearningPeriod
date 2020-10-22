import * as React from 'react'
import {View , Text ,Image , StyleSheet , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Card} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import RNRestart from 'react-native-restart'

class Settings extends React.Component{

    state={
        email:""
    }

    UNSAFE_componentWillMount = async() => {
        try{
            let emailVal = await AsyncStorage.getItem('current')
            console.log(emailVal)
            if(emailVal!==null){
                this.setState({email:emailVal})
            }
        }catch(e){
            console.log(e)
        }
    }

    navigateToProfile = () => {
        const {navigation} = this.props
        navigation.navigate('Profile')
    }

    deleteFirebaseImage = () =>{
        var image = storage().ref(`${this.state.email}.jpg`);

        image.delete().then(function() {
          console.log('profile image deleted succesfully')
        }).catch(function(error) {
          console.log('I really can\'t do anything about this')
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
            this.deleteFirebaseImage()
            if (user) {
                user.delete().then(
                    () => {console.log('account deleted')}
                )
            }
        }catch(e){
            console.log(e)
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
            <View style = {{flex:1 , margin:3}}>          
                <TouchableOpacity style={{margin:2}} onPress={this.navigateToProfile}>
                    <Card style={{padding:20 , backgroundColor:"#474747"}}>
                        <Text style = {{fontSize:15 , color:"#ffffff"}}>PROFILE</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{margin:2}} onPress={this.logOut}>
                    <Card style={{padding:20, backgroundColor:"#474747"}}>
                        <Text style = {{fontSize:15 , color:"#ffffff"}}>LOGOUT</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{margin:2}} onPress={this.deleteAccount}>
                    <Card style={{padding:20, backgroundColor:"#474747"}}>
                        <Text style = {{fontSize:15 , color:"#ffffff"}}>DELETE ACCOUNT</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{margin:2}} onPress={this.deleteAccount}>
                    <Card style={{padding:20, backgroundColor:"#474747"}}>
                        <Text style = {{fontSize:15 , color:"#ffffff"}}>ABOUT US</Text>
                    </Card>
                </TouchableOpacity>

            </View>
        )
    }

}

export default function(props) {
    const navigation = useNavigation();
    return <Settings {...props} navigation={navigation} />;
}
