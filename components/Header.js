import { View, Image, StyleSheet} from "react-native";

const Header = () => {
  return (
    <View style={localStyles.container}>
      <Image
        style={localStyles.logo}
        source={require('../assets/Logo.png')}
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
      <Image
        style={localStyles.profile}
        source={require('../assets/Profile.png')}
        accessible={true}
        accessibilityLabel={'User profile picture'}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container:  {
    flex: 1
  , flexDirection: 'row'
  , justifyContent: 'flex-end'
  }
, logo: {
    width: '50%'
  , height: 100
  , resizeMode: 'contain'
  }
, profile: {
    width: 100
  , height: 75
  , resizeMode: 'contain'
  }
});

export default Header;