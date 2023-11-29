import React from "react";
import {Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {grayBackground, primaryGreen, white} from "../utils/Colors";
import AvailableShiftList from "./AvailableShiftList";

const TransferInbox = ({inboxModal, setInboxModal}) => {
    const closeModal = () => {
        setInboxModal(!inboxModal);
    }

    return (
        <View>
            <Modal
                animationType={"slide"}
                visible={inboxModal}
                presentationStyle={"pageSheet"}
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
                        <View style={styles.headerContainer}>
                            <Text style={styles.sectionTitle}>Transfer Portal</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <AvailableShiftList />
                        </View>
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
    headerContainer: {
        paddingHorizontal: 16,
    },
    modalBody: {
        flex: 1,
        paddingVertical: 24,
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 34,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 18,
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

export default TransferInbox;
