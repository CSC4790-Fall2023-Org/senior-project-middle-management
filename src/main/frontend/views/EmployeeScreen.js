import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeShiftCard from "../components/EmployeeShiftCard";
import EmployeeHrsStatusBar from "../components/EmployeeHrsStatusBar";
import EmployeeShiftHeader from "../components/EmployeeShiftHeader";

function EmployeeScreen() {
    return (
        <View style={styles.screen}>
            <CustomHeader title={"Employee Name"} page={ScreenNames.EMPLOYEE_SETTINGS} />
            <EmployeeShiftHeader />
            <ScrollView style={styles.scrollView}>
                <EmployeeShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={12345} />
                <EmployeeShiftCard date={"Fri Sep 22"} shiftType={"Head Guard"} startTime={"10:00am"} endTime={"6:30pm"} locationId={12345} />
            </ScrollView>
            <EmployeeHrsStatusBar loggedHours={20} maxWorkableHours={40} style={styles.statusBar}/>
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
    statusBar: {
        alignSelf: "stretch",
    }

});

export default EmployeeScreen;