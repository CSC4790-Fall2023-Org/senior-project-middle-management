import React, {useEffect, useState} from 'react';
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
    destructiveAction,
    grayAction,
    primaryGreen,
    secondaryGray,
    white
} from "../utils/Colors";

function TransferShiftModal({transferShiftModal, setTransferShiftModal}) {
    const [recipientSelected, setRecipientSelected] = useState(false);
    const [recipientListModal, setRecipientListModal] = useState(false);

    const closeModal = () => {
        setTransferShiftModal();
    }

    const openList = () => {
        setRecipientListModal(true);
    }

    const handleSubmit = () => {
        if (recipientSelected) {
            setTransferShiftModal(false);
            setRecipientListModal(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    return (
        <View>
            { transferShiftModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={transferShiftModal}
                >
                    <TouchableWithoutFeedback onPress={() => {setTransferShiftModal(false)}}>
                        <View style={styles.container}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Transfer SHIFT NAME Shift</Text>
                                    <TouchableOpacity
                                        onPress={closeModal}
                                        style={{width: "100%"}}
                                    >
                                        <View style={styles.selectorContainer}>
                                            <Text style={styles.selectorText}>Select Recipient</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.shiftContainer}>
                                        <Text style={styles.shiftDate}>Mon. Oct. 30</Text>
                                        <Text style={styles.shiftTime}>12:00pm – 5:00pm</Text>
                                        <Text style={styles.shiftHours}>Shift Hours</Text>
                                        <Text style={styles.shiftLocation}>Location</Text>
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
            }

            { recipientListModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={recipientListModal}
                    onRequestClose={() => {
                        setRecipientListModal(false);
                    }}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.modalView}>
                            <Text>TESTING</Text>
                        </View>
                    </View>
                </Modal>
            }
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
        width: "100%",
        borderColor: primaryGreen,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    selectorText: {
        fontSize: 20,
        color: grayAction,
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
    inputText: {
        width: "85%",
        fontSize: 18,
        padding: 8,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: secondaryGray,
        borderRadius: 10,
    },
    errorBorder: {
        borderColor: destructiveAction,
    },
    listViewContainer: {
        zIndex: 1,
    }
})

export default TransferShiftModal;