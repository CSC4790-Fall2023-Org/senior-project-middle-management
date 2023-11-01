import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {white} from "../utils/Colors";

const ShiftCard = ({shiftStartDate, shiftEndDate, shiftStartTime, shiftEndTime, shiftName, shiftHours, location}) => {

    const handleMultipleDays = () => {
        console.log(shiftStartDate);
        console.log(shiftEndDate);
        try {
            if (shiftStartDate === shiftEndDate) {
                return (
                    shiftStartDate
                )
            } else {
                return (
                    shiftStartDate + ' - ' + shiftEndDate
                )
            }
            // return JSON.stringify(shiftStartDate) === JSON.stringify(shiftEndDate);
        } catch (error) {
            return false;
        }
    }

    const handleSingularHours = (shiftHours) => {
        const hours = parseInt(shiftHours, 10);
        return hours === 1 ? 'Hour' : 'Hours';
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.date}>{handleMultipleDays()}</Text>
                <Text style={styles.time}>{shiftStartTime} – {shiftEndTime}</Text>
                <Text style={styles.shiftType}>{shiftName}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.hours}>{shiftHours} {handleSingularHours()}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: white,
        margin: 16,
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

export default ShiftCard;