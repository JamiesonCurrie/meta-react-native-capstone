/*****************************************************************************/
/* Meta React Native Specialization Capstone Project
/*****************************************************************************/

import { useEffect, useState, useReducer } from "react";
import { Image, StyleSheet}                from "react-native";
import { NavigationContainer }             from '@react-navigation/native';
import { createNativeStackNavigator }      from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProfileContext }    from './context/ProfileContext';

import Onboarding            from './screens/Onboarding';
import Profile               from './screens/Profile';
import SplashScreen          from './screens/SplashScreen';

import ProfileImage          from './components/ProfileImage';
import { blankProfile } from './utils';

/*****************************************************************************/

const Stack = createNativeStackNavigator();

/*****************************************************************************/

const reduceProfileState = (state, action) => {
  const newState = {...state};
  return action.data.reduce((a, v) => {
    if (v[1] !== null) {
      console.log('H: ', v);
      a[v[0]] = v[1];
    }
    return a;
  }, newState);
};

/*****************************************************************************/

export default function App() {
  const [isLoading,             setIsLoading]             = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [profileState,          dispatchProfileChange]    = useReducer(reduceProfileState, blankProfile);

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

  //headerRight={() => (
  //    <ProfileImage
  //      imageStyle={localStyles.profileImage}
  //      imageTextStyle={localStyles.profileImageText}
  //    />
  //)}

  return (
    <ProfileContext.Provider
      value={{
        profileState
      , dispatchProfileChange
      , setIsOnboardingCompleted
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {(isOnboardingCompleted)
          ? <Stack.Screen
              name="Profile"
              component={Profile}
              headerTitle={() => (
                <Image
                  style={localStyles.logo}
                  source={require('./assets/Logo.png')}
                  accessible={true}
                  accessibilityLabel={'Little Lemon Logo'}
                />
              )}
            />
          : <Stack.Screen
              name='Onboarding'
              component={Onboarding}
              headerTitle={
                <Image
                  style={localStyles.logo}
                  source={require('./assets/Logo.png')}
                  accessible={true}
                  accessibilityLabel={'Little Lemon Logo'}
                />
              }
            />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileContext.Provider>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  profileImage: {
    width:    75
  , height:   75
  }
, profileImageText: {
    fontSize: 24
  }
, logo: {
    width:      '60%'
  , height:     100
  , resizeMode: 'contain'
  }
});

/*****************************************************************************/
/*****************************************************************************/