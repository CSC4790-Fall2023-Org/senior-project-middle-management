import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";


const AvailableShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            <EmployeeShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={12345} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default AvailableShiftList;
