/*****************************************************************************/
/*****************************************************************************/

import { View, Image, StyleSheet, Text } from "react-native";
import { themeColours } from '../styles/styles';

/*****************************************************************************/

const MenuItem = ({item}) => {

  return (
  <View style={localStyles.container}>
    <View style={localStyles.row}>
      <View style={localStyles.left}>
        <Text style={localStyles.h1}>{item.name}</Text>
        <Text style={localStyles.p}>{item.description}</Text>
        <Text style={localStyles.h2}>{'$' + item.price}</Text>
      </View>
      <View style={localStyles.right}>
        <Image
          style={localStyles.image}
          source={{uri: item.image}}
          accessible={true}
          accessibilityLabel={'image of ' + item.name}
        />
      </View>
    </View>
  </View>
);
}

/*****************************************************************************/

const localStyles = StyleSheet.create({
  container: {
    flex: 1
  , paddingHorizontal: 24
  , paddingVertical:   12
  , marginVertical:    4
  }
, row: {
    flex: 3
  , flexDirection: 'row'
  }
, left: {
    width:          '65%'
  , justifyContent: 'flex-start'
  }
, right: {
    width:          '35%'
  , justifyContent: 'center'
  , alignItems:     'center'
  }
, h1: {
    fontSize:   20
  , color:      themeColours.p1
  , marginBottom: 2
  }
, h2: {
    fontSize:   18
  , fontWeight: 'bold'
  , color:      themeColours.s1
  , marginTop: 2

  }
, p: {
    fontSize:   14
  , color:      themeColours.s4
  , textAlignVertical: 'center'
  , marginVertical: 5
  }
, image: {
    width:        125
  , height:       125
  , borderRadius: 16
  , borderColor:  themeColours.s4
  , borderWidth:  2
  , resizeMode:   'cover'
  }
});

/*****************************************************************************/

export default MenuItem;

/*****************************************************************************/
/*****************************************************************************/