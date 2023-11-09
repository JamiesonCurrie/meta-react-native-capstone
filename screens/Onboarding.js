import { useEffect, useState, useContext } from "react";
import { Text, View, TextInput, Pressable, StyleSheet, Alert } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateEmail, validateName } from '../utils';
import { styles }                      from '../styles/styles';
import { ProfileContext }              from '../context/ProfileContext';

import ProfileField from '../components/ProfileField';

/*****************************************************************************/

const Onboarding = () => {
  const {
    profileState
  , dispatchProfileChange
  , setIsOnboardingCompleted
  } = useContext(ProfileContext);

  const [validFirstname, setValidFirstname] = useState(false);
  const [validEmail,     setValidEmail]     = useState(false);
  const [disabled,       setDisabled]       = useState(true);

  const onNext = async () => {
    const entries = [
      ['firstname', profileState['firstname']]
    , ['email',     profileState['email']    ]
    ];

    try {
      await AsyncStorage.multiSet(
        entries.concat([['IsOnboardingCompleted', 'true']])
      );
    }
    catch(e) {
      Alert.alert(
        'Storage Error!'
      , 'There was an error saving to your device. ' + e
      , [{text: 'OK'}]
      );
    }
    finally {
      setIsOnboardingCompleted(true);
    }
  };

  useEffect(() => {
    setValidFirstname(validateName(profileState['firstname']));
  }, [profileState['firstname']]);

  useEffect(() => {
    setValidEmail(validateEmail(profileState['email']));
  }, [profileState['email']]);

  useEffect(() => {
    const disabled = (!validEmail || !validFirstname) ? true : false;
    setDisabled(disabled);
  }, [validFirstname, validEmail]);

  //useEffect(() => {
  //  setValidFirstname(false);
  //  setValidEmail(false);
  //  setDisabled(true);
  //}, []);

  return (
    <View style={styles.container}>
      <View style={localStyles.top}>
        <Text style={[styles.leadText, localStyles.leadText]}>Let us get to know you</Text>
      </View>
      <View style={localStyles.bottom}>
        <ProfileField
          valid={validFirstname}
          text={'First Name'}
          warningText={'Firstname is required and must be A-z'}
          textInputProps={{
            id:           'firstname'
          , placeholder:  'Your First Name'
          , value:        profileState['firstname']
          , onChangeText: (text) => dispatchProfileChange({ data: [['firstname', text]] })
          }}
        />
        <ProfileField
          valid={validEmail}
          text={'Email'}
          warningText={'must be a valid email address'}
          textInputProps={{
            id:           'email'
          , placeholder:  'email@123.com'
          , keyboardType: 'email-address'
          , value:        profileState['email']
          , onChangeText: (text) => dispatchProfileChange({ data: [['email', text]] })
          }}
        />
        <Pressable
          style={[styles.button, (disabled) ? styles.buttonDisabled : styles.buttonEnabled]}
          disabled={disabled}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  top:  {
    flex: 1
  , justifyContent: 'space-around'
  }
, bottom:  {
    flex: 1
  , justifyContent: 'flex-end'
  }
, leadText: {
    textAlign: 'center'
  }
});

/*****************************************************************************/

export default Onboarding;

/*****************************************************************************/
/*****************************************************************************/