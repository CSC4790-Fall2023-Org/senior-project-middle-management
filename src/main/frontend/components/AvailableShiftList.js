import ShiftCard from "./ShiftCard";
import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import {ipAddy} from "../utils/IPAddress";

const AvailableShiftList = () => {
    const [shiftData, setShiftData] = useState(null);

    const [reloadKey, setReloadKey] = useState(0);

    const updateReloadKey = () => {
        setReloadKey(prevKey => prevKey + 1);
    };

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
    }, [reloadKey]);

    return (
        <FlatList
            //style={styles.scrollView}
            // key={reloadKey}
            contentContainerStyle={styles.contentContainer}
            data={shiftData ? shiftData.shiftList : []}
            keyExtractor={(shift) => shift.shiftId.toString()}
            renderItem={({ item: shift }) => (
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
                    reloadKey={reloadKey}
                    updateReloadKey={updateReloadKey}
                />
            )}
            ListEmptyComponent={<View />}
        />
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 8,
    },
});

export default AvailableShiftList;
