import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import Add from './screens/Tabs/Add';
import Analytics from './screens/Tabs/Analytics';
import Home from './screens/Tabs/Home';
import Journal from './screens/Tabs/Journal';
import Profile from './screens/Tabs/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="LandingPage" component={LandingScreen} />
      <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" >
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({focused}) => (<Image source={require('./Images/home.png')} style={{height: 30, width: 30}}/>)}} />
      <Tab.Screen name="Journal" component={Journal}options={{tabBarIcon: ({focused}) => (<Image source={require('./Images/home.png')} style={{height: 30, width: 30}}/>)}} />
      <Tab.Screen name="Add" component={Add} options={{tabBarIcon: ({focused}) => (<Image source={require('./Images/home.png')} style={{height: 30, width: 30}}/>)}} />
      <Tab.Screen name="Analytics" component={Analytics} options={{tabBarIcon: ({focused}) => (<Image source={require('./Images/home.png')} style={{height: 30, width: 30}}/>)}} />
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({focused}) => (<Image source={require('./Images/home.png')} style={{height: 30, width: 30}}/>)}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}