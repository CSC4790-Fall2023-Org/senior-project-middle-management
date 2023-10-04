import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerShiftView from "./ManagerShiftView";
import CustomButton from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar,faX} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import AddShiftPopup from "./AddShiftPopup";




function ManagerShiftDashboard(){
    const sortDropdown = ['All', 'Open', 'Taken'];



    const [isModalVisible, setModalVisible] = useState(false);

    const handlePressButton3 = () => {
        setModalVisible(!isModalVisible);
    };

    const [selectedIndex, setSelectedIndex] = useState('All');

    const handleSortPress = (index) => {
        setSelectedIndex(index);
    }



    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }





    return(
        <View>
            <View style={styles.buttonsContainer}>
                <CustomButton buttonText={"Add Shift"} handlePress={handlePressButton3} buttonWidth={250}/>
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={faCalendar} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <Dropdown items={sortDropdown} dropdownPress={handleSortPress} left={10} top={299.5} width={200} fontSize={24} fontWht={"bold"} chvSize={32}/>
                </View>
            </View>
            <ManagerShiftView available={selectedIndex}/>
            <AddShiftPopup isModalVisible={isModalVisible} handlePressButton={handlePressButton3}/>
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
        borderWidth: .5,
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