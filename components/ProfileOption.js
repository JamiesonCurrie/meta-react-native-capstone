/*****************************************************************************/
/*****************************************************************************/

import { Text, View, StyleSheet } from 'react-native';

import CheckBox from "expo-checkbox";

import { themeColours } from '../styles/styles';

/*****************************************************************************/

const ProfileOption = ({text, checkboxProps}) => (
  <View style={localStyles.checkBoxRow}>
    <CheckBox style={localStyles.checkbox} {...checkboxProps} />
    <Text style={localStyles.checkboxText}>{text}</Text>
  </View>
);

/*****************************************************************************/

const localStyles = StyleSheet.create({
  checkBoxRow: {
    flexDirection:  'row'
  , justifyContent: 'flex-start'
  , alignItems:     'center'
  , marginVertical: 8
  }
, checkboxText: {
    textAlignVertical: 'center'
  , fontSize:          18
  , color:             themeColours.p1
  }
, checkbox: {
    marginHorizontal: 20
  }
});

/*****************************************************************************/

export default ProfileOption;

/*****************************************************************************/
/*****************************************************************************/