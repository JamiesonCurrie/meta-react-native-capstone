/*****************************************************************************/
/*****************************************************************************/

import { useContext }                   from 'react';
import { View, Image, StyleSheet, Text} from "react-native";

import { getInitials }    from '../utils';
import { themeColours }   from '../styles/styles';

import { ProfileContext } from '../context/ProfileContext';


/*****************************************************************************/

const ProfileImage = ({imageStyle, imageStyleText}) => {

  const {profileState} = useContext(ProfileContext);

  return (
    <View>
      {(profileState['profile_image'])
      ? <Image
          style={[imageStyle, localStyles.image]}
          source={{uri: profileState['profile_image']}}
          accessible={true}
          accessibilityLabel={'User profile picture'}
        />
      : (profileState['firstname'] || profileState['lastname'])
        ? <View style={[imageStyle, localStyles.imageTextView]}>
            <Text style={[imageStyleText, localStyles.imageText]}>
              {getInitials(profileState['firstname'], profileState['lastname'])}
            </Text>
          </View>
        : null
      }
    </View>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  image:  {
    borderRadius:   50
  , resizeMode:     'contain'
  }
, imageTextView: {
    backgroundColor: themeColours.p1
  , borderRadius:   100
  , alignItems:     'center'
  , justifyContent: 'center'
  }
, imageText: {
    textAlign: 'center'
  , color:     themeColours.s3
  }
});

/*****************************************************************************/

export default ProfileImage;

/*****************************************************************************/
/*****************************************************************************/
