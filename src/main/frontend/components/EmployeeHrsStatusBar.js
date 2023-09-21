import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const EmployeeHrsStatusBar = ({loggedHours, maxWorkableHours}) => {
    const bottomBarWidth = 272;
    const percentage = loggedHours/maxWorkableHours;
    const topBarWidth = bottomBarWidth * percentage;
    return (
        <View style={styles.container}>
            <View>
                <View style={[styles.bottomBar, {width: bottomBarWidth}]}>
                    <View style={[styles.topBar, {width: topBarWidth}]}></View>
                </View>
            </View>
            <View>
                <Text style={styles.text}>{loggedHours}/{maxWorkableHours}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        height: 80,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
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
    },
});

export default EmployeeHrsStatusBar;