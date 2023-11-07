/*****************************************************************************/
/*****************************************************************************/

import { useContext, useEffect, useRef, useState }      from "react";
import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { StyleSheet, Alert }                            from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import CheckBox         from "expo-checkbox";

import { blankProfile, validateEmail, validateName, validatePhoneNumber } from '../utils';

import { styles, themeColours } from '../styles/styles';
import { ProfileContext }       from '../context/ProfileContext';

import ProfileImage             from '../components/ProfileImage';

/*****************************************************************************/

const Profile = ({navigation}) => {

  const {
    profileState
  , dispatchProfileChange
  , setIsOnboardingCompleted
  } = useContext(ProfileContext);

  const [validFirstname,   setValidFirstname]   = useState(false);
  const [validLastname,    setValidLastname]    = useState(false);
  const [validEmail,       setValidEmail]       = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [disabled,         setDisabled]         = useState(true);
  const [savedProfile,     setSavedProfile]     = useState(true);
  const [allowSave,        setAllowSave]        = useState(false);

  const profileRef = useRef(profileState);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatchProfileChange({ data: [['profile_image', result.assets[0].uri]] });
    }
  };

  const triggerClearStorage = async () => {
    const box = Object.keys(profileRef.current);
    box.push('IsOnboardingCompleted');
    console.log(box);
    try {
      await AsyncStorage.multiRemove(box);
    }
    catch(e) {
      Alert.alert(
        'Storage Error!'
      , 'There was an error clearing your storage. ' + e
      , [{text: 'OK'}]
      );
    }
    finally {
      profileRef.current = {...blankProfile};
      dispatchProfileChange({data: Object.entries(blankProfile)});
      setIsOnboardingCompleted(false);
    }
  };

  const triggerProfileSave = async () => {
    const entries = Object.entries(profileState);
    try {
      await AsyncStorage.multiSet(entries.map((v) => {
        const v1 = v[1];
        if (typeof(v1) !== 'string') {
          v[1] = JSON.stringify(v1);
        }
        return v;
      }));
    }
    catch(e) {
      Alert.alert(
        'Storage Error!'
      , 'There was an error saving your profile. ' + JSON.stringify(e, ' ')
      , [{text: 'OK'}]
      );
    }
    finally {
      profileRef.current = {...profileState};
      Alert.alert(
        'Profile Saved'
      , 'Your profile has been updated successfully.'
      , [{
          text: 'OK'
        , onPress: () => navigation.navigate('Home')
        }]
      );
    }
  };

  const handleChange = (field, value) => {
    dispatchProfileChange({ data: [[field, value]]});
  };

  const discardChanges = () => {
    dispatchProfileChange({ data: Object.entries(profileRef.current) });
  };

  useEffect(() => setValidFirstname(validateName(profileState['firstname'])), [profileState['firstname']]);
  useEffect(() => setValidLastname(validateName(profileState['lastname'])),   [profileState['lastname']]);
  useEffect(() => setValidEmail(validateEmail(profileState['email'])),        [profileState['email']]);
  useEffect(() =>
    setValidPhoneNumber(validatePhoneNumber(profileState['phone_number']))
  , [profileState['phone_number']]);

  useEffect(() => {
    setDisabled(!(validEmail && validFirstname && validLastname && validPhoneNumber))
  }, [validFirstname, validLastname, validEmail, validPhoneNumber]);

  useEffect(() => {
    const filteredKeys = Object.keys(profileState).filter((v) =>
      (profileState[v] !== profileRef.current[v])
    );
    setSavedProfile((filteredKeys.length === 0));
  }, [profileState]);

  useEffect(() => {
    setAllowSave((!savedProfile && !disabled))
  }, [savedProfile, disabled]);

  useEffect(() => {
    setValidFirstname(validateName(profileState['firstname']));
    setValidLastname(validateName(profileState['lastname']));
    setValidEmail(validateEmail(profileState['email']));
    setValidPhoneNumber(validatePhoneNumber(profileState['phone_number']));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={localStyles.container}>
        <Text style={styles.leadText}>Personal Information</Text>
        <Text style={styles.labelText}>Avatar</Text>
        <View style={localStyles.buttonRow}>
          <ProfileImage
            imageStyle={localStyles.profileImage}
            imageStyleText={localStyles.profileImageText}
          />
          <Pressable
            style={[styles.button, styles.buttonEnabled]}
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Change</Text>
          </Pressable>
          <Pressable
            style={[styles.button, (profileState['profile_image'] === '') ? styles.buttonDisabled : styles.buttonEnabled]}
            onPress={() => dispatchProfileChange({ data: [['profile_image', '']] })}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </Pressable>
        </View>
        <Text style={styles.labelText}>First name</Text>
        <TextInput
          style={styles.inputText}
          id={'profile_firstname'}
          placeholder={'Firstname'}
          autoCapitalize='words'
          value={profileState['firstname']}
          onChangeText={(text) => handleChange('firstname', text)}
        />
        {!validFirstname &&
          <Text style={styles.warningText}>Firstname is required and must be A-z</Text>
        }
        <Text style={styles.labelText}>Last name</Text>
        <TextInput
          style={styles.inputText}
          id={'profile_lastname'}
          placeholder={'Lastname'}
          autoCapitalize='words'
          value={profileState['lastname']}
          onChangeText={(text) => handleChange('lastname', text)}
        />
        {!validLastname &&
          <Text style={styles.warningText}>Lastname is required and must be A-z</Text>
        }
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.inputText}
          id={'profile_email'}
          placeholder='email@address.com'
          value={profileState['email']}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType='email-address'
        />
        {!validEmail &&
          <Text style={styles.warningText}>must be a valid email address</Text>
        }
        <Text style={styles.labelText}>Phone Number</Text>
        <TextInput
          style={styles.inputText}
          id={'profile_phone_number'}
          placeholder='9991234567'
          value={profileState['phone_number']}
          onChangeText={(text) => handleChange('phone_number', text)}
          keyboardType='number-pad'
        />
        {!validPhoneNumber &&
          <Text style={styles.warningText}>must be a valid phone number: 17895551234</Text>
        }
        <Text style={styles.leadText}>Email Notifications</Text>
        <View style={localStyles.checkBoxRow}>
          <CheckBox
            style={localStyles.checkbox}
            value={profileState['email_orders']}
            onValueChange={(checked) => handleChange('email_orders', checked)}
          />
          <Text style={localStyles.checkboxText}>Order statuses</Text>
        </View>
        <View style={localStyles.checkBoxRow}>
          <CheckBox
            style={localStyles.checkbox}
            value={profileState['email_password_changes']}
            onValueChange={(checked) => handleChange('email_password_changes', checked)}
          />
          <Text style={localStyles.checkboxText}>Password changes</Text>
        </View>
        <View style={localStyles.checkBoxRow}>
          <CheckBox
            style={localStyles.checkbox}
            value={profileState['email_specials']}
            onValueChange={(checked) => handleChange('email_specials', checked)}
          />
          <Text style={localStyles.checkboxText}>Special Offers</Text>
        </View>
        <View style={localStyles.checkBoxRow}>
          <CheckBox
            style={localStyles.checkbox}
            value={profileState['email_newsletter']}
            onValueChange={(checked) => handleChange('email_newsletter', checked)}
          />
          <Text style={localStyles.checkboxText}>Newsletter</Text>
        </View>
        <Pressable
          style={[styles.button, localStyles.logoutButton]}
          onPress={triggerClearStorage}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
        <View style={localStyles.buttonRow}>
          <Pressable
            style={[styles.button, (savedProfile) ? styles.buttonDisabled : styles.buttonEnabled]}
            onPress ={discardChanges}
          >
            <Text style={styles.buttonText}>Discard Changes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, (allowSave) ? styles.buttonEnabled : styles.buttonDisabled]}
            onPress={triggerProfileSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  container: {
    textAlign: 'left'
  }
, buttonRow: {
    flexDirection:  'row'
  , justifyContent: 'space-around'
  , alignItems:     'center'
  }
, checkBoxRow: {
    flexDirection:  'row'
  , justifyContent: 'flex-start'
  , alignItems:     'center'
  , marginVertical: 8
  }
, checkboxText: {
    textAlignVertical: 'center'
  , fontSize:       18
  , color:         themeColours.p1
  }
, checkbox: {
    marginHorizontal: 20
  }
, profileImage: {
    width:      130
  , height:     130
  }
, profileImageText: {
    fontSize:  48
  }
, logoutButton: {
    backgroundColor: themeColours.p2
  , borderColor:     themeColours.p1
  , color:           themeColours.s2
  , width:           '85%'
  , alignSelf:       'center'
  }
});

/*****************************************************************************/

export default Profile;

/*****************************************************************************/
/*****************************************************************************/