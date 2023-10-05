import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
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


    return(
        <View>
            <View style={styles.dropdownContainer}>
                <View style={styles.dropdownWrapper}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={[styles.dropdownTrigger, {width: width}]}>
                            <Text style={[styles.dropdownText, {fontSize:fontSize}, {fontWeight:fontWht}]}>{selectedValue}</Text>
                            {showDropdown && <FontAwesomeIcon icon={faChevronUp} size={chvSize} style={styles.upCaret} />}
                            {!showDropdown && <FontAwesomeIcon icon={faChevronDown} size={chvSize} style={styles.downCaret}/>}
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
                        <View style={[styles.dropdownModal, {top: top, left: left, width: width,}]}>
                            {filteredOptions.map((option) => (
                                <TouchableOpacity
                                    style={styles.dropdownOptions}
                                    key={option}
                                    onPress={() => {selectOption(option); dropdownPress(option);}}
                                >
                                    <Text style={[styles.dropdownText, {fontSize:fontSize}, {fontWeight:fontWht}]}>{option}</Text>
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
    },
    dropdownOptions:{
        borderWidth: .5,
        borderColor: '#ccc',
        padding: 10,
        overflow: 'hidden',
    },
    dropdownText:{
        color: 'black',
    },
    dropdownTrigger:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    dropdownModal: {
        position: 'absolute',
        overflow: 'hidden',
        elevation: 5,
        zIndex: 1,
        backgroundColor:'#FFFFFF',

    },
});
export default Dropdown;