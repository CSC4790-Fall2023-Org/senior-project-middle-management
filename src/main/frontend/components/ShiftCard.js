import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {primaryGreen, white} from "../utils/Colors";
import {Clock, LocationArrow, User} from "../utils/Icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ShiftCard = ({shiftStartDate, shiftEndDate, shiftStartTime, shiftEndTime, shiftName, shiftHours, location}) => {
    const space = '  ';

    const handleMultipleDays = () => {
        try {
            return ((shiftStartDate === shiftEndDate) ? shiftStartDate : shiftStartDate + ' - ' + shiftEndDate);
        } catch (error) {
            return false;
        }
    }

    const handleSingularHours = () => {
        const hours = parseInt(shiftHours, 10);
        return hours === 1 ? 'Hour' : 'Hours';
    }

    return (
        //  shift card container (flexDirection: "row")
        //  icons container (flexDirection: "column", paddingRight: 12)
        //      calendar icon
        //      clock icon
        //      user icon
        //  info container (flexDirection: "column")
        //      inside View with align items center: date
        //      inside View with align items center: time and hours (justifyContent: "space-between")
        //      inside View with align items center: name and location (justifyContent: "space-between")
        <View style={styles.container}>
            <Text style={styles.date}>
                <FontAwesomeIcon icon={faCalendar} size={18} style={styles.icon} />
                {space}
                {handleMultipleDays()}
            </Text>
            <View style={styles.timeHoursContainer}>
                <Text style={styles.time}>
                    <FontAwesomeIcon icon={Clock} size={12} style={styles.icon} />
                    {space}
                    {shiftStartTime} – {shiftEndTime}
                </Text>
                <Text style={styles.hours}>{shiftHours} {handleSingularHours()}</Text>
            </View>
            <View style={styles.nameLocationContainer}>
                <Text style={styles.shiftName}>
                    <FontAwesomeIcon icon={User} size={16} style={styles.icon}/>
                    {space}
                    {shiftName}
                </Text>
                <Text style={styles.location}>
                    <FontAwesomeIcon icon={LocationArrow} size={16} style={styles.icon}/>
                    {space}
                    {location}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: white,
        margin: 16,
        marginBottom: 0,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
    },
    timeHoursContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nameLocationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    shiftName: {
        fontSize: 20,
        fontWeight: "500",
    },
    hours: {
        fontSize: 16,
        marginBottom: 10,
    },
    location: {
        fontSize: 20,
        fontWeight: "500",
    },
    icon: {
        color: primaryGreen,
    },
});

export default ShiftCard;