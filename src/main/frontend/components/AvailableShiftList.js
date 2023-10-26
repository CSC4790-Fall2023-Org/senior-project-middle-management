import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import shifts from "../mockApiCalls/availableShiftCardData.json";


const AvailableShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            {shifts.map((shift, index) =>
                <AvailableShiftCardSwipe
                    key={index}
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

export default AvailableShiftList;
