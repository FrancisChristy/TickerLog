import React, {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, onChangeEmail]= useState('')
  const [password, onChangePassword] = useState('')
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.name}>TickerLog</Text>
      </View>
      <View style={styles.centeredInput}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          textContentType ="emailAddress"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          textContentType ="password"
          secureTextEntry={true}
        />
      </View>  
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => {
            console.log('Button Pressed');
            navigation.navigate('LandingPage');
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topRightContainer: {
    // position: 'absolute',  // Removes the view from normal layout flow
    // top: 650,               // Distance from the top of the screen/SafeArea
    // right: 15,             // Distance from the right edge of the screen
    justifyContent: 'center', // Places text and image side-by-side
    alignItems: 'center',
    width: 70,
    height: 40, // Vertically centers the text with the image
  },
  add: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 140
  },
  centeredInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 190
  },  
  name: {
    color: 'white',
    fontSize: 40,
  },
  tinyLogo: {
    // position: 'absolute',  // Breaks out of normal layout flow
    // top: 60,               // Distance from the top (adjust for status bars if needed)
    // right: 20,             // Distance from the right edge
    width: 70,
    height: 70,
  },
  button: {
    backgroundColor: '#007AFF', // Classic iOS blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android devices
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#474747',
    width: 370,
    borderRadius: 17,
    paddingLeft: 15,
  },
});
