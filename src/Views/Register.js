import {
    TextInput as PaperTextInput,
    Snackbar,
    Button,
    withTheme
} from 'react-native-paper';

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
      paddingBottom: 150,
      backgroundColor: 'white'
    },
    title: {
        color:'#18AB91',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom:10,
        textAlign: 'center'
      },
    input: {
        marginBottom: 12,
      },
  });

const Register = ({ theme, navigation, auth }) => {
    const { colors } = theme;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const showError = () => {
        setVisible(true);
        setTimeout(() => setVisible(false), 3000);
    }

    const handleCreateUser = () => {
        auth.createNewUser(email, password).then((user) => {
            if (user) {
                console.log('User created', user);
                navigation.goBack();
            } else {
                showError();
            }
        })
    }

    return (<View style={styles.container}>
        <View>
        <Text style={styles.title}>Create Your Account</Text>
        <PaperTextInput
            label="Email"
            value={email}
            mode='outlined'
            onChangeText={setEmail}
            style={[styles.input, { backgroundColor: colors.surface }]}
        />

        <PaperTextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            mode='outlined'
            onChangeText={setPassword}
            style={[styles.input, { backgroundColor: colors.surface }]}
        />

        <Button 
            mode='contained'
            onPress={() => handleCreateUser()}
            title="Register"
            labelStyle={{ color: 'white',fontSize: 16, fontWeight: "bold" }}
        >Register</Button>

        </View>

        <Snackbar
        visible={visible}
        >
            An error occurred while creating the user
      </Snackbar>
    </View>)
}

export default withTheme(Register);