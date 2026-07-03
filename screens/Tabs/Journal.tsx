import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';


const Journal = () => {
    return (
    <SafeAreaProvider style={styles.container}>    
      <View style={styles.centeredContent}>
        <Text style={styles.name}>Journal</Text>
      </View>
    </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});

export default Journal;