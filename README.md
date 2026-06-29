commands : 
	Start the app - "npx react-native start"

Create a new project : 
	"npx @react-native-community/cli@latest init"


Once project is created, run the following : 

	1. npm start
	2. build the app in a separate terminal, run "npm run android"


Install navigator for screens : 

	1. npm install @react-navigation/native @react-navigation/native-stack
	2. npm install react-native-screens react-native-safe-area-context


If getting "react native can t find viewmanager rnsscreencontentwrapper" error, do the following after terminating all the command lines:

	1.npm install react-native-screens react-native-safe-area-context
	2.cd android
	3. ./gradlew clean
	4. cd ..
	5. npx react-native start --reset-cache
	6. npx react-native run-android
	
	
Bottom Tab Navigator : 

Documentation :- https://reactnavigation.org/docs/bottom-tab-navigator/?config=static


React Navigation Documentation : https://reactnavigation.org/docs/hello-react-navigation?config=dynamic




