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

function EditEmailModal({emailModalVisible, setEmailModalVisible}) {
    const [email, setEmail] = useState(employeeData.email);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [originalEmail, setOriginalEmail] = useState(employeeData.email);
    const [saveError, setSaveError] = useState(false);

    const isValueChanged = originalEmail !== email;

    const resetEmail = () => {
        setEmail(originalEmail);
    }

    const handleOnChangeText = (text) => {
        setEmail(text);
        setSaveError(false);
        setInvalidEmail(false);
    }

    const handleCancel = () => {
        setEmailModalVisible(!emailModalVisible);
        resetEmail();
        setInvalidEmail(false);
        setSaveError(false);
    }

    const handleSubmit = () => {
        const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        const validEmail = emailPattern.test(email);
        if (!validEmail && !saveError) {
            setInvalidEmail(true);
            setSaveError(true);
            Alert.alert(
                'Please enter a valid email address.',
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
            setEmailModalVisible(!emailModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setInvalidEmail(false);
            setSaveError(false);
            setOriginalEmail(email);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={emailModalVisible}
            onRequestClose={() => {
                setEmailModalVisible(!emailModalVisible);
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={handleCancel}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Edit Email</Text>
                                <TextInput
                                    style={styles.inputText}
                                    autoCapitalize={"none"}
                                    onChangeText={handleOnChangeText}
                                    value={email}
                                    placeholder="ex. johndoe@email.com"
                                    placeholderTextColor={secondaryGray}
                                    autoComplete={"email"}
                                    inputMode={"email"}
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
        color: white,
        fontWeight: "500",
    },
    inputText: {
        width: "100%",
        fontSize: 17,
        padding: 12,
        marginBottom: 18,
        backgroundColor: white,
        borderRadius: 10,
    },
})

export default EditEmailModal;