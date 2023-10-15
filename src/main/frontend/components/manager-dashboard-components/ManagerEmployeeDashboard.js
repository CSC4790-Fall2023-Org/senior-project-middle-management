import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import ManagerEmployeeView from "./ManagerEmployeeView";
import Dropdown from "../Dropdown";

const ManagerEmployeeDashboard = ({buttonTitle}) => {
    const options = ["None", "Name", "Hours Worked" ]

    const [selectedIndex, setSelectedIndex] = useState('All');

    const [selectedEmployee, setSelectedEmployee] = useState('All');

    const handleEmployeePress = (emp) => {
        setSelectedEmployee(emp);
    }
    const handleDropdownPress = (index) => {
        setSelectedIndex(index);
    }

    return(
        <View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <Dropdown items={options} dropdownPress={handleDropdownPress} left={16} top={164.5} width={200} fontSize={15} fontWht={"normal"} chvSize={20}/>
                </View>
            </View>
            <ManagerEmployeeView selected={selectedEmployee} handleEmpPress={handleEmployeePress} />
        </View>

    )
}

const styles = StyleSheet.create({
    dropdownWrapper:{
        paddingTop:20,
        paddingLeft:16,
        paddingBottom: 16,
    },

    dropdownWrapperBorder:{
        backgroundColor:'#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        justifyContent: "center",
        borderColor:"#ccc",
        borderWidth:.5,
    },

});
export default ManagerEmployeeDashboard;