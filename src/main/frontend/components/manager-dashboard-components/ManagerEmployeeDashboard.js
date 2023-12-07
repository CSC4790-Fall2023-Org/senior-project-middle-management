import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import ManagerEmployeeView from "./EmployeeList";
import Dropdown from "../Dropdown";
import {secondaryGray, white} from "../../utils/Colors";

const ManagerEmployeeDashboard = () => {
    const options = ["Default", "Name", "Hours Worked" ]

    const [selectedIndex, setSelectedIndex] = useState('All');

    const [selectedEmployee, setSelectedEmployee] = useState('All');

    const handleEmployeePress = (emp) => {
        setSelectedEmployee(emp);
    }
    const handleDropdownPress = (index) => {
        setSelectedIndex(index);
    }

    return (
        <View>
            {/*<View style={styles.dropdownWrapper}>*/}
            {/*    <View style={styles.dropdownWrapperBorder}>*/}
            {/*        <Dropdown*/}
            {/*            items={options}*/}
            {/*            dropdownPress={handleDropdownPress}*/}
            {/*            left={10}*/}
            {/*            top={278}*/}
            {/*            width={210}*/}
            {/*            fontSize={15}*/}
            {/*            fontWht={"normal"}*/}
            {/*            chvSize={20}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*</View>*/}
            <ManagerEmployeeView selected={selectedEmployee} handleEmpPress={handleEmployeePress} />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdownWrapper: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    dropdownWrapperBorder: {
        backgroundColor: white,
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        justifyContent: "center",
        borderColor: secondaryGray,
        borderWidth: 0.5,
    },
});

export default ManagerEmployeeDashboard;
