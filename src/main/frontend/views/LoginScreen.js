import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from "../components/CustomButton";

function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>App Name</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <CustomButton buttonText={"Login as a Company"} page={'Company'}/>
                <CustomButton buttonText={"Login as a Manager"} page={'Manager'} />
                <CustomButton buttonText={"Login as an Employee"} page={'Employee'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
    },
    buttonsContainer: {
        marginTop: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        height: 100,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    headerTitle: {
        color: "#50C878",
        fontSize: 32,
        marginBottom: 8,
        marginLeft: 12,
    },
});

export default LoginScreen;