import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {primaryGreen, white} from "../utils/Colors";
import {Clock, LocationArrow, User, Calendar} from "../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ShiftCard = ({shiftStartDate, shiftEndDate, shiftStartTime, shiftEndTime, shiftName, shiftHours, location}) => {

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
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={Calendar} size={17} style={styles.icon} />
                <FontAwesomeIcon icon={Clock} size={17} style={styles.icon} />
                <FontAwesomeIcon icon={User} size={17} style={styles.icon}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.date}>
                    {handleMultipleDays()}
                </Text>
                <View style={styles.timeHoursContainer}>
                    <Text style={styles.time}>
                        {shiftStartTime} – {shiftEndTime}
                    </Text>
                    <Text style={styles.hours}>{shiftHours.toFixed(1)} {handleSingularHours()}</Text>
                </View>
                <View style={styles.nameLocationContainer}>
                    <Text style={styles.shiftName}>
                        {shiftName}
                    </Text>
                        <View style={styles.locationContainer}>
                            <View style={styles.locationIcon}>
                                <FontAwesomeIcon icon={LocationArrow} size={14} style={styles.icon}/>
                            </View>
                            <Text style={styles.location}>
                                {location}
                            </Text>
                        </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: white,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
        overflow: "hidden",
    },
    iconContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginRight: 12,
        paddingVertical: 2,
    },
    infoContainer: {
        flexDirection: "column",
        flex: 1,
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
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    date: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 10,
    },
    time: {
        fontSize: 17,
        marginBottom: 10,
    },
    shiftName: {
        fontSize: 17,
        fontWeight: "bold",
    },
    hours: {
        fontSize: 17,
        marginBottom: 10,
    },
    locationIcon: {
        marginRight: 4,
    },
    location: {
        fontSize: 17,
        fontWeight: "500",
    },
    icon: {
        color: primaryGreen,
    },
});

export default ShiftCard;