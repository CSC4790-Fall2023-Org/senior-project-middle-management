import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import ShiftsDropdown from "./ShiftsDropdown";
import ManagerShiftView from "./ManagerShiftView";
import CustomButton from "../CustomButton";


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
            <View style={styles.buttonContainer}>
                <CustomButton buttonText={"Add Shift"} page={ScreenNames.LOGIN} />
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <ShiftsDropdown items = {options} dashboardPress = {handleDropdownPress}/>
                </View>
            </View>
            <ManagerShiftView available={selectedIndex}/>



        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 10,
        flexDirection: "column",
        justifyContent: "center",
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

    buttonTextStyle:{

        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },

});
export default ManagerShiftDashboard;