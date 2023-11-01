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

function EditEmailModal({emailModalVisible, setEmailModalVisible}) {
    const [email, setEmail] = useState(employeeData.email);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [originalEmail, setOriginalEmail] = useState(employeeData.email);

    const resetEmail = () => {
        setEmail(originalEmail);
    }

    const handleCancel = () => {
        setEmailModalVisible(!emailModalVisible);
        resetEmail();
        setInvalidEmail(false);
    }

    const handleSubmit = () => {
        const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        const validEmail = emailPattern.test(email);
        if (!validEmail) {
            setInvalidEmail(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else {
            setEmailModalVisible(!emailModalVisible);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            );
            setInvalidEmail(false);
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Email</Text>
                        <TextInput
                            style={[styles.inputText, invalidEmail ? styles.errorBorder : null]}
                            autoCapitalize={"none"}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="ex. johndoe@email.com"
                            placeholderTextColor={secondaryGray}
                            autoComplete={"email"}
                            inputMode={"email"}
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

export default EditEmailModal;