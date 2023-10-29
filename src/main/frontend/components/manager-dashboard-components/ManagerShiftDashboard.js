import React, {useState} from "react";
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerShiftView from "./ManagerShiftView";
import CustomButton from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Calendar} from '../../utils/Icons';
import Dropdown from "../Dropdown";
import AddShiftPopup from "./AddShiftPopup";
import {secondaryGray, white, primaryGreen} from "../../utils/Colors";

function ManagerShiftDashboard(){
    //Fetch Shift Info
    const [locationOptions, setLocationOptions] = useState([{}]);
    const [shiftOptions, setShiftOptions] = useState([]);

    const getShiftData = () => {
        //update fetch url according to IPv4 of Wi-Fi
        fetch('http://10.0.0.194:8080/getShiftCreationInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //change this according to manager ID needed
                managerId: "653ae4acd7a53f248d8f2223"
            }),
        }).then(r => r.json()
        ).then(json => {
            setLocationOptions(json.locationList)
            setShiftOptions(json.shiftTypeList)
        }).catch(e => {
                console.error(e);
            });
    }
    const handleAddShiftClick = async () => {
        try {
            await getShiftData()
            handlePressButton()
        } catch (error) {
            console.log(error);
        }
    };
    const sortDropdown = ['All', 'Open', 'Taken'];

    const [isModalVisible, setModalVisible] = useState(false);

    const handlePressButton = () => {
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
                <View style={styles.addShiftButton}>
                    <CustomButton buttonText={"Add Shift"} handlePress={handleAddShiftClick} />
                </View>
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={Calendar} size={48} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <Dropdown items={sortDropdown} dropdownPress={handleSortPress} left={10} top={290} width={200} fontSize={24} fontWht={"bold"} chvSize={32}/>
                </View>
            </View>
            <ManagerShiftView available={selectedIndex}/>
            <AddShiftPopup handlePressButton={handleAddShiftClick} isModalVisible={isModalVisible} locationOptions={locationOptions} shiftOptions={shiftOptions}/>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownWrapper:{
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    dropdownWrapperBorder:{
        backgroundColor: white,
        borderWidth: .5,
        borderColor: secondaryGray,
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        justifyContent: "center",
    },
    addShiftButton: {
        paddingLeft: 16,
    },
    icon: {
        marginRight: 16,
        color: primaryGreen,
    },

});
export default ManagerShiftDashboard;