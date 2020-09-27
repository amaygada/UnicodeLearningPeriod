import * as React from 'react'
import {View , Text , StyleSheet , TouchableOpacity, Alert} from 'react-native'
import {Button , TextInput} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import {Parent} from '../BottomNavFIles/parent.js'
import {Header} from '../Header/header.js'
 
const styles = StyleSheet.create({
    input:{
        padding:15
    }
})
export class Login extends React.Component{

    state = {
        email:"",
        password:"",
        disableLogin:true,
        disableCLear:true,
        login:0
    }

    getLoginState = async () =>{
        try{
            let val = await AsyncStorage.getItem('Login')
            if(val!==null){
                if(val==='yes')
                this.setState({login : 1})
            }else{
                this.setState({login : 0})
            }
        }catch(e){
            console.log(e)
        }
    }

    //before components mount set login state to whatever there is in asyncstorage Login
    UNSAFE_componentWillMount = async () =>{
        await this.getLoginState()
    }

    validate = () => {
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/

        if(emailRegx.exec(this.state.email.toString()) && passwordRegx.exec(this.state.password.toString())){
            this.setState({disableLogin:false})
        }else{this.setState({disableLogin:true})}
    }

    clearDisableHandler = () => {
        if(this.state.email==="" && this.state.password === ""){
            this.setState({disableCLear:true})
        }else{
            this.setState({disableCLear:false})
        }
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    clear = () => {
        this.setState({email:"" , password:""})
    }

    createAccountPress = () => {
        this.props.navigation.navigate('Sign Up')
    }

    loginPress = async () => {
        //get data from async storage and check with email of this state.
        try {
            const jsonValue = await AsyncStorage.getItem(this.state.email.toString())

            let obj ={}

            if(jsonValue!==null){obj = JSON.parse(jsonValue)}else{obj={}}

            if(obj!=={} && obj.email === this.state.email && obj.password===this.state.password){
                console.log('Success')

                await AsyncStorage.setItem('current' , jsonValue)
                await AsyncStorage.setItem('Login' , 'yes' )

                this.setState({login:1})

            }else{
                alert('Incorrect Credentils!')
            }

          } catch(e) {
            console.log(e)
            console.log(`Login Failed due to ${e}`)
            alert('Incorrect Credentils!')
          }

    }



    render(){
        if(this.state.login===0){
            return(
                <View>

                     <View>
                        <Header title="Login"/>
                    </View>

                    <View style={styles.container}>
                    <TextInput label="Email" style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.email.trim()} onChangeText={this.getHandler('email')}/>
                    <TextInput label="Password" secureTextEntry={true} style={styles.input} theme={{ colors: { primary: '#1e5f74',underlineColor:'transparent',}}} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                    </View>
    
                    <View style={{justifyContent:'center' , marginLeft:40 , marginRight:40 , marginTop:20}}>
                        <Button mode="contained" color="#1e4f74" style={{margin:10}} disabled={this.state.disableLogin} onPress={this.loginPress}>Login</Button>
                        <Button mode="contained" color="#1e4f74" style={{margin:10}} disabled={this.state.disableCLear} onPress={this.clear}>Clear</Button>
                    </View>
    
                    <View style={{alignItems:'center' , marginTop:15}}>
                        <TouchableOpacity onPress={this.createAccountPress}>
                            <Text style={{fontSize:17 , color:"#7d0633"}}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:12 , color:"#aeaeae"}}>(Don't have an account?)</Text>
                    </View>
                </View>
            )
        }else if(this.state.login===1){
            return(
                <Parent/>
            )
        }
    }

    componentDidUpdate= (prevProps , prevState)=>{

        if(prevState.email!==this.state.email || prevState.password!==this.state.password){
            this.validate()
            this.clearDisableHandler()
        }
    }
}