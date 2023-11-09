/*****************************************************************************/
/*****************************************************************************/

import { useContext, useEffect, useRef, useState }             from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, Alert} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

import { styles, themeColours } from '../styles/styles';
import { ProfileContext }       from '../context/ProfileContext';
import {
  blankProfile
, validateEmail, validateName, validatePhoneNumber
} from '../utils';

import ProfileImage  from '../components/ProfileImage';
import ProfileOption from '../components/ProfileOption';
import ProfileField  from '../components/ProfileField';

/*****************************************************************************/

const Profile = ({navigation}) => {

  const {
    profileState
  , dispatchProfileChange
  , setIsOnboardingCompleted
  } = useContext(ProfileContext);

  const [validFirstname,   setValidFirstname]   = useState(false);
  const [validLastname,    setValidLastname]    = useState(true);
  const [validEmail,       setValidEmail]       = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);

  const [disabled,         setDisabled]         = useState(true);
  const [savedProfile,     setSavedProfile]     = useState(true);
  const [allowSave,        setAllowSave]        = useState(false);

  const profileRef = useRef(profileState);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:    ImagePicker.MediaTypeOptions.All
    , allowsEditing: true
    , aspect:        [4, 3]
    , quality:       1
    });

    if (!result.canceled) {
      dispatchProfileChange({ data: [['profile_image', result.assets[0].uri]] });
    }
  };

  const triggerClearStorage = async () => {
    const box = ['IsOnboardingCompleted'].concat(
      Object.keys(profileRef.current)
    );
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

  //required fields
  useEffect(() => {
    setValidFirstname(validateName(profileState['firstname']));
  }, [profileState['firstname']]);

  useEffect(() => {
    setValidEmail(validateEmail(profileState['email']));
  }, [profileState['email']]);

  //not required
  useEffect(() => {
    const valid = (profileState['lastname'] === '')
    ? true
    : validateName(profileState['lastname'])
    ;
    setValidLastname(valid);
  }, [profileState['lastname']]);

  useEffect(() => {
    const valid = (profileState['phone_number'] === '')
    ? true
    : validatePhoneNumber(profileState['phone_number'])
    ;
    setValidPhoneNumber(valid);
  }, [profileState['phone_number']]);

  //disable buttons
  useEffect(() => {
    setDisabled(!(validEmail && validFirstname && validLastname && validPhoneNumber))
  }, [validFirstname, validLastname, validEmail, validPhoneNumber]);

  //check if profile fields have changed
  useEffect(() => {
    const filteredKeys = Object.keys(profileState).filter((v) =>
      (profileState[v] !== profileRef.current[v])
    );
    setSavedProfile((filteredKeys.length === 0));
  }, [profileState]);

  //check if the save button is enabled
  useEffect(() => {
    setAllowSave((!savedProfile && !disabled))
  }, [savedProfile, disabled]);

  useEffect(() => {
    //required fields
    setValidFirstname(validateName(profileState['firstname']));
    setValidEmail(validateEmail(profileState['email']));

    //not required
    if (profileState['lastname'] !== '') {
      setValidLastname(validateName(profileState['lastname']));
    }
    if (profileState['phone_number'] !== '') {
      setValidPhoneNumber(validatePhoneNumber(profileState['phone_number']));
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={localStyles.container}>
        <Text style={styles.leadText}>Personal Information</Text>
        <Text style={styles.labelText}>Avatar</Text>
        <View style={localStyles.buttonRow}>
          <ProfileImage
            imageStyle={localStyles.profileImage}
            imageTextStyle={localStyles.profileImageText}
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
        <ProfileField
          valid={validFirstname}
          text={'First Name'}
          warningText={'Firstname is required and must be A-z'}
          textInputProps={{
            id:             'firstname'
          , placeholder:    'First name'
          , value:          profileState['firstname']
          , onChangeText:   (text) => handleChange('firstname', text)
          , autoCapitalize: 'words'
          }}
        />
        <ProfileField
          valid={validLastname}
          text={'Last Name'}
          warningText={'Lastname must be A-z'}
          textInputProps={{
            id:             'lastname'
          , placeholder:    'Last name'
          , value:          profileState['lastname']
          , onChangeText:   (text) => handleChange('lastname', text)
          , autoCapitalize: 'words'
          }}
        />
        <ProfileField
          valid={validEmail}
          text={'Email'}
          warningText={'must be a valid email address'}
          textInputProps={{
            id:           'email'
          , placeholder:  'email@123.com'
          , value:        profileState['email']
          , onChangeText: (text) => handleChange('email', text)
          , keyboardType: 'email-address'
          }}
        />
        <ProfileField
          valid={validPhoneNumber}
          text={'Phone Number'}
          warningText={'must be a valid phone number: 789 555 1234'}
          textInputProps={{
            id:           'phone_number'
          , placeholder:  '7895551234'
          , value:        profileState['phone_number']
          , onChangeText: (text) => handleChange('phone_number', text)
          , keyboardType: 'number-pad'
          }}
        />
        <Text style={styles.leadText}>Email Notifications</Text>
        <ProfileOption
          text={'Order status'}
          checkboxProps={{
            value: profileState['email_orders']
          , onValueChange: (checked) => handleChange('email_orders', checked)
          }}
        />
        <ProfileOption
          text={'Password changes'}
          checkboxProps={{
            value: profileState['email_password_changes']
          , onValueChange: (checked) => handleChange('email_password_changes', checked)
          }}
        />
        <ProfileOption
          text={'Special Offers'}
          checkboxProps={{
            value: profileState['email_specials']
          , onValueChange: (checked) => handleChange('email_specials', checked)
          }}
        />
        <ProfileOption
          text={'Newsletter'}
          checkboxProps={{
            value: profileState['email_newsletter']
          , onValueChange: (checked) => handleChange('email_newsletter', checked)
          }}
        />
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