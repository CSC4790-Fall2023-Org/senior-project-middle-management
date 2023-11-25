import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    View, TouchableWithoutFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
    black,
    grayAction,
    primaryGreen,
    secondaryGray,
    white
} from "../utils/Colors";
import MultiWheelPicker from "./MultiWheelPicker";

function TransferShiftModal({transferShiftModal,
                                setTransferShiftModal,
                                shiftName,
                                shiftStartDate,
                                shiftEndDate,
                                shiftStartTime,
                                shiftEndTime,
                                shiftHours,
                                shiftLocation}) {
    const [recipientSelected, setRecipientSelected] = useState(false);
    const recipients = ["TJ Nolan", "Diego Messmacher Montes de Oca", "Holden Cormier", "Ralph Gatdula"];
    const [recipient, setRecipient] = useState(null);

    const handleMultipleDays = () => {
        try {
            return ((shiftStartDate === shiftEndDate) ? shiftStartDate : shiftStartDate + ' - ' + shiftEndDate);
        } catch (error) {
            return false;
        }
    }

    const recipientSelection = (index) => {
        setRecipient(index);
        if (recipient === "Select Recipient") {
            setRecipientSelected(false);
        } else {
            setRecipientSelected(true);
        }
    }

    const handleSubmit = () => {
        if (recipientSelected) {
            setTransferShiftModal(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    const handleSingularHours = () => {
        const hours = parseInt(shiftHours, 10);
        return (hours === 1 ? 'Hour' : 'Hours');
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={transferShiftModal}
            >
                <TouchableWithoutFeedback onPress={() => {setTransferShiftModal(false)}}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText} numberOfLines={2} ellipsizeMode={"middle"}>Transfer '{shiftName}' Shift</Text>
                                    <View style={styles.selectorContainer}>
                                        <MultiWheelPicker
                                            wheelData={recipients}
                                            setSelectedItems={recipientSelection}
                                            selectedItem={recipient}
                                            placeholder={"Select Recipient"}
                                            hasChevron={false}
                                        />
                                    </View>
                                <View style={styles.shiftContainer}>
                                    <Text style={styles.shiftDate}>{handleMultipleDays()}</Text>
                                    <Text style={styles.shiftTime}>{shiftStartTime} – {shiftEndTime}</Text>
                                    <Text style={styles.shiftHours}>{shiftHours} {handleSingularHours()}</Text>
                                    <Text style={styles.shiftLocation}>{shiftLocation}</Text>
                                </View>
                                <View style={[styles.submitButton,
                                    recipientSelected ? {backgroundColor: primaryGreen}
                                        : {backgroundColor: grayAction}]}>
                                    <TouchableOpacity
                                        style={[{width: "100%"}, {alignItems: "center"}]}
                                        onPress={handleSubmit}>
                                        <Text style={styles.submitText}>Transfer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 24,
        width: "75%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        paddingBottom: 0,
        alignItems: 'center',
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
    },
    modalText: {
        marginBottom: 16,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "500",
    },
    selectorContainer: {
        flexDirection: "row",
        width: "100%",
        borderColor: primaryGreen,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    shiftContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: white,
        marginVertical: 24,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
        borderWidth: 2,
        borderColor: secondaryGray,
    },
    shiftDate: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 12,
    },
    shiftTime: {
        fontSize: 20,
        marginBottom: 12,
    },
    shiftHours: {
        fontSize: 20,
        marginBottom: 12,
    },
    shiftLocation: {
        fontSize: 20,
    },
    submitButton: {
        width: "100%",
        borderRadius: 10,
        marginBottom: 24,
        padding: 12,
        alignItems: "center",
    },
    submitText: {
        fontSize: 24,
        fontWeight: "500",
        color: white,
    },
})

export default TransferShiftModal;