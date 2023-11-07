/*****************************************************************************/
/* Meta React Native Specialization Capstone Project
/*****************************************************************************/

import { useEffect, useState, useReducer } from "react";
import { Image, Pressable, StyleSheet}     from "react-native";

import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { blankProfile }   from './utils';

import { ProfileContext } from './context/ProfileContext';

import SplashScreen from './screens/SplashScreen';
import Onboarding   from './screens/Onboarding'
import Home         from './screens/Home'
import Profile      from './screens/Profile'

import ProfileImage from './components/ProfileImage';

/*****************************************************************************/

const Stack = createNativeStackNavigator();

/*****************************************************************************/

const reduceProfileState = (state, action) => (
  action.data.reduce((a, v) => {
    if (v[1] !== null) {
      a[v[0]] = v[1];
    }
    return a;
  }, {...state})
);

/*****************************************************************************/

const screenOptions = () => ({
  headerTitleAlign: 'center'
, headerTitle: () => (
    <Image
      style={localStyles.logo}
      source={require('./assets/Logo.png')}
      accessible={true}
      accessibilityLabel={'Little Lemon Logo'}
    />
  )
});

/*****************************************************************************/

export default function App() {
  const [isLoading,             setIsLoading]             = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [profileState,          dispatchProfileChange]    = useReducer(
    reduceProfileState
  , blankProfile
  );

  useEffect(() => {
    (async () => {
      try {
        const iobc = await AsyncStorage.getItem('IsOnboardingCompleted');
        if (iobc && (typeof(iobc) === 'boolean')) {
          setIsOnboardingCompleted(iobc);
        }

        const data = await AsyncStorage.multiGet(Object.keys(profileState));
        const profileData = data.map((v) => {
          v[1] = JSON.parse(v[1]);
          return v;
        });

        dispatchProfileChange({data: profileData});
      }
      catch(e) {
        // read error
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (<SplashScreen />);
  }

  return (
    <ProfileContext.Provider
      value={{
        profileState
      , dispatchProfileChange
      , setIsOnboardingCompleted
      }}
    >
      <NavigationContainer>
        {isOnboardingCompleted ? (
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={screenOptions}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={({navigation}) => ({
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate('Profile')}>
                    <ProfileImage
                      imageStyle={localStyles.profileImage}
                      imageTextStyle={localStyles.profileImageText}
                    />
                  </Pressable>
                )
              })}
            />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='Onboarding' component={Onboarding} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ProfileContext.Provider>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  profileImage: {
    width:          65
  , height:         65
  , marginVertical: 5
  }
, profileImageText: {
    fontSize: 24
  }
, logo: {
    width:          250
  , height:         65
  , marginVertical: 5
  , resizeMode:     'contain'
  }
});

/*****************************************************************************/
/*****************************************************************************/