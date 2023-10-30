import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Platform,
    KeyboardAvoidingView,
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

function TransferShiftModal({transferShiftModalVisible, setTransferShiftModalVisible}) {
    const [recipientSelected, setRecipientSelected] = useState(true);

    const handleSubmit = () => {
        if (recipientSelected) {
            setTransferShiftModalVisible(!transferShiftModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={transferShiftModalVisible}
            onRequestClose={() => {
                setTransferShiftModalVisible(!transferShiftModalVisible);
            }}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPressOut={() => {setTransferShiftModalVisible(false)}}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Transfer Shift</Text>
                            <View style={styles.selectorContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.selectorText}>Select Recipient</Text>
                                </TouchableOpacity>
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
                    </View>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 24,
    },
    selectorText: {
        fontSize: 20,
        color: grayAction,
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
})

export default TransferShiftModal;