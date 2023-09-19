import React from "react";
import {StyleSheet, View, Text} from "react-native";

function UserSettingsScreen() {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    icon: {
        color: 'white',
        marginBottom: 8,
        marginRight: 12,
    }
});

export default UserSettingsScreen;