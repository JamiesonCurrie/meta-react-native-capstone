import { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

import Header from '../components/Header'
import { styles } from '../styles/styles'

import { validateEmail, validateFirstname } from '../utils';

const Onboarding = () => {
  const [firstname,      setFirstname]      = useState('');
  const [validFirstname, setValidFirstname] = useState(true);
  const [email,          setEmail]          = useState('');
  const [validEmail,     setValidEmail]     = useState(true);
  const [disabled,       setDisabled]       = useState(true);

  useEffect(() => {
    setValidFirstname(validateFirstname(firstname));
  }, [firstname]);

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setDisabled(!validEmail || !validFirstname);
  }, [validFirstname, validEmail]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={localStyles.container}>
        <Text style={styles.leadText}>Let us get to know you</Text>
        <Text style={styles.labelText}>First name</Text>
        <TextInput
          style={styles.inputText}
          id={'firstname'}
          placeholder='Your Name'
          value={firstname}
          onChangeText={setFirstname}
        />
        {!validFirstname &&
          <Text style={styles.warningText}>Firstname is required and must be A-z</Text>
        }
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.inputText}
          id={'email'}
          placeholder='Type your email'
          value={email}
          onChangeText={setEmail}
        />
        {!validEmail &&
          <Text style={styles.warningText}>must be a valid email address</Text>
        }
        <Pressable
        style={[styles.button, (disabled) ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={disabled}
        onPress={() => alert('You Pressed the button!')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container:  {
    flex: 2
  , justifyContent: 'flex-end'
  }
});

export default Onboarding;