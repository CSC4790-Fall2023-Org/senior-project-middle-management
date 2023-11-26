import React, {useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Alert
} from "react-native";
import * as Haptics from 'expo-haptics';
import {
    black,
    grayAction,
    grayBackground,
    primaryGreen,
    secondaryGray,
    white
} from "../../utils/Colors";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditNameModal({nameModalVisible, setNameModalVisible}) {
    const [fName, setFName] = useState(employeeData.fName);
    const [lName, setLName] = useState(employeeData.lName);
    const [emptyFName, setEmptyFName] = useState(false);
    const [emptyLName, setEmptyLName] = useState(false);
    const [originalFName, setOriginalFName] = useState(employeeData.fName);
    const [originalLName, setOriginalLName] = useState(employeeData.lName);
    const [fNameSaveError, setFNameSaveError] = useState(false);
    const [lNameSaveError, setLNameSaveError] = useState(false);

    const isValueChanged = (originalFName !== fName) || (originalLName !== lName);

    const resetFName = () => {
        setFName(originalFName);
    };

    const resetLName = () => {
        setLName(originalLName);
    };

    const onHandleChangeTextFName = (text) => {
        setFName(text);
        setFNameSaveError(false);
        setEmptyFName(false);
    }

    const onHandleChangeTextLName = (text) => {
        setLName(text);
        setLNameSaveError(false);
        setEmptyLName(false);
    }

    const handleCancel = () => {
        setNameModalVisible(!nameModalVisible);
        resetFName();
        resetLName();
        setEmptyFName(false);
        setEmptyLName(false);
        setFNameSaveError(false);
        setLNameSaveError(false);
    }

    const handleSubmit = () => {
        if (fName.trim() === '' && !fNameSaveError) {
            setEmptyFName(true);
            setFNameSaveError(true);
            Alert.alert(
                'Please enter a valid first name.',
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
        } else if (lName.trim() === '' && !lNameSaveError) {
            setEmptyLName(true);
            setLNameSaveError(true);
            Alert.alert(
                'Please enter a valid last name.',
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
        } else if (isValueChanged && !fNameSaveError && !lNameSaveError) {
            setNameModalVisible(!nameModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setEmptyFName(false);
            setEmptyLName(false);
            setFNameSaveError(false);
            setLNameSaveError(false);
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
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.inputText}
                                        autoCapitalize={"words"}
                                        onChangeText={onHandleChangeTextFName}
                                        value={fName}
                                        placeholder="First Name"
                                        placeholderTextColor={secondaryGray}
                                        autoComplete={"name-given"}
                                    />
                                    <TextInput
                                        style={[styles.inputText, {borderBottomWidth: 0}]}
                                        autoCapitalize={"words"}
                                        onChangeText={onHandleChangeTextLName}
                                        value={lName}
                                        placeholder="Last Name"
                                        placeholderTextColor={secondaryGray}
                                        autoComplete={"name-family"}
                                    />
                                </View>
                                <View style={[styles.submitButton,
                                    (isValueChanged && !fNameSaveError && !lNameSaveError) ? {backgroundColor: primaryGreen}
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
        marginTop: 24,
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
    inputContainer: {
        width: "100%",
        marginBottom: 18,
        borderRadius: 10,
        backgroundColor: white,
        paddingLeft: 12,
    },
    inputText: {
        width: "100%",
        fontSize: 17,
        padding: 12,
        paddingLeft: 0,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
})

export default EditNameModal;