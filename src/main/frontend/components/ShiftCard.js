import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {white} from "../utils/Colors";

const ShiftCard = ({startDate, startTime, endTime, shiftType, location, shiftHours}) => {
    const handleSingularHours = () => {
        const hours = parseInt(shiftHours, 10);
        return (hours === 1 ? 'Hour' : 'Hours');
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.date} numberOfLines={1}>{startDate}</Text>
                <Text style={styles.time} numberOfLines={1}>{startTime} – {endTime}</Text>
                <Text style={styles.shiftType} numberOfLines={1} ellipsizeMode={"tail"}>{shiftType}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.hours} numberOfLines={1}>{shiftHours} {handleSingularHours()}</Text>
                <Text style={styles.location} numberOfLines={1} ellipsizeMode={"tail"}>{location}</Text>
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
        justifyContent: "space-between",
    },
    leftContainer: {
        flexGrow: 1,
        alignContent: "center",
        maxWidth: "70%",
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
        fontSize: 18,
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