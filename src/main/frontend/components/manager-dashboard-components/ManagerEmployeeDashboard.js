import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerEmployeeView from "./ManagerEmployeeView";
import {useNavigation} from "@react-navigation/native";
import Dropdown from "../Dropdown";
import {whiteColor} from "../../utils/Colors";
const ManagerEmployeeDashboard = ({buttonTitle}) => {
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
                    <Dropdown items={options} dropdownPress={handleDropdownPress} left={10} top={278} width={210} fontSize={15} fontWht={"normal"} chvSize={20}/>
                </View>
            </View>
            <ManagerEmployeeView selected={selectedEmployee} handleEmpPress={handleEmployeePress} />
        </View>

    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownWrapper:{
        paddingTop:20,
        paddingLeft:16,
        paddingBottom: 16,
    },

    dropdownWrapperBorder:{
        backgroundColor: whiteColor,
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        justifyContent: "center",
    },

});
export default ManagerEmployeeDashboard;