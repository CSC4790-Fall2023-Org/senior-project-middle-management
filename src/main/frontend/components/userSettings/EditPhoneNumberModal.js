import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    KeyboardAvoidingView, TouchableWithoutFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";
import {black, destructiveAction, grayAction, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditPhoneNumberModal({phoneNumberModalVisible, setPhoneNumberModalVisible}) {
    const [phoneNumber, setPhoneNumber] = useState(employeeData.phoneNumber);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState(employeeData.phoneNumber);

    const isValueChanged = originalPhoneNumber !== phoneNumber;

    const resetPhoneNumber = () => {
        setPhoneNumber(originalPhoneNumber);
    }

    const handleCancel = () => {
        setPhoneNumberModalVisible(!phoneNumberModalVisible);
        resetPhoneNumber();
        setInvalidPhoneNumber(false);
    }

    const handleSubmit = () => {
        const phoneNumberPattern = /^\d{10}$/;
        const validPhoneNumber = phoneNumberPattern.test(phoneNumber);
        if(!validPhoneNumber) {
            setInvalidPhoneNumber(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else {
            setPhoneNumberModalVisible(!phoneNumberModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setInvalidPhoneNumber(false);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={phoneNumberModalVisible}
            onRequestClose={() => {
                setPhoneNumberModalVisible(!phoneNumberModalVisible);
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={handleCancel}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Edit Phone Number</Text>
                                <TextInput
                                    style={[styles.inputText, invalidPhoneNumber ? styles.errorBorder : null]}
                                    autoCapitalize={"words"}
                                    onChangeText={setPhoneNumber}
                                    value={phoneNumber}
                                    placeholder="ex. 5555555555"
                                    placeholderTextColor={secondaryGray}
                                    autoComplete={"tel"}
                                    inputMode={"tel"}
                                />
                                <View style={[styles.submitButton,
                                    isValueChanged ? {backgroundColor: primaryGreen}
                                        : {backgroundColor: grayAction}]}>
                                    <TouchableOpacity
                                        style={[{width: "100%"}, {alignItems: "center"}]}
                                        onPress={handleSubmit}>
                                        <Text style={styles.submitText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        marginBottom: 18,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "500",
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
        width: "100%",
        fontSize: 18,
        padding: 8,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: secondaryGray,
        borderRadius: 10,
    },
    errorBorder: {
        borderColor: destructiveAction,
    },
})

export default EditPhoneNumberModal;