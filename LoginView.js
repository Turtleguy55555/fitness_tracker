import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64
import { NavigationContainer } from "@react-navigation/native";

class LoginView extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.setInfo = this.setInfo.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setInfo() {
    this.props.setInfo(this.state.username, this.state.password);
  }
  setToken(tok) {
    this.props.setToken(tok);
  }

  render() {
    console.log("app: ", this.state.token);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fitness Tracker</Text>
        <Text style={styles.title}> Log in or sign up to continue</Text>
        <TextInput style={styles.input} placeholder="Username" onChangeText ={(username)=>this.setState({username})} value = {this.state.username}/>
        <TextInput style={styles.input} placeholder="Password" onChangeText ={(password)=>this.setState({password})} value = {this.state.password}/>

        {/* To navigate to another component, use this.props.navigation.navigate().
            See https://reactnavigation.org/docs/navigating for more details.
          */}
        
        <Button title="Login" onPress={() => {
          
          //alert(base64.encode(this.state.username + ":" + this.state.password));
          fetch('https://cs571.cs.wisc.edu/login', {
            method: 'GET',
            headers: {
              'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
            }
          })
            .then(res => res.json())
            .then(res => {
              if (res.token) {
                //alert("yes");
                this.setToken(res.token);
                this.setInfo();
                this.props.navigation.navigate("Profile");
                
                console.log("res token: " + res.token);
                

              } else {
                alert("Incorrect username or password! Please try again.");
              }
            })
            /*
            .catch(function(error){
              alert("error");
            });
            */
            

          
          //this.props.navigation.navigate("Profile")
        }
        } />
        <Button title="Sign up" onPress={() => this.props.navigation.navigate("SignUp")} />
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

export default LoginView;
