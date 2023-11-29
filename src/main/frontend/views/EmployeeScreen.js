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
import {black, grayBackground} from "../utils/Colors";
import {CircleUser} from "../utils/Icons";

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
            <CustomHeader title={'Punchcard'} page={ScreenNames.EMPLOYEE_SETTINGS} icon={CircleUser}/>
            <View style={styles.headerContainer}>
                <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs} />
            </View>
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
    headerContainer: {
        shadowColor: black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 2,
    },
    statusBar: {
        alignSelf: "stretch",
    },
});

export default EmployeeScreen;
