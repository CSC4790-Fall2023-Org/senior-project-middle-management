import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeHrsStatusBar from "../components/EmployeeHrsStatusBar";
import MyShiftList from "../components/MyShiftList";
import AvailableShiftList from "../components/AvailableShiftList";
import CustomDashboardHeader from "../components/CustomDashboardHeader";

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
            <CustomHeader title={"Employee Name"} page={ScreenNames.EMPLOYEE_SETTINGS} />
            <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs}/>
            {selectedIndex === 0 && <MyShiftList />}
            {selectedIndex === 1 && <AvailableShiftList />}
            <EmployeeHrsStatusBar loggedHours={20} maxWorkableHours={40} style={styles.statusBar}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F1F1F1',
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    statusBar: {
        alignSelf: "stretch",
    }
});

export default EmployeeScreen;
