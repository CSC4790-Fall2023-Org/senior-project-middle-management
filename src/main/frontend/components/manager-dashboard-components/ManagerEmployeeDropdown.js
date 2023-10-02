import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const ManagerEmployeeDropdown = ({ items, dropdownPress}) =>{
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState('SortBy: None');
    const options = items;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeModal = () => {
        setShowDropdown(false);
    };

    const selectOption = (option) => {
        setSelectedValue(option);
        setShowDropdown(false);
    };


    const filteredOptions = options.filter((option) => option !== selectedValue);

    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }
    return(
        <View>
            <View style={styles.dropdownContainer}>
                <View style={styles.dropdownWrapper}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={styles.dropdownTrigger}>
                            <Text style={styles.dropdownText}>{selectedValue}</Text>
                            {showDropdown && <FontAwesomeIcon icon={faChevronUp} size={20} style={styles.upCaret} />}
                            {!showDropdown && <FontAwesomeIcon icon={faChevronDown} size={20} style={styles.downCaret}/>}
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={showDropdown}
                        onRequestClose={() => setShowDropdown(false)}
                    >
                        <TouchableOpacity
                            style={styles.overlay}
                            onPress={toggleDropdown}
                        />
                        <View style={styles.dropdownModal}>
                            {filteredOptions.map((option) => (
                                <TouchableOpacity
                                    style={styles.dropdownOptions}
                                    key={option}
                                    onPress={() => {selectOption(option); dropdownPress(option);}}
                                >
                                    <Text style={styles.dropdownText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Modal>
                </View>

            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        paddingTop: 2,
    },

    buttonTextStyle:{
        fontSize: 12,
        color: 'black',
    },
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        padding: 10,
        width: 200, // Adjust the width as needed
    },
    dropdownModal: {
        position: 'absolute',
        overflow: 'hidden',
        top: 203.5, // Adjust the top position to control the dropdown placement
        left:10,
        width: 200,
        elevation: 5,
        zIndex: 1,
        backgroundColor:'#FFFFFF',

    },
    dropdownOptions:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 0,
        padding: 15,
        overflow: 'hidden',
    },
    dropdownText:{
        fontSize: 12,
        color: 'black',
    },
    downCaret:{
        marginTop: 0,
    },
    upCaret:{
        marginTop:0,
    },
});

export default ManagerEmployeeDropdown;