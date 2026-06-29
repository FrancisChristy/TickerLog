import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';


export default function LandingScreen() {
  const navigation = useNavigation();  
  return (
    <SafeAreaProvider style={styles.container}>
      <TouchableOpacity onPress={() => {
        console.log("Button Pressed")
        
      }}>
        <View style={styles.topRightContainer}>
          {/* <Text style={styles.add}>Add</Text> */}
          <Image 
            source={require('../Images/circle-plus latest.png')}
            style={styles.tinyLogo}
          />
        </View> 
      </TouchableOpacity>     
      <View style={styles.centeredContent}>
        <Text style={styles.name}>LandingScreen</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }, 
  topRightContainer: {
    position: 'absolute',  // Removes the view from normal layout flow
    top: 650,               // Distance from the top of the screen/SafeArea
    right: 15,             // Distance from the right edge of the screen
    flexDirection: 'row',  // Places text and image side-by-side
    alignItems: 'center',  // Vertically centers the text with the image
  },
  add: {
    color: 'white',
    fontSize: 20,
    marginRight: 10
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: 'white',
    fontSize: 40
  },
  tinyLogo: {
    // position: 'absolute',  // Breaks out of normal layout flow
    // top: 60,               // Distance from the top (adjust for status bars if needed)
    // right: 20,             // Distance from the right edge
    width: 70,
    height: 70,
  }
});