import { useEffect, useState, useContext }              from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

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

    try {
      await AsyncStorage.multiSet(
        entries.concat(['IsOnboardingCompleted', 'true'])
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
    setDisabled((!validEmail || !validFirstname));
  }, [validFirstname, validEmail]);

  useEffect(() => {
    setValidFirstname(true);
    setValidEmail(true);
    setDisabled(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={localStyles.container}>
        <Text style={[styles.leadText, localStyles.leadText]}>Let us get to know you</Text>
        <Text style={styles.labelText}>First name</Text>
        <TextInput
          style={styles.inputText}
          id={'firstname'}
          placeholder='Your Name'
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
  container:  {
    flex: 2
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