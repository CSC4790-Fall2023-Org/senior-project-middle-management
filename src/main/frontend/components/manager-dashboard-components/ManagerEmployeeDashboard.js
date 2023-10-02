import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from "../CustomButton";
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerEmployeeView from "./ManagerEmployeeView";
import ManagerEmployeeDropdown from "./ManagerEmployeeDropdown";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
const ManagerEmployeeDashboard = ( ) => {
    const options = ["SortBy: None", "SortBy: Name", "SortBy: Hours Worked" ]

    const [selectedIndex, setSelectedIndex] = useState('All');

    const [selectedEmployee, setSelectedEmployee] = useState('All');

    const handleEmployeePress = (emp) => {
        setSelectedEmployee(emp);
    }
    const handleDropdownPress = (index) => {
        setSelectedIndex(index);
    }

    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }
    return(
        <View>
            <View style={styles.buttonsContainer}>
                <CustomButton buttonText={"Add Employee"} page={ScreenNames.LOGIN} />
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={faCalendar} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <ManagerEmployeeDropdown items = {options} dropdownPress = {handleDropdownPress}/>
                </View>
            </View>
            <ManagerEmployeeView selected={selectedEmployee} handleEmpPress={handleEmployeePress}/>
        </View>

    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    dropdownWrapper:{
        paddingTop: 10,
        left:10

    },
    dropdownWrapperBorder:{
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
        width: 200,

    },

});
export default ManagerEmployeeDashboard;