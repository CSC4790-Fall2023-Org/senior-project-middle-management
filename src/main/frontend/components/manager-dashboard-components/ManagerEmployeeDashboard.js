import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerEmployeeView from "./ManagerEmployeeView";
import {useNavigation} from "@react-navigation/native";
import Dropdown from "../Dropdown";
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
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <Dropdown items={options} dropdownPress={handleDropdownPress} left={10} top={200.5} width={200} fontSize={15} fontWht={"normal"} chvSize={20}/>
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
    buttonTextStyle:{
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    dropdownWrapper:{
        paddingTop: 10,
        left:10

    },
    dropdownWrapperBorder:{
        backgroundColor:'#FFFFFF',
        borderWidth: .5,
        borderColor: '#ccc',
        overflow: 'hidden',
        width: 200,

    },

});
export default ManagerEmployeeDashboard;