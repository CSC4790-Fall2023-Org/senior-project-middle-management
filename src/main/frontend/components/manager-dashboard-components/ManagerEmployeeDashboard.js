import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import ManagerEmployeeView from "./ManagerEmployeeView";
import Dropdown from "../Dropdown";
import {white} from "../../utils/Colors";

const ManagerEmployeeDashboard = ({buttonTitle}) => {
    const options = ["Default", "Name", "Hours Worked" ]

    const [selectedIndex, setSelectedIndex] = useState('All');

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
            <ManagerEmployeeView />
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
        borderColor: "#ccc",
        borderWidth: .5,
    },
});
export default ManagerEmployeeDashboard;