import { useEffect, useState, createContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding   from './screens/Onboarding';
import Profile      from './screens/Profile';
import SplashScreen from './screens/SplashScreen';

import { OnboardingContext } from './context/OboardingContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const iobc = await AsyncStorage.getItem('@littlelemon_IsOnboardingCompleted');
        setIsOnboardingCompleted(iobc);
      } catch(e) {
        // read error
      }

      try {
        const fn = await AsyncStorage.getItem('@littlelemon_firstname');
        setFirstname(fn);
      } catch(e) {
        // read error
      }

    })();

    setIsLoading(false);
  }, []);

  return (
    <OnboardingContext.Provider value={setIsOnboardingCompleted} >
      <NavigationContainer>
        <Stack.Navigator>
          { (isLoading)
          ? (<Stack.Screen name="Splash" component={SplashScreen} />)
          : ((isOnboardingCompleted)
            ? (<Stack.Screen name="Profile" component={Profile} />)
            : (<Stack.Screen name='Onboarding' component={Onboarding} />)
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </OnboardingContext.Provider>
  );
};