import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {black, grayBackground, primaryGreen, secondaryGray, white} from "../utils/Colors";

const EmployeeHrsStatusBar = (props) => {
    const bottomBarWidth = 262;
    const percentage = props.employee.weekHours/props.company.maxEmployeeHours;
    const topBarWidth = bottomBarWidth * percentage;
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={[styles.bottomBar, {width: bottomBarWidth}]}>
                    <View style={[styles.topBar, {width: topBarWidth}]}></View>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.text}>{props.employee.weekHours} / {props.company.maxEmployeeHours}</Text>
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
        backgroundColor: grayBackground,
        paddingTop: 20,
        shadowColor: black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    leftContainer: {
        flex: 0,
        marginLeft: 16,
        marginRight: 6,
    },
    rightContainer: {
        flex: 1,
        alignItems: "center",
        marginLeft: 6,
        marginRight: 16,
    },
    bottomBar: {
        height: 16,
        backgroundColor: secondaryGray,
        borderRadius: 10,
    },
    topBar: {
        height: 16,
        backgroundColor: primaryGreen,
        borderRadius: 10,
    },
    text: {
        fontSize: 15,
        textAlign: "right",
        fontWeight: "500",
    },
});

export default EmployeeHrsStatusBar;