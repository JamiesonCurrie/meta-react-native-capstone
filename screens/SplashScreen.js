import { View, Image, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/little-lemon-logo.png')}
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:  {
    flex:           1
  , justifyContent: 'center'
  , alignContent:   'center'
  , padding: 50
  }
, logo: {
    width:      '100%'
  , height:     '100%'
  , resizeMode: 'contain'
  }
});

export default SplashScreen;