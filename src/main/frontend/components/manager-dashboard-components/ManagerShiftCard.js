import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const ManagerShiftCard = ({date, startTime, endTime, shiftType, locationId, available}) => {
    //TODO: calc shift hours to pass into card
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{startTime} – {endTime}</Text>
                <Text style={styles.shiftType}>{shiftType}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.hours}>8.5 hrs</Text>
                <Text style={styles.location}>{locationId}</Text>
                <Text style={styles.location}>{available}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
    },
    leftContainer: {
        flexGrow: 1,
        alignContent: "center",
    },
    rightContainer: {
        flexDirection: "column",
        alignContent: "center",
    },
    date: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    time: {
        fontSize: 16,
        marginBottom: 10,
    },
    shiftType: {
        fontSize: 20,
        fontWeight: "500",
    },
    hours: {
        fontSize: 24,
        marginTop: 10,
        textAlign: "right",
    },
    location: {
        fontSize: 16,
        textAlign: "right",
        marginTop: 14,
    },
});

export default ManagerShiftCard;