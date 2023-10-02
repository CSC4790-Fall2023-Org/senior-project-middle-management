import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerShiftsDropdown from "./ManagerShiftsDropdown";
import ManagerShiftView from "./ManagerShiftView";
import CustomButton from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";


function ManagerShiftDashboard(){
    const options = ['All', 'Open', 'Taken'];

    const [selectedIndex, setSelectedIndex] = useState('All');

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
                <CustomButton buttonText={"Add Shift"} page={ScreenNames.LOGIN} />
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={faCalendar} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <ManagerShiftsDropdown items = {options} dropdownPress = {handleDropdownPress}/>
                </View>
            </View>
            <ManagerShiftView available={selectedIndex}/>



        </View>
    );
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
export default ManagerShiftDashboard;