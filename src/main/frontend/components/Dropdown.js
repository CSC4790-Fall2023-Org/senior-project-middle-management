import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../utils/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {primaryGreen, secondaryGray, white} from "../utils/Colors";


function Dropdown({ items, dropdownPress, top, width, left, fontWht, fontSize, chvSize}){
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState(items[0]);


    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    const selectOption = (option) => {
        setSelectedValue(option);
        setShowDropdown(false);
    };


    const filteredOptions = items.filter((option) => option !== selectedValue);

    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }
    return(
        <View>
            <View style={styles.dropdownContainer}>
                <View style={styles.dropdownWrapper}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={[styles.dropdownTrigger, {width: width,}]}>
                            <Text style={styles.dropdownText}>{selectedValue}</Text>
                            {showDropdown && <FontAwesomeIcon icon={faChevronUp} size={20} />}
                            {!showDropdown && <FontAwesomeIcon icon={faChevronDown} size={20} />}
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={showDropdown}
                        onRequestClose={() => {
                            setShowDropdown(false)
                        }}
                    >
                        <TouchableOpacity
                            style={styles.overlay}
                            onPress={toggleDropdown}
                        />
                        <View style={[styles.dropdownModal, {
                            top: top,
                            left: left,
                            width: width,
                        }]}>
                            {filteredOptions.map((option) => (
                                <TouchableOpacity
                                    style={styles.dropdownOptions}
                                    key={option}
                                    onPress={() => {selectOption(option);}}
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
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        padding: 10,
    },
    dropdownModal: {
        position: 'absolute',
        overflow: 'hidden',
        elevation: 5,
        zIndex: 1,
        backgroundColor: white,

    },
    dropdownOptions:{
        borderWidth: .5,
        borderColor: secondaryGray,
        borderRadius: 0,
        padding: 15,
        overflow: 'hidden',
    },
    dropdownText:{
        fontSize: 12,
        color: 'black',
    },
});

export default Dropdown;