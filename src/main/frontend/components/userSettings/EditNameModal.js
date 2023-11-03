import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback
} from "react-native";
import * as Haptics from 'expo-haptics';
import {black, destructiveAction, primaryGreen, secondaryGray} from "../../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Check, XMark} from "../../utils/Icons";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditNameModal({nameModalVisible, setNameModalVisible}) {
    const [fName, setFName] = useState(employeeData.fName);
    const [lName, setLName] = useState(employeeData.lName);
    const [emptyFName, setEmptyFName] = useState(false);
    const [emptyLName, setEmptyLName] = useState(false);
    const [originalFName, setOriginalFName] = useState(employeeData.fName);
    const [originalLName, setOriginalLName] = useState(employeeData.lName);

    const isValueChanged = (originalFName !== fName) || (originalLName !== lName);

    const resetFName = () => {
        setFName(originalFName);
    };

    const resetLName = () => {
        setLName(originalLName);
    };

    const handleCancel = () => {
        setNameModalVisible(!nameModalVisible);
        resetFName();
        resetLName();
        setEmptyFName(false);
        setEmptyLName(false);
    }

    const handleSubmit = () => {
        if (fName.trim() === '') {
            setEmptyFName(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (lName.trim() === '') {
            setEmptyLName(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (isValueChanged) {
            setNameModalVisible(!nameModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setEmptyFName(false);
            setEmptyLName(false);
            setOriginalFName(fName);
            setOriginalLName(lName);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={nameModalVisible}
            onRequestClose={() => {
                setNameModalVisible(!nameModalVisible);
            }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={handleCancel}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Edit Name</Text>
                                <TextInput
                                    style={[styles.inputText, emptyFName ? styles.errorBorder : null]}
                                    autoCapitalize={"words"}
                                    onChangeText={(fName) => {
                                        setFName(fName);
                                        setEmptyFName(false);
                                    }}
                                    value={fName}
                                    placeholder="First Name"
                                    placeholderTextColor={secondaryGray}
                                    autoComplete={"name-given"}
                                />
                                <TextInput
                                    style={[styles.inputText, emptyLName ? styles.errorBorder : null]}
                                    autoCapitalize={"words"}
                                    onChangeText={(lName) => {
                                        setLName(lName);
                                        setEmptyLName(false);
                                    }}
                                    value={lName}
                                    placeholder="Last Name"
                                    placeholderTextColor={secondaryGray}
                                    autoComplete={"name-family"}
                                />
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={styles.buttonCancel}
                                        onPress={handleCancel}
                                    >
                                        <FontAwesomeIcon icon={XMark} size={32} color={destructiveAction} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonSubmit}
                                        onPress={handleSubmit}
                                    >
                                        <FontAwesomeIcon icon={Check} size={32} color={primaryGreen} />
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
        marginTop: 24,
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

export default EditNameModal;