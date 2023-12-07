import React from "react";
import {Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {grayBackground, primaryGreen, white} from "../../utils/Colors";
import EmployeeList from "../manager-dashboard-components/EmployeeList";
import EmployeeLoginList from "./EmployeeLoginList";

const EmployeeListModal = ({listModal, setListModal}) => {
    const closeModal = () => {
        setListModal(!listModal);
    }

    return (
        <View>
            <Modal
                animationType={"slide"}
                visible={listModal}
                presentationStyle={"pageSheet"}
                onRequestClose={closeModal}
            >
                <StatusBar
                    barStyle={'light-content'}
                    animated={true}
                    showHideTransition={'fade'}
                />
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            onPress={closeModal}
                        >
                            <Text
                                style={[styles.normalText, {color: white}]}
                                allowFontScaling={false}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <EmployeeLoginList setEmployeeListModal={setListModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: grayBackground,
    },
    modalHeader: {
        height: 55,
        backgroundColor: primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    modalBody: {
        height: "100%",
        paddingBottom: 24,
    },
    normalText: {
        fontSize: 17,
    },
    scrollView: {
        position: "relative",
        backgroundColor: grayBackground,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        padding: 16,
    },
});

export default EmployeeListModal;
