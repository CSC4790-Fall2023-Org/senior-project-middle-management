import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";

const AvailableShiftList = () => {
    const [shiftData, setShiftData] = useState(null);

    useEffect(() => {
        fetch('http://10.137.22.96:8080/getAvailableShifts', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                employeeId: "651f3f35631f63367d896196"
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setShiftData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return(
        <ScrollView style={styles.scrollView}>
            { shiftData ? (
                <View>
                    {shiftData.shiftList.map(shift =>
                        <AvailableShiftCardSwipe
                            key={shift.shiftId}
                            ShiftCardComponent={
                            <ShiftCard
                                shiftStartDate={shift.shiftStartDate}
                                shiftEndDate={shift.shiftEndDate}
                                shiftName={shift.shiftName}
                                shiftStartTime={shift.shiftStartTime}
                                shiftEndTime={shift.shiftEndTime}
                                location={shift.location.locationName}
                                shiftHours={shift.shiftHours}
                            />}
                        />
                    )}
                </View>
            ) : (
                <View/>
            )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default AvailableShiftList;
