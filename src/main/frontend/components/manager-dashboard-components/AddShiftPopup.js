import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Keyboard
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {X} from '../../utils/Icons';
import Dropdown from "../Dropdown";
import CustomButton from "../CustomButton";
import React, {useState} from "react";
import {grayBackground, whiteColor} from "../../utils/Colors";

const AddShiftPopup = ({isModalVisible, handlePressButton}) => {
    const typeDropdown = ["Head Lifeguard", "Lifeguard"]

    const repeatsDropdown = ["Never", "Weekly", "Monthly", "Yearly"]

    const [beginDate, setBeginDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [from, setFrom] = useState("");

    const [to, setTo] = useState("");

    const [numShifts, setNumShifts] = useState("")

    const [selectedType, setSelectedType] = useState('null');

    const [selectedRepeats, setSelectedRepeats] = useState('null');

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const handleTypePress = (index) => {
        setSelectedType(index);
    }
    const handleRepeatsPress = (index) => {
        setSelectedRepeats(index);
    }


    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handlePressButton}
        >
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <View style={styles.modalTopContainer}>
                            <Text style={styles.modalTitleText}>Type:</Text>
                            <TouchableOpacity onPress={handlePressButton}>
                                <FontAwesomeIcon icon={X} size={27.5} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalLongInputContainer}>
                            <Dropdown items={typeDropdown} dropdownPress={handleTypePress} width={250} left={70} top={260.} fontSize={15} fontWht={"normal"} chvSize={20}/>
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
                                        onChangeText={setFrom}
                                        value={from}
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
                                        onChangeText={setTo}
                                        placeholderTextColor="#F1F1F1"
                                        value={to}
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalLongTitleContainer}>
                            <Text style={styles.modalTitleText}>Repeats:</Text>
                        </View>
                        <View style={styles.modalRepeatsContainer}>
                            <View style={styles.modalDoubleContainer}>
                                <Text>Every:</Text>
                                <View style={styles.modalVeryShortInputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onChangeText={setEndDate}
                                        placeholderTextColor="#F1F1F1"
                                        value={endDate}
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalShortDropdownContainer}>
                                <Dropdown items={repeatsDropdown} dropdownPress={handleRepeatsPress} width={150} left={205} top={532.5} fontSize={15} fontWht={"normal"} chvSize={20}/>
                            </View>
                        </View>
                        <View style={styles.modalSingleLineContainer}>
                            <View style={styles.singleLineTextContainer}>
                                <Text style={styles.modalTitleText}>Number of Shifts:</Text>
                            </View>
                            <View style={styles.modalVeryShortInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    onChangeText={setNumShifts}
                                    placeholderTextColor="#F1F1F1"
                                    value={numShifts}
                                    maxLength={10}
                                />
                            </View>
                        </View>
                        <View><CustomButton buttonText={"Submit"} handlePress={handlePressButton} buttonWidth={350}/></View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: "#ccc",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalLongTitleContainer: {
        alignItems: "flex-start",
        padding: 10,
        width: 350,
    },
    modalTopContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 10,
        width: 350,
    },
    modalTitleText: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    modalLongInputContainer: {
        backgroundColor: whiteColor,
        borderColor: "#ccc",
        borderWidth: .5,
        borderStyle: "solid",
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
    },
    modalDoubleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalShortInputContainer: {
        padding: 5,
        backgroundColor: whiteColor,
        borderColor: "#ccc",
        borderWidth: .5,
        borderStyle: "solid",
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        left: 10,
    },
    modalShortDropdownContainer: {
        backgroundColor: whiteColor,
        borderColor: "#ccc",
        borderWidth: .5,
        borderStyle: "solid",
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        left: 10,
    },
    modalVeryShortInputContainer: {
        backgroundColor: whiteColor,
        borderColor: "#ccc",
        borderWidth: .5,
        borderStyle: "solid",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        left: 10,
        padding: 5,
    },
    modalShortTitleContainer: {
        alignItems: "flex-start",
        padding: 10,
        width: 175,
    },
    modalRepeatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: 300,
        paddingBottom: 10,
    },
    modalSingleLineContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 350,
        padding: 10,
    },
    singleLineTextContainer: {
        marginTop: 5,
    },
    modalSubmit: {
        alignSelf: 'stretch',
    },
})

export default AddShiftPopup