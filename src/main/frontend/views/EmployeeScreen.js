import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeHrsStatusBar from "../components/EmployeeHrsStatusBar";
import MyShiftList from "../components/MyShiftList";
import AvailableShiftList from "../components/AvailableShiftList";
import CustomDashboardHeader from "../components/CustomDashboardHeader";
import employeeData from '../mockApiCalls/employeeData.json';
import companyData from '../mockApiCalls/companyData.json';
import {grayBackground} from "../utils/Colors";

function EmployeeScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    const tabs = [
        {
            id: 1,
            text: 'My Shifts',
        },
        {
            id: 2,
            text: 'Available',
        },
    ];

    return (
        <View style={styles.screen}>
            <CustomHeader title={employeeData.fName + ' ' + employeeData.lName} page={ScreenNames.EMPLOYEE_SETTINGS} />
            <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs}/>
            {selectedIndex === 0 && <MyShiftList />}
            {selectedIndex === 1 && <AvailableShiftList />}
            <EmployeeHrsStatusBar employee={employeeData} company={companyData} style={styles.statusBar}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: grayBackground,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    statusBar: {
        alignSelf: "stretch",
    }
});

export default EmployeeScreen;
