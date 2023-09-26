import { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

import Header from '../components/Header'
import { styles } from '../styles/styles'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={localStyles.container}>
        <Text style={styles.leadText}>Profile Page</Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container:  {
    flex: 2
  , justifyContent: 'flex-end'
  }
});

export default Profile;