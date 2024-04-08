import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  email: {
    padding: 16,
  },
});

const ProfileView = ({ navigator, auth }) => {

  const [user, setUser] = useState({
    email: '',
  })

  useEffect(() => {
    setUser({...auth.getUser()});
  }, [])

  const logout = () => {
    auth.logout();
  }

  return (
    <View>
      <Text style={styles.email}>Logged in as: {user.email}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default ProfileView;
