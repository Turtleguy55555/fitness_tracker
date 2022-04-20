import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64
import { NavigationContainer } from "@react-navigation/native";

class EditExerciseView extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      duration: '',
      calories: '',
      date: ''
    }

  }

  componentDidMount(props){
    let currentdate = new Date();
    
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
    console.log(datetime);
    let string = "https://cs571.cs.wisc.edu/activities/"+this.props.id;
    
    fetch(string,{
        method: 'GET',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'x-access-token': this.props.token
        }
        
    })
    .then(res => res.json())
    .then(res => {
        this.setState({name:res.name});
        this.setState({duration:res.duration.toString()});
        this.setState({calories:res.calories.toString()});
        
        
    })
  }

  

  render() {
    console.log(this.state.name);
    
    return (
      <View style={styles.container}>
        <Text>Exercise Name:</Text>
        <TextInput style={styles.input} placeholder = {this.state.name} onChangeText ={(name)=>this.setState({name})} value = {this.state.name}/>
        <Text>Duration (minutes):</Text>
        <TextInput style={styles.input} placeholder = {this.state.duration} onChangeText ={(duration)=>this.setState({duration})} value = {this.state.duration}/>
        <Text>Calories Burnt:</Text>
        <TextInput style={styles.input} placeholder = {this.state.calories} onChangeText ={(calories)=>this.setState({calories})} value = {this.state.calories}/>
        <Button
          title="Save Exercise"
          onPress={() => {
            alert("Saved");
            let currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            console.log(datetime);
            let string = "https://cs571.cs.wisc.edu/activities/" + this.props.id;
            
            fetch(string,{
              method: 'PUT',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'x-access-token': this.props.token
              },
              body: JSON.stringify({
                name: this.state.name,
                duration: parseFloat(this.state.duration),
                calories: parseFloat(this.state.calories),
                date: currentdate.toLocaleTimeString()
                
              })
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              this.props.navigation.navigate("Exercise");
              
            })
          }}
        />
        <Button
          title="Nevermind"
          onPress={() => {
              this.props.navigation.navigate("Exercise");
          }}
        />
        <Button
          title="Delete Exercise"
          onPress={() => {
            let string = "https://cs571.cs.wisc.edu/activities/" + this.props.id;
            
            fetch(string,{
                method: 'DELETE',
                headers:{
                  'x-access-token': this.props.token
                }
                
                  
                
              })
              .then(res => res.json())
              .then(res => {
                alert("Deleted Exercise");
                console.log(res);
                this.props.navigation.navigate("Exercise");
                
              })
              
          }}
        />
            
          
       
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

export default EditExerciseView;
