import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    KeyboardAvoidingView, TouchableWithoutFeedback, Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
    black,
    grayAction,
    grayBackground,
    primaryGreen,
    secondaryGray,
    white
} from "../../utils/Colors";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditPhoneNumberModal({phoneNumberModalVisible, setPhoneNumberModalVisible}) {
    const [phoneNumber, setPhoneNumber] = useState(employeeData.phoneNumber);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState(employeeData.phoneNumber);
    const [saveError, setSaveError] = useState(false);

    const isValueChanged = originalPhoneNumber !== phoneNumber;

    const resetPhoneNumber = () => {
        setPhoneNumber(originalPhoneNumber);
    }

    const handleOnChangeText = (text) => {
            setPhoneNumber(text);
            setSaveError(false);
            setInvalidPhoneNumber(false);
    }

    const handleCancel = () => {
        setPhoneNumberModalVisible(!phoneNumberModalVisible);
        resetPhoneNumber();
        setInvalidPhoneNumber(false);
        setSaveError(false);
    }

    const handleSubmit = () => {
        const phoneNumberPattern = /^\d{10}$/;
        const validPhoneNumber = phoneNumberPattern.test(phoneNumber);
        if (!validPhoneNumber && !saveError) {
            setInvalidPhoneNumber(true);
            setSaveError(true);
            Alert.alert (
                'Please enter a valid phone number.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (isValueChanged && !saveError) {
            setPhoneNumberModalVisible(!phoneNumberModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setInvalidPhoneNumber(false);
            setSaveError(false);
            setOriginalPhoneNumber(phoneNumber);
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
                                    style={styles.inputText}
                                    onChangeText={handleOnChangeText}
                                    value={phoneNumber}
                                    placeholder="ex. 5555555555"
                                    placeholderTextColor={secondaryGray}
                                    autoComplete={"tel"}
                                    keyboardType={"number-pad"}
                                />
                                <View style={[styles.submitButton,
                                    (isValueChanged && !saveError) ? {backgroundColor: primaryGreen}
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
        backgroundColor: grayBackground,
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
        fontSize: 17,
        fontWeight: "bold",
    },
    submitButton: {
        width: "100%",
        borderRadius: 10,
        marginBottom: 24,
        marginTop: 12,
        padding: 12,
        alignItems: "center",
    },
    submitText: {
        fontSize: 17,
        fontWeight: "500",
        color: white,
    },
    inputText: {
        backgroundColor: white,
        width: "100%",
        fontSize: 17,
        padding: 12,
        marginBottom: 18,
        borderRadius: 10,
    },
})

export default EditPhoneNumberModal;