import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Pressable, TextInput} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../utils/ScreenNames";
import {Check, ChevronLeft, ChevronRight, XMark} from "../utils/Icons";
import {black, destructiveAction, grayAction, primaryGreen, secondaryGray, white} from "../utils/Colors";
import employeeData from '../mockApiCalls/employeeData.json';

function EmployeeSettingsScreen() {
    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.EMPLOYEE);
    }

    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [fName, onChangefName] = React.useState(employeeData.fName);
    const [lName, onChangelName] = React.useState(employeeData.lName);

    return (
        <View>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => handleUserClick()} style={styles.icon}>
                    <FontAwesomeIcon icon={ChevronLeft} size={24}/>
                </Pressable>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <ScrollView style={styles.pageScroll}>
                <View style={styles.settingContainer}>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setNameModalVisible(true)}>
                        <Text style={styles.settingLabel}>Name</Text>
                        <Text style={styles.labelValue}>{employeeData.fName + ' ' + employeeData.lName}</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={nameModalVisible}
                        onRequestClose={() => {
                            setNameModalVisible(!nameModalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Edit Name</Text>
                                <TextInput
                                    style={styles.inputText}
                                    autoCapitalize={"words"}
                                    onChangeText={onChangefName}
                                    value={fName}
                                    placeholder="First Name"
                                    placeholderTextColor={secondaryGray}
                                />
                                <TextInput
                                    style={styles.inputText}
                                    autoCapitalize={"words"}
                                    onChangeText={onChangelName}
                                    value={lName}
                                    placeholder="Last Name"
                                    placeholderTextColor={secondaryGray}
                                />
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={styles.buttonCancel}
                                        onPress={() => setNameModalVisible(!nameModalVisible)}>
                                        <FontAwesomeIcon icon={XMark} size={32} color={destructiveAction} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonSave}
                                        onPress={() => setNameModalVisible(!nameModalVisible)}>
                                        <FontAwesomeIcon icon={Check} size={32} color={primaryGreen} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Email</Text>
                        <Text style={styles.labelValue}>{employeeData.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Phone Number</Text>
                        <Text style={styles.labelValue}>{employeeData.phoneNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingItem, {borderBottomWidth: 0}]}>
                        <Text style={styles.settingLabel}>Notifications</Text>
                        <View style={{paddingRight: 16}}>
                            <FontAwesomeIcon icon={ChevronRight} size={16} style={styles.labelValue}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 100,
        backgroundColor: white,
        alignItems: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: secondaryGray,
    },
    headerText: {
        color: black,
        fontSize: 24,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    icon: {
        color: black,
        position: 'absolute',
        left: 12,
        bottom: 12,
        width: 48,
    },
    pageScroll: {
        height: "100%",
    },
    settingContainer: {
        backgroundColor: white,
        margin: 16,
        borderRadius: 10,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
    settingLabel: {
        color: black,
        fontSize: 16,
        paddingLeft: 16,
    },
    labelValue: {
        color: grayAction,
        fontSize: 16,
        paddingRight: 16,
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
    }
});

export default EmployeeSettingsScreen;