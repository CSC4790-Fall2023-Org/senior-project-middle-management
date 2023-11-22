import ShiftCard from "./ShiftCard";
import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import {ipAddy} from "../utils/IPAddress";

const AvailableShiftList = () => {
    const [shiftData, setShiftData] = useState(null);
    const [swipedIndex, setSwipedIndex] = useState(null);
    const swipeableRefs = useRef([]);
    const currentlySwipedRef = useRef(null); // Add this line

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getAvailableShifts', {
            method: 'POST',
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

    const handleSwipeOpen = (index, direction) => {
        if (swipedIndex !== null && swipedIndex !== index) {
            // Close the previously swiped card if one is open
            closeSwipeable(swipedIndex);
        }
        setSwipedIndex(index);
    };

    const closeSwipeable = (index) => {
        // Close the Swipeable component using its ref
        if (swipeableRefs.current[index] && swipeableRefs.current[index].current) {
            swipeableRefs.current[index].current.close();
        }
    };

    return (
        <FlatList
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            data={shiftData ? shiftData.shiftList : []}
            keyExtractor={(shift) => shift.shiftId.toString()}
            renderItem={({ item: shift, index }) => (
                <AvailableShiftCardSwipe
                    ShiftCardComponent={
                        <ShiftCard
                            shiftStartDate={shift.shiftStartDate}
                            shiftEndDate={shift.shiftEndDate}
                            shiftName={shift.shiftName}
                            shiftStartTime={shift.shiftStartTime}
                            shiftEndTime={shift.shiftEndTime}
                            location={shift.location.locationName}
                            shiftHours={shift.shiftHours}
                        />
                    }
                    shiftId={shift.shiftId}
                    onSwipeOpen={(direction) => handleSwipeOpen(index, direction)}
                    swipeableRef={(ref) => (swipeableRefs.current[index] = ref)}
                    currentlySwipedRef={currentlySwipedRef} // Pass the ref
                />
            )}
            ListEmptyComponent={<View />}
        />
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    contentContainer: {
        paddingVertical: 8,
    },
});

export default AvailableShiftList;
