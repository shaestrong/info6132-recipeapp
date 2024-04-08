import { Button, TextInput as PaperTextInput, Snackbar } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

import React, { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

const Login = ({ navigation, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const showError = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }

  const handleLogin = () => {
    auth.login(email, password).then((user) => {
      if (user) {
        console.log("User logged in", user);

        navigation.replace("Main");
      } else {
        showError();
      }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <PaperTextInput label="Email" value={email} onChangeText={setEmail} />

        <PaperTextInput
          label="Password"
          value={password}
          type="password"
          onChangeText={setPassword}
        />

        <Button onPress={handleLogin}>Login</Button>

        <Button onPress={() => navigation.navigate("Register")}>
          Register
        </Button>
      </View>

      <Snackbar visible={visible}>
        Cannot login
      </Snackbar>
    </View>
  );
};

export default Login;
