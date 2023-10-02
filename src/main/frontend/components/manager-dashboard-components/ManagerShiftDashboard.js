import React, {useState} from "react";
import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import ManagerShiftsDropdown from "./ManagerShiftsDropdown";
import ManagerShiftView from "./ManagerShiftView";
import CustomButton from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import ModalDropdown from "./ModalDropdown";




function ManagerShiftDashboard(){
    const sortDropdown = ['All', 'Open', 'Taken'];

    const typeDropdown = ["Head Lifeguard", "Lifeguard"]

    const [isModalVisible, setModalVisible] = useState(false);

    const [beginDate, setBeginDate] = useState("");

    const [endDate, setEndDate] = useState("");
    const handlePressButton3 = () => {
        setModalVisible(!isModalVisible);
    };

    const [selectedIndex, setSelectedIndex] = useState('All');

    const handleSortPress = (index) => {
        setSelectedIndex(index);
    }

    const handleTypePress = (index) => {
        setSelectedIndex(index);
    }

    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }

    const [dateInput, setDateInput] = useState('');



    const handleDateChange = (text) => {
        setDateInput(text);
    };



    return(
        <View>
            <View style={styles.buttonsContainer}>
                <CustomButton buttonText={"Add Shift"} handlePress={handlePressButton3} />
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={faCalendar} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <ManagerShiftsDropdown items = {sortDropdown} dropdownPress = {handleSortPress}/>
                </View>
            </View>
            <ManagerShiftView available={selectedIndex}/>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handlePressButton3}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={handlePressButton3}
                />
                <View style={styles.modal}>
                    <View style={styles.modalLongTitleContainer}>
                        <Text style={styles.modalTitleText}>Type:</Text>
                    </View>
                    <View style={styles.modalLongInputContainer}>
                        <ModalDropdown items={typeDropdown} dropdownPress={handleTypePress} long={true}/>
                    </View>
                    <View style={styles.modalDoubleContainer}>
                        <View>
                            <View style={styles.modalShortTitleContainer}>
                                <Text style={styles.modalTitleText}>Starts:</Text>
                            </View>
                            <View style={styles.modalShortInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex. 01/01/2024"
                                    placeholderTextColor="#F1F1F1"
                                    onChangeText={setBeginDate}
                                    value={beginDate}
                                    maxLength={10}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.modalShortTitleContainer}>
                                <Text style={styles.modalTitleText}>Ends:</Text>
                            </View>
                            <View style={styles.modalShortInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex. 12/31/24"
                                    onChangeText={setEndDate}
                                    placeholderTextColor="#F1F1F1"
                                    value={endDate}
                                    maxLength={10}
                                />
                            </View>
                        </View>

                    </View>
                    <View style={styles.modalDoubleContainer}>
                        <View>
                            <View style={styles.modalShortTitleContainer}>
                                <Text style={styles.modalTitleText}>From:</Text>
                            </View>
                            <View style={styles.modalShortInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex. 8:00 AM"
                                    placeholderTextColor="#F1F1F1"
                                    onChangeText={setBeginDate}
                                    value={beginDate}
                                    maxLength={10}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.modalShortTitleContainer}>
                                <Text style={styles.modalTitleText}>To:</Text>
                            </View>
                            <View style={styles.modalShortInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ex. 5:00 PM"
                                    onChangeText={setEndDate}
                                    placeholderTextColor="#F1F1F1"
                                    value={endDate}
                                    maxLength={10}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.modalLongTitleContainer}>
                        <Text style={styles.modalTitleText}>Repeats:</Text>
                    </View>
                    <View style={styles.modalLongInputContainer}>
                        <ModalDropdown items={typeDropdown} dropdownPress={handleTypePress} long={false}/>
                    </View>
                </View>
            </Modal>
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
    buttonTextStyle:{
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        position: 'absolute',
        top: 170,
        left:20,
        width: 350,
        height: 500,
        elevation: 5,
        zIndex: 1,
        backgroundColor:'#F1F1F1',
        borderRadius:20,
        borderStyle:"solid",
        borderColor:"#ccc",
        flexDirection: "column",
        alignItems:'center',
        justifyContent:'center',
    },
    modalLongTitleContainer:{
        alignItems:"flex-start",
        padding:10,
        width:350,
    },
    modalTitleText: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    modalLongInputContainer:{
        backgroundColor:"#FFFFFF",
        borderColor:"#ccc",
        borderWidth:.5,
        borderRadius:20,
        borderStyle:"solid",
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
    },
    modalDoubleContainer:{
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-between',
    },
    modalDoubleContainer2:{
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-between',
    },
    modalShortInputContainer:{
        padding:5,
        backgroundColor:"#FFFFFF",
        borderColor:"#ccc",
        borderWidth:.5,
        borderStyle:"solid",
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        left:10,
    },
    modalShortTitleContainer:{
        alignItems:"flex-start",
        padding:10,
        width:175,
    },
    modalDropdownContainer:{
        alignItems:"center",

    }
});
export default ManagerShiftDashboard;