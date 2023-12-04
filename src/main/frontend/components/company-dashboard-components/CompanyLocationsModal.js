import {
    Modal,
    ScrollView,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {grayBackground, primaryGreen, white} from "../../utils/Colors";
import React from "react";

const CompanyLocationsModal = ({locationsModal, setLocationsModal}) => {

    const closeModal = () => {
        setLocationsModal(false);
    }

    return(
        <View>
            <Modal
                animationType="slide"
                visible={locationsModal}
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
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionTitle}>Company Locations</Text>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalHeader: {
        height: 55,
        backgroundColor: primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: grayBackground,
    },
    scrollView: {
        position: "relative",
        backgroundColor: grayBackground,
        flexDirection: "column",
        paddingVertical: 24,
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 34,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 17,
    },
});

export default CompanyLocationsModal;