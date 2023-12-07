import {
    FlatList,
    Modal,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {grayBackground, primaryGreen, white} from "../../utils/Colors";
import React from "react";
import LocationCard from "./LocationCard";

const CompanyLocationsModal = ({locationsModal, setLocationsModal, locationList}) => {

    const closeModal = () => {
        setLocationsModal(false);
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Locations</Text>
        </View>
    );

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
                    <FlatList
                        style={styles.scrollView}
                        data={locationList}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.locationId.toString()}
                        renderItem={({item: location}) => (
                            <LocationCard locationName={location.locationName} />
                        )}
                    />
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
        flexDirection: "column",
        paddingVertical: 16,
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 34,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    headerContainer: {
        paddingHorizontal: 16,
    },
    normalText: {
        fontSize: 17,
    },
});

export default CompanyLocationsModal;