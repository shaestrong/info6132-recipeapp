import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding:16
  },
  label: {
    fontSize: 16,
    paddingVertical:20,
  },
  email: {
    fontSize: 20,
    marginBottom:20,
    fontWeight: 'bold'
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
    <View style={styles.container}>
      <Text style={styles.label}>Logged in as:</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button mode="contained" onPress={logout} labelStyle={{ color: 'white',fontSize: 16, fontWeight: "bold" }}>Logout</Button>
    </View>
  );
};

export default ProfileView;
