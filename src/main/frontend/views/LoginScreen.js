import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomHeader from "../components/CustomHeader";

function LoginScreen({ navigation }) {
    return (
        <View>
            <CustomHeader title={"App Name"} />
            <View style={styles.buttonsContainer}>
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title="Login as Company"
                    onPress={() => navigation.navigate('Company')}
                />
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title={"Login as Manager"}
                    onPress={() => navigation.navigate('Manager')}
                />
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title={"Login as Employee"}
                    onPress={() => navigation.navigate('Employee')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 100,
    },
    loginButton: {
    },
});

export default LoginScreen;