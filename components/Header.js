/*****************************************************************************/
/*****************************************************************************/

import { useContext }             from 'react';
import { View, Image, StyleSheet, Text, Pressable} from "react-native";

import { getInitials }    from '../utils';
import { ProfileContext } from '../context/ProfileContext';
import { styles, themeColours }   from '../styles/styles';

/*****************************************************************************/

const Header = (navigate) => {

  const {profileState} = useContext(ProfileContext);

  return (
    <View style={localStyles.container}>
      <Pressable
        style={[styles.button, styles.buttonEnabled]}
        onPress={() => navigate.goBack()}
      >
      </Pressable>
      <Image
        style={localStyles.logo}
        source={require('../assets/Logo.png')}
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
      <View>
        {(profileState['profile_image'])
        ? <Image
            style={localStyles.profileImage}
            source={{uri: profileState['profile_image']}}
            accessible={true}
            accessibilityLabel={'User profile picture'}
          />
        : (profileState['firstname'] || profileState['lastname'])
          ? <View style={localStyles.imageTextView}>
              <Text style={localStyles.imageText}>
                {getInitials(profileState['firstname'], profileState['lastname'])}
              </Text>
            </View>
          : null
        }
      </View>
    </View>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  container:  {
    flex: 1
  , flexDirection: 'row'
  , alignItems: 'center'
  , justifyContent: 'space-around'
  }
, logo: {
    width:      '60%'
  , height:     100
  , resizeMode: 'contain'
  }
, profileImage: {
    width:        75
  , height:       75
  , resizeMode:   'contain'
  , borderRadius: 50
  }
, imageTextView: {
    width:          75
  , height:         75
  , justifyContent: 'center'
  , alignItems:     'center'
  , borderRadius:   50
  , backgroundColor: themeColours.p1
  }
, imageText: {
    color:    themeColours.s3
  , fontSize: 28
  }
});

/*****************************************************************************/

export default Header;

/*****************************************************************************/
/*****************************************************************************/