import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";


function ShiftsDropdown({ items, dashboardPress }){
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState('All');
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
                            {showDropdown && <FontAwesomeIcon icon={faCaretUp} size={32} style={styles.upCaret} />}
                            {!showDropdown && <FontAwesomeIcon icon={faCaretDown} size={32} style={styles.downCaret}/>}
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
                                    onPress={() => {selectOption(option); dashboardPress(option);}}
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
        paddingTop: 10,
    },

    buttonTextStyle:{
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
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
        top: 310, // Adjust the top position to control the dropdown placement
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
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    downCaret:{
        marginTop: -4,
    },
    upCaret:{

    },
});
export default ShiftsDropdown;