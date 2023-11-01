import ShiftCard from "./ShiftCard";
import {ScrollView, StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import {primaryGreen} from "../utils/Colors";

const AvailableShiftList = () => {
    const [shiftData, setShiftData] = useState(null);

    useEffect(() => {
        fetch('http://10.138.16.114:8080/getAvailableShifts', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                employeeId: "651f3f35631f63367d896196"
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
            .then(data => {
                // Now you can work with the data as an array of objects
                console.log(data);
                // Example: Accessing individual objects in the array
                setShiftData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    console.log("shift data: ", shiftData);

    return(
        <ScrollView style={styles.scrollView}>
            { shiftData ? (
                <View>
                    {shiftData.shiftList.map(shift =>
                        <AvailableShiftCardSwipe ShiftCardComponent={<ShiftCard date={shift.shiftStartDate} shiftType={shift.shiftName} startTime={shift.shiftStartTime} endTime={shift.shiftEndTime} locationId={shift.location.locationName} />} />
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
