import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";
import shifts from "../mockApiCalls/myShiftCardData.json";

const MyShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map((shift, index) =>
                <MyShiftCardSwipe
                    key={index}
                    ShiftCardComponent={
                    <ShiftCard
                        startDate={shift.startDate}
                        shiftType={shift.shiftType}
                        startTime={shift.startTime}
                        endTime={shift.endTime}
                        location={shift.location}
                        shiftHours={shift.shiftHours}
                    />}
                    startDate={shift.startDate}
                    shiftName={shift.shiftType}
                    startTime={shift.startTime}
                    endTime={shift.endTime}
                    location={shift.location}
                    shiftHours={shift.shiftHours}
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
