import * as React from 'react'
import {Header} from '../Header/header.js'
import{StyleSheet , View , TouchableOpacity , ScrollView} from 'react-native'
import {TextInput , Text , Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const styles = StyleSheet.create({
    input:{
        paddingLeft:7,
        paddingRight:7,
        paddingTop:3,
        flex:1
    },
    date:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    }
})

const ref = firestore().collection('User')

export default class SignUp extends React.Component{

    state={
        name: "",
        email: "",
        password: "",
        dob: "Select Date of Birth",
        gender: "Male",
        male : {checked:true , text:"#FFFFFF" , bgcolor:"#7d0633"},
        female: {checked: false , text:"#000000" , bgcolor:"#FFFFFF"},
        other: {checked: false , text:"#000000" , bgcolor:"#FFFFFF"},
        disabledSignUp:true,
        disabledClear:true,
        photo:null,
        createAccount : false
    }

    

    addUser = async () => {
        await ref.doc(`${this.state.email}`).set({
            email:this.state.email,
            name: this.state.name,
            gender:this.state.gender,
            dob:this.state.dob,
        });
      }

    handleChoosePhoto = () => {
        const options = {noData:true }
        ImagePicker.launchImageLibrary(options , async (response)=>{
            this.setState({photo:response.path})
        })
    }

    onDateChange = (date) => {
        this.setState({
          dob: date,
        });
      }

    getHandler = key => value => {
        this.setState({[key]:value})
    }

    validate = ()=>{
        const nameRegx1 = /^\w+$/
        const nameRegx2 = /^\w+\s\w+$/
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
    
        if(nameRegx1.exec((this.state.name.toString()) || nameRegx2.exec(this.state.name.toString())) && emailRegx.exec(this.state.email.toString()) && passwordRegx.exec(this.state.password.toString()) && this.state.photo!==null && this.state.dob!="Select Date of Birth"){
            this.setState({disabledSignUp:false})
        }else{this.setState({disabledSignUp:true})}
    }

    clearDisableHandle = ()=> {
        if(this.state.name==="" && this.state.dob==="" && this.state.email==="" && this.state.password===""&& this.state.photo===null){
            this.setState({disabledClear:true})
        }else{
            this.setState({disabledClear:false})
        }
    }

    maleTouchHandler = ()=>{
        if(this.state.male.checked==false){
            this.setState({male:{checked:true , text:"#FFFFFF" , bgcolor:"#7d0633"} , 
            female:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"},
            other:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"} , gender:"Male"})
        }
    }

    femaleTouchHandler = ()=>{
        if(this.state.female.checked==false){
            this.setState({female:{checked:true , text:"#FFFFFF" , bgcolor:"#7d0633"} , 
            male:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"},
            other:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"} , gender:'Female'})
        }
    }

    otherTouchHandler = ()=>{
        if(this.state.other.checked==false){
            this.setState({other:{checked:true , text:"#FFFFFF" , bgcolor:"#7d0633"} ,
            male:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"}, 
            female:{checked:false , text:"#000000" , bgcolor:"#FFFFFF"}, gender:'Other'})
        }
    }

    clear = () => {
        this.setState({dob:"Select Date of Birth" , name:"" , password:"" , email:"" , photo:null ,disabledSignUp:true ,disabledClear:true})
    }

    signupNew =  () =>{
        auth()
        .createUserWithEmailAndPassword(`${this.state.email}`, `${this.state.password}`)
        .then(async () => {
            console.log('User account created & signed in!');
            await this.uploadImage()
            this.addUser()
            
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
            }

        console.error(error);
        
  });
    }

    goToLogin = () =>{
        this.props.navigation.navigate('Login')
    }

    uploadImage = async () => {
        const image = this.state.photo
        const filename = `${this.state.email}.jpg`

        const task = storage()
        .ref(filename)
        .putFile(image);

        try{
            await task
        }catch(e){
            console.log(e)
        }

    }

    render(){
        
            return(
                <View style={{flex:1}}>
                    <View>
                        <Header title="Sign Up"/>
                    </View>
                    <View style = {{flex:1}}>
                    <ScrollView contentContainerStyle = {{flexGrow:1}}>
                        <TextInput label="Name" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.name} onChangeText={this.getHandler('name')}/>
                        <TextInput label="Email" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.email.trim().toLowerCase()} onChangeText={this.getHandler('email')}/>
                        <TextInput label="Password" secureTextEntry={true} style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                        
                        <Button mode="text" color="#7d0633" onPress={this.handleChoosePhoto}>Choose Profile Picture</Button>
                        
                        {
                            this.state.photo && (<View style = {{alignItems:'center' , justifyContent:'center',flex:1 ,paddingBottom:3}}>
                                <Text style={{fontSize:12 , color:"#aeaeae"}}>(Photo selected successfully!)</Text>
                            </View>)
                        }

                        <View style = {{justifyContent:'center' , alignItems:'center' , flex:1}}>
                        <DatePicker
                        style={{width :250 ,padding:10}}
                        date={this.state.date}
                        mode="date"
                        placeholder={this.state.dob}
                        format="YYYY-MM-DD"
                        minDate="1930-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {this.setState({dob:date})}}
                        />
                        </View>

                        <View style={{flexDirection:'row' , justifyContent:'center' , flex:1}}>
                            <TouchableOpacity onPress={this.maleTouchHandler}>
                                <View style={{padding:10, margin:10, borderWidth:1, borderRadius:5, borderColor:"#7d0633" , backgroundColor:this.state.male.bgcolor}}>
                                    <Text style={{color:this.state.male.text}}> Male </Text>
                                </View>
                            </TouchableOpacity>
    
                            <TouchableOpacity onPress={this.femaleTouchHandler}>
                                <View style={{padding:10, margin:10, borderWidth:1, borderRadius:5, borderColor:"#7d0633" , backgroundColor:this.state.female.bgcolor}}>
                                    <Text style={{color:this.state.female.text}}> Female </Text>
                                </View>
                            </TouchableOpacity>
    
                            <TouchableOpacity onPress={this.otherTouchHandler}>
                                <View style={{padding:10, margin:10, borderWidth:1, borderRadius:5, borderColor:"#7d0633" , backgroundColor:this.state.other.bgcolor}}>
                                    <Text style={{color:this.state.other.text}}> Other </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{justifyContent:'center' , marginLeft:40 , marginRight:40 , marginTop:10 , alignItems:'center' , flex:1}}>
                            <Button mode="contained" color="#1e4f74" style={{margin:5 , width:200 }} disabled={this.state.disabledSignUp} onPress={this.signupNew}>Sign Up</Button>
                            <Button mode="contained" color="#1e4f74" style={{margin:5, width:200}} disabled={this.state.disabledClear} onPress={this.clear}>Clear</Button>
                            <Button mode="contained" color="#1e4f74" style={{margin:5, width:200}} onPress={this.goToLogin}>Login</Button>
                        </View>

                    </ScrollView>
                    </View>
                </View>
    
            )
        
        
       
    }

    componentDidUpdate= (prevProps , prevState)=>{

        if(prevState.name!==this.state.name || prevState.email!==this.state.email || prevState.password!==this.state.password || prevState.dob!==this.state.dob){
            this.validate()
            this.clearDisableHandle()
        }
    }
}
