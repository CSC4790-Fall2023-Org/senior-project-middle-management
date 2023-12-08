import ShiftCard from "../../components/ShiftCard";
import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import AvailableShiftCardSwipe from "../AvailableShiftCardSwipe";
import {ipAddy} from "../../utils/IPAddress";
import {useAppContext} from "../../AppContext";
import ManagerShiftCardSwipe from "./ManagerShiftCardSwipe";

const FullShiftList = ({reloadKey, updateReloadKey}) => {
    const [shiftData, setShiftData] = useState(null);
    const { constEmployeeId } = useAppContext();

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getAvailableShifts', {
            method: 'POST',
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
                <ManagerShiftCardSwipe
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
                    // reloadKey={reloadKey}
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
        paddingBottom: 24,
    },
});

export default FullShiftList;
