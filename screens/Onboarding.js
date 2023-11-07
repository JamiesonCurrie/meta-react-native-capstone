import { useEffect, useState, useContext }              from "react";
import { Text, View, TextInput, Pressable, StyleSheet, Alert, Image } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateEmail, validateName } from '../utils';
import { styles }                      from '../styles/styles';
import { ProfileContext }              from '../context/ProfileContext';

/*****************************************************************************/

const Onboarding = () => {
  const {
    profileState
  , dispatchProfileChange
  , setIsOnboardingCompleted
  } = useContext(ProfileContext);

  const [validFirstname, setValidFirstname] = useState(true);
  const [validEmail,     setValidEmail]     = useState(true);
  const [disabled,       setDisabled]       = useState(true);

  const onNext = async () => {
    const entries = [
      ['firstname', profileState['firstname']]
    , ['email',     profileState['email']    ]
    ];

    console.log(entries.concat([['IsOnboardingCompleted', 'true']]));

    try {
      await AsyncStorage.multiSet(
        entries.concat([['IsOnboardingCompleted', 'true']])
      );
    }
    catch(e) {
      Alert.alert(
        'Storage Error!'
      , 'There was an error saving to your device. ' + JSON.stringify(e, ' ')
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

  useEffect(() => {
    setValidFirstname(false);
    setValidEmail(false);
    setDisabled(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={localStyles.top}>
        <Text style={[styles.leadText, localStyles.leadText]}>Let us get to know you</Text>
      </View>
      <View style={localStyles.bottom}>
        <Text style={styles.labelText}>First name</Text>
        <TextInput
          style={styles.inputText}
          id={'firstname'}
          placeholder='Your Name'
          autoCapitalize='words'
          value={profileState['firstname']}
          onChangeText={(text) => dispatchProfileChange({ data: [['firstname', text]] })}
        />
        {!validFirstname &&
          <Text style={styles.warningText}>Firstname is required and must be A-z</Text>
        }
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.inputText}
          id={'email'}
          placeholder='Type your email'
          value={profileState['email']}
          onChangeText={(text) => dispatchProfileChange({ data: [['email', text]] })}
          keyboardType='email-address'
        />
        {!validEmail &&
          <Text style={styles.warningText}>must be a valid email address</Text>
        }
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
  , justifyContent: 'center'
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