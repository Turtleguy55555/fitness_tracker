import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class SignupView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Username" onChangeText ={(username)=>this.setState({username})} value = {this.state.username}/>
        <TextInput style={styles.input} placeholder="Password" onChangeText ={(password)=>this.setState({password})} value = {this.state.password}/>
        <Button title="Sign up" onPress={() => {
          if(this.state.password.length <= 5){
            alert("Password too short!");
          }else{
            fetch('https://cs571.cs.wisc.edu/users', {
              method: 'POST',
              headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                username: this.state.username,
                password: this.state.password
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              alert(responseJson.message);
              if(responseJson.message == 'User created!'){
                
                this.props.navigation.navigate("Login");
              }else{
                
              }
              
            })
            
          }
          
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default SignupView;
