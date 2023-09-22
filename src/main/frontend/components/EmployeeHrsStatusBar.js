import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const EmployeeHrsStatusBar = ({loggedHours, maxWorkableHours}) => {
    const bottomBarWidth = 272;
    const percentage = loggedHours/maxWorkableHours;
    const topBarWidth = bottomBarWidth * percentage;
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={[styles.bottomBar, {width: bottomBarWidth}]}>
                    <View style={[styles.topBar, {width: topBarWidth}]}></View>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.text}>{loggedHours}/{maxWorkableHours}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 80,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    leftContainer: {
        flex: 0,
        marginLeft: 12,
        marginRight: 6,
    },
    rightContainer: {
        flex: 1,
        alignItems: "center",
        marginLeft: 6,
        marginRight: 12,
    },
    bottomBar: {
        height: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },
    topBar: {
        height: 16,
        backgroundColor: '#50C878',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: "right",
    },
});

export default EmployeeHrsStatusBar;