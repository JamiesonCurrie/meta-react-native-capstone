/*****************************************************************************/
/*****************************************************************************/

import { View, Image, StyleSheet, Text } from "react-native";
import { themeColours } from '../styles/styles';

/*****************************************************************************/

const About = () => {
  return (
    <View style={localStyles.container}>
      <Text style={localStyles.h1}>Little Lemon</Text>
      <View style={localStyles.row}>
        <View style={localStyles.left}>
          <Text style={localStyles.h2}>Chicago</Text>
          <Text style={localStyles.p}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        </View>
        <View style={localStyles.right}>
          <Image
            style={localStyles.image}
            source={require('../assets/heroImage.png')}
          />
        </View>
      </View>
    </View>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: themeColours.p1
  , paddingLeft:     16
  , paddingRight:    0
  }
, row: {
    flex:          3
  , flexDirection: 'row'
  , paddingBottom: 24
  }
, left: {
    width:          '55%'
  , justifyContent: 'flex-start'
  }
, right: {
    width:          '45%'
  , justifyContent: 'center'
  , alignItems:     'center'
  }
, h1: {
    fontSize:   42
  , color:      themeColours.p2
  , textAlign:  'left'
  }
, h2: {
    fontSize:   30
  , color:      themeColours.s3
  }
, p: {
    fontSize:   16
  , color:      themeColours.s3
  , textAlign:  'left'
  }
, image: {
    width:        '73%'
  , height:       175
  , borderRadius: 16
  , borderColor:  themeColours.s4
  , borderWidth:  2
  , resizeMode:   'cover'
  }
});

/*****************************************************************************/

export default About;

/*****************************************************************************/
/*****************************************************************************/