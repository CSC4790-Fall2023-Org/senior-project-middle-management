import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";
import AvailableShiftCardSwipe from "../AvailableShiftCardSwipe";
import ShiftCard from "../ShiftCard";
import {ipAddy} from "../../utils/IPAddress";

const EmployeeList = ({canDelete}) => {
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getAllEmployees', {
            method: 'POST',
            body: JSON.stringify({
                organizationId: "6500e97e491cac473a9b80c8"
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                console.log('Received data:', data);
                setEmployeeData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);


    return (
        <FlatList
            style={styles.scrollView}
            // key={reloadKey}
            contentContainerStyle={styles.contentContainer}
            data={employeeData ? employeeData.employeeList : []}
            keyExtractor={(employee) => employee.employeeId.toString()}
            renderItem={({ item: employee }) => (
                <ManagerEmployeeCard
                    id={employee.employeeId}
                    fName={employee.firstName}
                    lName={employee.lastName}
                    phone={employee.employeePhoneNumber}
                    email={employee.employeeEmail}
                    type={employee.employeeType}
                    wage={employee.pay}
                    hoursClaimed={employee.loggedHours}
                    canDelete={canDelete}
                />
            )}
            ListEmptyComponent={<View />}
        />
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
        paddingVertical: 8,
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 8,
    },
});
export default EmployeeList;
