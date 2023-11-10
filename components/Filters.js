/*****************************************************************************/
/*****************************************************************************/

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { themeColours } from '../styles/styles';

/*****************************************************************************/

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={localStyles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => { onChange(index); }}
          style={[
            { flex: 1 / sections.length }
          , localStyles.section
          , (selections[index]) ? localStyles.active : null
          ]}
        >
          <View>
            <Text style={localStyles.text}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

/*****************************************************************************/

const localStyles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:  themeColours.s3
  , flexDirection:    'row'
  , justifyContent:   'space-evenly'
  , marginVertical:   16
  , marginHorizontal: 24
  }
, section: {
    justifyContent:   'center'
  , alignItems:       'center'
  , padding:          16
  , marginHorizontal: 8
  , borderWidth:      1
  , borderColor:      themeColours.p1
  }
, active: {
    backgroundColor: themeColours.s2
  }
, activeText: {
    color:           themeColours.p1
  }
, text: {
    color:           themeColours.p1
  }
});

/*****************************************************************************/

export default Filters;

/*****************************************************************************/
/*****************************************************************************/