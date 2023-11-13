import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Modal} from 'react-native';
import * as Haptics from "expo-haptics";
import {black, destructiveAction, grayBackground, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import CustomButton from "../CustomButton";


const TimeWarnPopup = ({isModalVisible, handlePressButton, submitForm}) => {
    const timeWarn = () =>{
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        );
    }
    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handlePressButton}
        >
            <TouchableWithoutFeedback onPress={timeWarn}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <Text style={styles.warnText}>
                                You are making a shift that goes overnight are you sure you want to submit it?
                            </Text>
                            <CustomButton buttonText={"No, Cancel"} handlePress={handlePressButton} color={destructiveAction} textColor={white}/>
                            <CustomButton buttonText={"Yes, Submit"} handlePress={submitForm} color={primaryGreen} textColor={white}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: secondaryGray,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    warnText:{
        fontWeight:'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});
export default TimeWarnPopup;