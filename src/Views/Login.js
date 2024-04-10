import { withTheme, Button, TextInput as PaperTextInput, Snackbar } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";

import React, { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'white',
    paddingBottom: 100
  },
  input: {
    marginBottom: 12,
  },
  title: {
    color:'#18AB91',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:10,
    textAlign: 'center'
  },
  mb: {
    marginVertical:10
  },
  bc: {
    borderColor:"#18AB91",
  }
});

const Login = ({theme, navigation, auth }) => {
  const { colors } = theme;
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
        <Text style={styles.title}>Welcome Back!</Text>
        <PaperTextInput label="Email" value={email} onChangeText={setEmail} 
          mode="outlined"
          style={[styles.input, { backgroundColor: colors.surface }]}
        />

        <PaperTextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
        />

        <Button onPress={handleLogin} mode="contained" style={styles.mb} labelStyle={{ color: 'white',fontSize: 16, fontWeight: "bold" }}>Login</Button>

        <Button onPress={() => navigation.navigate("Register")} mode="outlined" style={styles.bc} labelStyle={{ fontSize: 16, fontWeight: "bold" }}>
          Register
        </Button>
      </View>

      <Snackbar visible={visible}>
        Cannot login
      </Snackbar>
    </View>
  );
};

export default withTheme(Login);
