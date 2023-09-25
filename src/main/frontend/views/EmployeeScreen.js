import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeHrsStatusBar from "../components/EmployeeHrsStatusBar";
import EmployeeShiftHeader from "../components/EmployeeShiftHeader";
import MyShiftList from "../components/MyShiftList";
import AvailableShiftList from "../components/AvailableShiftList";

function EmployeeScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    return (
        <View style={styles.screen}>
            <CustomHeader title={"Employee Name"} page={ScreenNames.EMPLOYEE_SETTINGS} />
            <EmployeeShiftHeader onTitlePress={handleTitlePress}/>
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