import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../components/CustomHeader";



function LoginScreen({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>App Name</Text>
            </View>
            <View style={styles.twoButtonsContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Company')}>
                    <View>
                      <Text style={styles.text}>Login as Company</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {styles.oneButtonsContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Manager')}>
                    <View>
                        <Text style={styles.text}>Login as Manager</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.oneButtonsContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Employee')}>
                    <View>
                        <Text style={styles.text}>Login as Employee</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    oneButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 30,
    },
    twoButtonsContainer:{
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",
        paddingTop: 200,
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
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',

    },
    text:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000000',
    },
});

export default LoginScreen;