import {
    TextInput as PaperTextInput,
    Snackbar,
    Button
} from 'react-native-paper';

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 16,
    },
    mb: {
        marginBottom: 16
    }
  });

const Register = ({ navigation, auth }) => {
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
        <PaperTextInput
            label="Email"
            value={email}
            mode='outlined'
            onChangeText={setEmail}
            style={styles.mb}
        />

        <PaperTextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            mode='outlined'
            onChangeText={setPassword}
            style={styles.mb}
        />

        <Button 
            mode='contained'
            onPress={() => handleCreateUser()}
            title="Register"
        >Register</Button>

        </View>

        <Snackbar
        visible={visible}
        >
            An error occurred while creating the user
      </Snackbar>
    </View>)
}

export default Register;