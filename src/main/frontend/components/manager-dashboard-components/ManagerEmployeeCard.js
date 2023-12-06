import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useState} from "react";
import {ChevronRight} from "../../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    black,
    destructiveAction,
    grayAction,
    grayBackground,
    primaryGreen,
    secondaryGray,
    white
} from "../../utils/Colors";
import CustomButton from "../CustomButton";
import {ipAddy} from "../../utils/IPAddress";
import employeeData from "../../mockApiCalls/employeeData.json";
import * as Haptics from "expo-haptics";

const ManagerEmployeeCard = ({id, name, type, worked, shiftsTaken}) =>{
    const [isModalVisible, setModalVisible] = useState(false);

    const warnText = "Are you sure you want to delete " + name + "?"
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleConfirmDelete = () => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
        );
        Alert.alert (
            'Delete ' + name,
            'Are you sure you want to delete ' + name + '?',
            [
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: handleEmployeeDelete,
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
        setDeleteModalVisible(!isDeleteModalVisible)
    }

    const handleModalVisible = () => {
        setModalVisible(!isModalVisible);
    }

    const handleEmployeeDelete = () => {
        fetch('http://' + ipAddy + ':8080/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employeeId: id
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
        setModalVisible(false);
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={handleModalVisible}>
                <View style={styles.cardContainer}>
                    <Text style={[styles.normalText, {fontWeight: "600"}]}>{name}</Text>
                    <FontAwesomeIcon icon={ChevronRight} size={17} />
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={handleModalVisible}
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
                            onPress={handleModalVisible}
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
                        <Text style={styles.sectionSubtitle}>Employee Info</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Name</Text>
                                <Text
                                    style={styles.infoValue}
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                >
                                    {name}
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text
                                    style={styles.infoValue}
                                    numberOfLines={1}
                                    ellipsizeMode={"middle"}
                                >
                                    {employeeData.email}
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Phone Number</Text>
                                <Text style={styles.infoValue}>{employeeData.phoneNumber}</Text>
                            </View>
                            <View style={[styles.infoItem, {borderBottomWidth: 0}]}>
                                <Text style={[styles.infoLabel, {maxWidth: "20%"}]}>ID</Text>
                                <Text
                                    style={[styles.infoValue, {width: "80%"}]}
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}>{id}</Text>
                            </View>
                        </View>
                        <Text style={styles.sectionSubtitle}>Work Info</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Job Title</Text>
                                <Text style={styles.infoValue}>{type}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Shifts Claimed</Text>
                                <Text style={styles.infoValue}>{shiftsTaken}</Text>
                            </View>
                            <View style={[styles.infoItem, {borderBottomWidth: 0}]}>
                                <Text style={styles.infoLabel}>Hours Claimed</Text>
                                <Text style={styles.infoValue}>{worked}</Text>
                            </View>
                        </View>
                        <View style={styles.deleteButton}>
                            <TouchableOpacity
                                style={{width: "100%", alignItems: "center"}}
                                onPress={handleConfirmDelete}>
                                <Text style={styles.deleteText}>Delete Employee</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
    },
    scrollView: {
        position: "relative",
        backgroundColor: grayBackground,
        flexDirection: "column",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    normalText: {
        fontSize: 17,
    },
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
    sectionSubtitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 21,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    infoContainer: {
        backgroundColor: white,
        marginBottom: 18,
        borderRadius: 10,
        paddingLeft: 14,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
    infoLabel: {
        width: "40%",
        color: black,
        fontSize: 17,
    },
    infoValue: {
        width: "60%",
        color: grayAction,
        fontSize: 17,
        paddingRight: 14,
        textAlign: "right",
    },
    topContainerModal: {
        paddingTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: "row",
    },
    deleteButton: {
        width: "100%",
        borderRadius: 10,
        marginVertical: 24,
        padding: 12,
        alignItems: "center",
        backgroundColor: white,
    },
    deleteText: {
        fontSize: 17,
        color: destructiveAction,
    },

});
export default ManagerEmployeeCard;