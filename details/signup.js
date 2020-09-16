import * as React from 'react'
import {Header} from '/home/amay/Desktop/RN/task_one/Header/header.js'
import{StyleSheet , View , TouchableOpacity , ScrollView} from 'react-native'
import {TextInput , Text , Button} from 'react-native-paper'
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    input:{
        padding:5
    },
    date:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    }
})

export default class SignUp extends React.Component{

    state={
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "Male",
        show:0,
        male : {checked:true , text:"#FFFFFF" , bgcolor:"#7d0633"},
        female: {checked: false , text:"#000000" , bgcolor:"#FFFFFF"},
        other: {checked: false , text:"#000000" , bgcolor:"#FFFFFF"},
        disabledSignUp:true,
        disabledClear:true,
    }

    onDateChange = (date) => {
        this.setState({
          dob: date,
          show:0
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
        const dobRegx = /^(Jan)?(Feb)?(Mar)?(Apr)?(May)?(Jun)?(Jul)?(Aug)?(Sep)?(Oct)?(Nov)?(Dec)?\s(\d{2})\s(\d{4})$/

        const dobnew = this.state.dob.toString().substring(4,15);
    
        if(nameRegx1.exec((this.state.name.toString()) || nameRegx2.exec(this.state.name.toString())) && emailRegx.exec(this.state.email.toString()) && passwordRegx.exec(this.state.password.toString()) && dobRegx.exec(dobnew)){
            this.setState({disabledSignUp:false})
        }else{this.setState({disabledSignUp:true})}
    }

    clearDisableHandle = ()=> {
        if(this.state.name==="" && this.state.dob==="" && this.state.email==="" && this.state.password===""){
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
        this.setState({dob:"" , name:"" , password:"" , email:"" , disabledSignUp:true ,disabledClear:true})
    }

    signUpPress = async () => {
        const emailId = this.state.email.toString()
        const obj = {email:this.state.email , name:this.state.name , gender:this.state.gender , password : this.state.password , dob : this.state.dob}

        try{
            const jsonValue = JSON.stringify(obj)
            await AsyncStorage.setItem(emailId, jsonValue)
        }catch(e){
            console.log(e)
        }

        this.props.navigation.goBack()
        
    }

    render(){
        if(this.state.show==0){
            return(
                <View>
                    <View>
                        <Header title="Sign Up"/>
                    </View>
                    <ScrollView>
                        <TextInput label="Name" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.name} onChangeText={this.getHandler('name')}/>
                        <TextInput label="Email" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.email.trim()} onChangeText={this.getHandler('email')}/>
                        <TextInput label="Password" secureTextEntry={true} style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                        <TextInput label="Choose Date of Birth" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} mode="outlined" value={this.state.dob.toString().substring(4,15).trim()} onChangeText={this.getHandler('dob')}/>

                        <View style={{alignItems:'center'}}>
                            <Button mode="outlined" style={{backgroundColor:"1e4f74" , fontSize:20}}  color="#7d0633" onPress={()=>{this.setState({show:1})}}>Choose Date of Birth</Button>
                        </View>
                        
                        <View style={{flexDirection:'row' , justifyContent:'center'}}>
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

                        <View style={{justifyContent:'center' , marginLeft:40 , marginRight:40 , marginTop:10}}>
                            <Button mode="contained" color="#1e4f74" style={{margin:5}} disabled={this.state.disabledSignUp} onPress={this.signUpPress}>Sign Up</Button>
                            <Button mode="contained" color="#1e4f74" style={{margin:5}} disabled={this.state.disabledClear} onPress={this.clear}>Clear</Button>
                        </View>

                    </ScrollView>
                </View>
    
            )
        }else{
            return(
                <View style={styles.date}>
                    <CalendarPicker onDateChange={this.onDateChange}/>
                </View>
            )
        }
       
    }

    componentDidUpdate= (prevProps , prevState)=>{

        if(prevState.name!==this.state.name || prevState.email!==this.state.email || prevState.password!==this.state.password || prevState.dob!==this.state.dob){
            this.validate()
            this.clearDisableHandle()
        }
    }
}
