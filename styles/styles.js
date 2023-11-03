/*****************************************************************************/

import { StyleSheet} from "react-native";

/*****************************************************************************/

export const themeColours = {
  p1: '#495E57'
, p2: '#F4CE14'
, s1: '#EE9972'
, s2: '#FBDABB'
, s3: '#EEEEEE'
, s4: '#333333'
};

/*****************************************************************************/

export const styles = StyleSheet.create({
  container:  {
    flex: 1
  }
, leadText: {
    padding:        20
  , fontSize:       24
  , marginVertical: 8
  , color:         themeColours.p1
  }
, labelText: {
    paddingHorizontal: 20
  , paddingTop:        20
  , paddingBottom:     8
  , fontSize:          16
  , color:          themeColours.p1
  }
, warningText: {
    textAlign: 'center'
  , fontSize:   14
  , color:      themeColours.s1
  }
, inputText:  {
    textAlign:        'left'
  , padding:          20
  , marginHorizontal: 15
  , fontSize:         16
  , color:            themeColours.s4
  , borderColor:      themeColours.p1
  , borderWidth:      5
  , borderRadius:     25
  }
, button: {
    padding:         20
  , marginVertical:  25
  , marginHorizontal: 5
  , borderWidth:     2
  , borderRadius:    16
  }
, buttonEnabled: {
    backgroundColor: themeColours.s2
  , borderColor:     themeColours.s1
  , color:           themeColours.s3
  }
, buttonDisabled: {
    backgroundColor: themeColours.s3
  , borderColor:     themeColours.s4
  , color:           themeColours.s4
  }
, buttonText: {
    fontSize:  18
  , textAlign: 'center'
  }
, profileImage: {
    resizeMode: 'contain'
  }
, textImage: {
    backgroundColor: themeColours.p1
  }
});

/*****************************************************************************/
/*****************************************************************************/