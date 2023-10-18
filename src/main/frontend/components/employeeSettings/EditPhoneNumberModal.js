import React from 'react';
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
import {black, destructiveAction, primaryGreen, secondaryGray} from "../../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Check, XMark} from "../../utils/Icons";
import employeeData from "../../mockApiCalls/employeeData.json";

function EditPhoneNumberModal({phoneNumberModalVisible, setPhoneNumberModalVisible}) {
    const [phoneNumber, onChangePhoneNumber] = React.useState(employeeData.phoneNumber);

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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Phone Number</Text>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize={"words"}
                            onChangeText={onChangePhoneNumber}
                            value={phoneNumber}
                            placeholder="ex. 5555555555"
                            placeholderTextColor={secondaryGray}
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={() => setPhoneNumberModalVisible(!phoneNumberModalVisible)}>
                                <FontAwesomeIcon icon={XMark} size={32} color={destructiveAction} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonSave}
                                onPress={() => setPhoneNumberModalVisible(!phoneNumberModalVisible)}>
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
    buttonSave: {
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
})

export default EditPhoneNumberModal;