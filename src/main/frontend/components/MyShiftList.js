import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";
import shifts from "../mockApiCalls/myShiftCardData.json";

const MyShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map(shift =>
                <MyShiftCardSwipe
                    ShiftCardComponent={
                    <ShiftCard
                        date={shift.date}
                        shiftType={shift.shiftType}
                        startTime={shift.startTime}
                        endTime={shift.endTime}
                        locationId={shift.locationId}
                    />}
                />
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
