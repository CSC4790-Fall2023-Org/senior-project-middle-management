import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeShiftCard from "../components/EmployeeShiftCard";

function EmployeeScreen() {
    return (
        <View style={styles.screen}>
            <CustomHeader title={"Employee Name"} page={ScreenNames.EMPLOYEE_SETTINGS} />
            <ScrollView style={styles.scrollView}>
                <EmployeeShiftCard date={"Wed Sep 21"} shiftType={"Lifeguard"} startTime={"12:00"} endTime={"8:30"} locationId={12345} />
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F1F1F1',
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
});

export default EmployeeScreen;