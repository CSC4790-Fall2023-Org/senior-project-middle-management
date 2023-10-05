import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import shifts from "../apiCalls/shiftCardData";


const AvailableShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map(shift =>
                <AvailableShiftCardSwipe EmployeeShiftCardComponent={<EmployeeShiftCard date={shift.date} shiftType={shift.shiftType} startTime={shift.startTime} endTime={shift.endTime} locationId={shift.locationId} />} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default AvailableShiftList;
