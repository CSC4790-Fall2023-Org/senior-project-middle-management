import ShiftCard from "./ShiftCard";
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";
import {ipAddy} from "../utils/IPAddress";

const AvailableShiftList = () => {
    const [shiftData, setShiftData] = useState(null);

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

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Transfer Portal</Text>
        </View>
    );

    return (
            <FlatList
                //style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                data={shiftData ? shiftData.shiftList : []}
                keyExtractor={(shift) => shift.shiftId.toString()}
                ListHeaderComponent={renderHeader}
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
        flexGrow: 1,
        paddingVertical: 8,
    },
    headerContainer: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 34,
        textAlign: 'left',
        fontWeight: 'bold',
    },
});

export default AvailableShiftList;
