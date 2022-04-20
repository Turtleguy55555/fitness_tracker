import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class ProfileView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: '',
      lname: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      activity: '',
    }
  }
  componentDidMount(){
    let string = "https://cs571.cs.wisc.edu/users/"+this.props.username;
    console.log(string);
    console.log(this.props.token);
    fetch(string, {
            method: 'GET',
            headers: {
              'x-access-token': this.props.token
            }
          })
            .then(res => res.json())
            .then(res => {
              
              if (res) {
                console.log(res);
                this.setState({fname:res.firstName});
                this.setState({lname:res.lastName});
                if(res.goalDailyCalores !== null){
                  this.setState({calories:res.goalDailyCalories.toString()});
                }else{
                  this.setState({calories:''});
                }
                if(res.goalDailyProtein !== null){
                  this.setState({protein:res.goalDailyProtein.toString()});
                }else{
                  this.setState({protein:''});
                }

                if(res.goalDailyFat !== null){
                  this.setState({fats:res.goalDailyFat.toString()});
                }else{
                  this.setState({fats:''});
                }
                
                if(res.goalDailyCarbohydrates !== null){
                  this.setState({carbs:res.goalDailyCarbohydrates.toString()});
                }else{
                  this.setState({carbs:''});
                }
                
                if(res.goalDailyActivity !== null){
                  this.setState({activity:res.goalDailyActivity.toString()});
                }else{
                  this.setState({activity:''});
                }
                
              } else {
                alert("Something went wrong!");
              }
            })
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Profile View</Text>
        <Text>First Name</Text>
        <TextInput style={styles.input} placeholder = {this.state.fname} onChangeText ={(fname)=>this.setState({fname})} />
        <Text>Last Name</Text>
        <TextInput style={styles.input} placeholder = {this.state.lname} onChangeText ={(lname)=>this.setState({lname})}/>
        <Text style = {styles.title}>Fitness Goals</Text>
        <Text>Daily Calories (Kcal)</Text>
        <TextInput style={styles.input} placeholder = {this.state.calories} onChangeText ={(calories)=>this.setState({calories})}/>
        <Text>Daily Protein (grams)</Text>
        <TextInput style={styles.input} placeholder = {this.state.protein} onChangeText ={(protein)=>this.setState({protein})}/>
        <Text>Daily Carbs (grams)</Text>
        <TextInput style={styles.input} placeholder = {this.state.carbs} onChangeText ={(carbs)=>this.setState({carbs})}/>
        <Text>Daily Fats (grams)</Text>
        <TextInput style={styles.input} placeholder = {this.state.fats} onChangeText ={(fats)=>this.setState({fats})}/>
        <Text>Daily Activity (mins)</Text>
        <TextInput style={styles.input} placeholder = {this.state.activity} onChangeText ={(activity)=>this.setState({activity})}/>

        <Button
          title="Log out"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Exercises"
          onPress={() => this.props.navigation.navigate("Exercise")}
        />
        <Button
          title="Save Profile"
          onPress={() => {
            alert("Saved");
            let string = "https://cs571.cs.wisc.edu/users/"+this.props.username;
            console.log("firstname: " + this.state.fname)
            fetch(string,{
              method: 'PUT',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'x-access-token': this.props.token
              },
              body: JSON.stringify({
                firstName: this.state.fname,
                lastName : this.state.lname,
                goalDailyCalories: parseFloat(this.state.calories),
                goalDailyProtein:parseFloat(this.state.protein),
                goalDailyCarbohydrates: parseFloat(this.state.carbs),
                goalDailyFat: parseFloat(this.state.fats),
                goalDailyActivity:parseFloat(this.state.activity)
              })
            })
            .then(res => res.json())
            .then(res => {
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

export default ProfileView;
