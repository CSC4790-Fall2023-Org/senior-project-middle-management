import ShiftCard from "./ShiftCard";
import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";
import {ipAddy} from "../utils/IPAddress";
import {useAppContext} from "../AppContext";

const MyShiftList = () => {
    const [shiftData, setShiftData] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);
    const { constEmployeeId } = useAppContext();

    const updateReloadKey = () => {
        setReloadKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getClaimedShifts', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                employeeId: constEmployeeId
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                setShiftData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [reloadKey]);

    return (
        <FlatList
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            data={shiftData ? shiftData.shiftList : []}
            keyExtractor={(shift) => shift.shiftId.toString()}
            renderItem={({ item: shift }) => (
                <MyShiftCardSwipe
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
                    transferId={shift.hasOwnProperty('transferEmployeeId') ? shift.transferEmployeeId : null}
                    updateReloadKey={updateReloadKey}
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

export default MyShiftList;
