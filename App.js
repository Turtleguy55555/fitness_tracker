import 'react-native-gesture-handler';
import React from "react";

import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";
import ExercisesView from "./ExercisesView";
import AddExerciseView from "./AddExerciseView";
import EditExerciseView from "./EditExerciseView";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Review the navigators from React Native 2 lecture.
const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)
const Drawer = createDrawerNavigator(); // Drawer Navigator (https://reactnavigation.org/docs/drawer-navigator)

class App extends React.Component {
  constructor() {
    super();

    // Feel free to add more states here
    this.state = {
      accessToken: undefined,
      username: '',
      password: '',
      token: '',
      id: ''
    };

    this.setInfo = this.setInfo.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.setId = this.setId.bind(this);

  }
  setToken(tok) {
    this.setState({token:tok})
  }
  getToken(){
    console.log("app token: "+this.state.token);
    return this.state.token;
  }
  setInfo(u, p) {
    console.log(u + " " + p);
    this.setState({username:u});
    this.setState({password:p});
  }
  // Set the access token
  setAccessToken = (newAccessToken) => {
    this.setState({ accessToken: newAccessToken });
  };
  setId(ider) {
    this.setState({id:ider})
  }
  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* We only want to show Login and Signup View when the user is not logged in.
              When the user is logged in, we want to show the Profile View and the Exercises View.
              
              How do we do this? See https://reactnavigation.org/docs/auth-flow
            */}
            

            <Stack.Screen name="Login">
              {/* This is how you pass props (e.g. setAccessToken) to another component */}
              {(props) => (
                <LoginView 
                  setInfo = {this.setInfo}
                  setToken = {this.setToken}
                  {...props} setAccessToken={this.accessToken} />
              )}
            </Stack.Screen>


            {/* If you do not need to pass props, you can pass a component as a `component` prop to Screens like below */}
            <Stack.Screen name="SignUp" component={SignupView} />
          
            {/* We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
              See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.
            */}
            <Stack.Screen name="Profile">
              {(props) => <ProfileView 
              username = {this.state.username} 
              password = {this.state.password}
              token = {this.state.token}
              {...props} />}
            </Stack.Screen>

            <Stack.Screen name="Exercise">
              {(props) => <ExercisesView 
              username = {this.state.username} 
              password = {this.state.password}
              token = {this.state.token}
              setId = {this.setId}
              {...props} />}
            </Stack.Screen>

            <Stack.Screen name = "Add_Exercise">
              {(props) => <AddExerciseView
              username = {this.state.username} 
              password = {this.state.password}
              token = {this.state.token}
              {...props}
              />}
            </Stack.Screen>

            <Stack.Screen name = "Edit Exercise">
              {(props) => <EditExerciseView
              username = {this.state.username} 
              password = {this.state.password}
              token = {this.state.token}
              id = {this.state.id}
              {...props}
              />}
            </Stack.Screen>
          
          

          

          
        </Stack.Navigator>
      </NavigationContainer>
    );
    
    
  }
}

export default App;
