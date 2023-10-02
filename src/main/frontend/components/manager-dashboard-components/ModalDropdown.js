import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
let isLong;
const ModalDropdown = ({ items, dropdownPress, long }) => {
    isLong=long
    const [showDropdown, setShowDropdown] = useState(false);

    const [selectedValue, setSelectedValue] = useState('Select an Option');

    const options = items;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectOption = (option) => {
        setSelectedValue(option);
        setShowDropdown(false);
    };

    const filteredOptions = options.filter((option) => option !== selectedValue);
    if(showDropdown){
        return(
            <View style={styles.dropdownTrigger}>
                <View>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={styles.dropdownTextContainer}>
                            <Text style={styles.dropdownText}>{selectedValue}</Text>
                            <FontAwesomeIcon icon={faChevronUp} size={15}/>
                        </View>
                    </TouchableOpacity>
                    {filteredOptions.map((option) => (
                        <TouchableOpacity
                            style={styles.dropdownOptions}
                            key={option}
                            onPress={() => {selectOption(option); dropdownPress(option);}}
                        >
                            <View>
                                <Text style={styles.dropdownText}>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>


        )
    }
    else{
        return(
        <TouchableOpacity onPress={toggleDropdown}>
                <View style={styles.dropdownTrigger}>
                    <Text style={styles.dropdownText}>{selectedValue}</Text>
                    <FontAwesomeIcon icon={faChevronDown} size={15}/>
                </View>
        </TouchableOpacity>

        )
    }
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
    buttonTextStyle:{
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        padding: 10,
        width: isLong ? 75 : 200,
    },
    dropdownTextContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: isLong ? 75 : 200,

    },
    dropdownOptions:{
        paddingTop: 10,
        overflow: 'hidden',
    },
    dropdownText:{
        fontSize: 15,
        color: 'black',
    },
    downCaret:{
        marginTop: 0,
    },
    upCaret:{

    },
});
export default ModalDropdown;