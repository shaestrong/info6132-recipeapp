import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

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
      <Text>{user.email}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default ProfileView;
