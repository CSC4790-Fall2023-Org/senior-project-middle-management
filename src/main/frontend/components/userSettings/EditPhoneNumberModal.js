import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import * as Haptics from "expo-haptics";
import {black, destructiveAction, primaryGreen, secondaryGray} from "../../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Check, XMark} from "../../utils/Icons";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditPhoneNumberModal({phoneNumberModalVisible, setPhoneNumberModalVisible}) {
    const [phoneNumber, setPhoneNumber] = useState(employeeData.phoneNumber);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState(employeeData.phoneNumber);

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
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPressOut={() => {setPhoneNumberModalVisible(false)}}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
                    <View style={styles.centeredView}>
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
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    style={styles.buttonCancel}
                                    onPress={handleCancel}>
                                    <FontAwesomeIcon icon={XMark} size={32} color={destructiveAction} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonSubmit}
                                    onPress={handleSubmit}>
                                    <FontAwesomeIcon icon={Check} size={32} color={primaryGreen} />
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
    buttonSubmit: {
        width: "50%",
        padding: 12,
        alignItems: "center",
        paddingRight: 0,
    },
    buttonCancel: {
        width: "50%",
        padding: 12,
        alignItems: "center",
        paddingLeft: 0,
    },
    buttonsContainer: {
        flexDirection: "row",
        paddingTop: 12,
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

export default EditPhoneNumberModal;