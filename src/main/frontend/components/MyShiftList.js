import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";
import shifts from "../mockApiCalls/myShiftCardData";

const MyShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map(shift =>
                <MyShiftCardSwipe ShiftCardComponent={<EmployeeShiftCard date={shift.date} shiftType={shift.shiftType} startTime={shift.startTime} endTime={shift.endTime} locationId={shift.locationId} />} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default MyShiftList;