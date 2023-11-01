import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";
import shifts from "../mockApiCalls/myShiftCardData.json";

const MyShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map(shift =>
                <MyShiftCardSwipe ShiftCardComponent={<ShiftCard shiftStartDate={shift.shiftStartDate} shiftEndDate={shift.shiftEndDate} shiftName={shift.shiftName} shiftStartTime={shift.shiftStartTime} shiftEndTime={shift.shiftEndTime} shiftHours={shift.shiftHours} location={shift.location} />} />
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
