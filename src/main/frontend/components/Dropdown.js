import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


function Dropdown({ items, dropdownPress, top, width, left, fontWht, fontSize, chvSize}){
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState(items[0]);
    const options = items;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectOption = (option) => {
        setSelectedValue(option);
        setShowDropdown(false);
    };

    const filteredOptions = options.filter((option) => option !== selectedValue);
    console.log(filteredOptions);
    console.log(filteredOptions[filteredOptions.length-1])
    console.log(filteredOptions[1])
    return(
        <View>
            <TouchableOpacity onPress={toggleDropdown}>
                <View style={[styles.dropdownTrigger, {width: width, padding: 10, paddingHorizontal: 16,}]}>
                    <Text style={styles.dropdownText}>{selectedValue}</Text>
                    {showDropdown && <FontAwesomeIcon icon={faChevronUp} size={20} />}
                    {!showDropdown && <FontAwesomeIcon icon={faChevronDown} size={20} />}
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
                <View style={[styles.dropdownModal, {
                    top: top,
                    left: left,
                    width: width,
                }]}>

                    <TouchableOpacity
                        style={[styles.dropdownOptions]}
                        key={selectedValue}
                        onPress={() => {selectOption(selectedValue); dropdownPress(selectedValue);}}
                    >
                        <View style={[styles.dropdownTrigger, {width:width-30, padding:0,}]}>
                            <Text style={styles.dropdownText}>{selectedValue}</Text>
                            {showDropdown && <FontAwesomeIcon icon={faChevronUp} size={20} />}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />

                    {filteredOptions.map((option) => (
                        <View>
                            <TouchableOpacity
                                style={styles.dropdownOptions}
                                key={option}
                                onPress={() => {selectOption(option); dropdownPress(option);}}
                            >
                                <Text style={styles.dropdownText}>{option}</Text>
                            </TouchableOpacity>
                            {option!==filteredOptions[filteredOptions.length-1] && (
                                <View style={styles.separator} />
                            )}
                        </View>
                    ))
                    }

                </View>
            </Modal>
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
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
    },
    dropdownModal: {
        position: 'absolute',
        elevation: 5,
        zIndex: 1,
        borderWidth: .5,
        backgroundColor:'#FFFFFF',
        borderColor:"#ccc",
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",

    },
    dropdownOptions:{
        padding: 10,
        overflow: 'hidden',
        paddingHorizontal: 16
    },
    dropdownText:{
        fontSize: 12,
        color: 'black',
    },
    separator: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});

export default Dropdown;