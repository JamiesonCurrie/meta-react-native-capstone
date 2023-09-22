import { StyleSheet} from "react-native";

const themeColours = {
  p1: '#495E57'
, p2: '#F4CE14'
, s1: '#EE9972'
, s2: '#FBDABB'
, s3: '#EEEEEE'
, s4: '#333333'
};

export const styles = StyleSheet.create({
  container:  {
    flex: 1
  }
, leadText: {
    padding:        20
  , fontSize:       24
  , marginVertical: 8
  , color:         themeColours.p1
  , textAlign:     'center'
  //, flex:          0.5
  }
, labelText: {
    padding:        20
  , fontSize:       24
  , marginVertical: 8
  , color:          themeColours.p1
  , textAlign:     'center'
  //, flex:          0.5
  }
, warningText: {
    padding:        20
  , fontSize:       24
  , marginVertical: 8
  , color:         themeColours.s1
  , textAlign:     'center'
  //, flex:          0.5
  }
, inputText:  {
    padding:          20
  , paddingStart:     20
  , fontSize:         16
  , color:            themeColours.s4
  , textAlign:        'left'
  , borderColor:      themeColours.p1
  , borderWidth:      5
  , borderRadius:     25
  }
, button: {
    fontSize:        22
  , padding:         10
  , marginVertical:  25
  , margin:          100
  , borderWidth:     2
  , borderRadius:    50
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
    fontSize:  24
  //, color:     'white'
  , textAlign: 'center'
  }
});