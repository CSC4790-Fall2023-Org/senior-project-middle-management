import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {ipAddy} from "../../utils/IPAddress";
import ManagerEmployeeCard from "../manager-dashboard-components/ManagerEmployeeCard";

const AvailableShiftList = () => {
    const [empData, setEmpData] = useState(null);

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getAllEmployees', {
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
                setEmpData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <FlatList
            contentContainerStyle={styles.contentContainer}
            data={empData ? empData.employeeList : []}
            keyExtractor={(emp) => emp.employeeId.toString()}
            renderItem={({ item: emp }) => (
                <ManagerEmployeeCard
                    id={emp.employeeId}
                    name={emp.firstName}
                    shiftsTaken={40}
                    type={emp.employeeType}
                    worked={emp.pay}
                    email={emp.employeeEmail}
                    pNum={emp.employeePhoneNumber}
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
});

export default AvailableShiftList;
