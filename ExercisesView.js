import React from "react";
import { StyleSheet,View, Text,Button,Card,CardView,ScrollView,Modal } from "react-native";

class ExercisesView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      activities: [],
      id: 0
    }
    this.setId = this.setId.bind(this);
  }
  
  setId(id) {
    this.props.setId(id);
  }
  render() {
    let string = "https://cs571.cs.wisc.edu/activities";
    fetch(string, {
            method: 'GET',
            headers: {
              'x-access-token': this.props.token
            }
    })
    .then(res => res.json())
    .then(res => {
      //console.log(res);
      let acts = [];
      for(let i = 0; i < res.activities.length; i++){
        //console.log("calories: ",res.activities[i].calories);
        let list = [];
        list.push(res.activities[i].calories);
        list.push(res.activities[i].date);
        list.push(res.activities[i].duration);
        list.push(res.activities[i].id);
        list.push(res.activities[i].name);
        acts.push(list)
      }
      this.setState({activities: acts});
      //console.log(this.state.activities);
      
    })
    let elements = [];
    for(let i = 0; i < this.state.activities.length; i++){
      elements.push(
      <View>
        <Text>Calories: {this.state.activities[i][0]}</Text>
        <Text>Date: {this.state.activities[i][1]}</Text>
        <Text>Duration: {this.state.activities[i][2]}</Text>
        <Text>Id: {this.state.activities[i][3]}</Text>
        <Text>Name: {this.state.activities[i][4]}</Text>
        <Button
          title="Edit Exercise"
          onPress={() => {
            let id = this.state.activities[i][3];
            this.setId(id);
            this.props.navigation.navigate("Edit Exercise");
          }}
        />
        <Text>{'\n'}</Text>
        
      </View>
      );
    }
    //console.log(elements);
    return (
      
      <ScrollView>
        {elements}
        
        <Button
          title="Add Exercise"
          onPress={() => {
            this.props.navigation.navigate("Add_Exercise")
          }}
        />
        
        <Button
          title="Log out"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </ScrollView>
      
    );
  }
}

export default ExercisesView;
