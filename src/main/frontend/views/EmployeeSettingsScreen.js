import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../utils/ScreenNames";
import {ChevronLeft, ChevronRight} from "../utils/Icons";
import {black, grayAction, secondaryGray, white} from "../utils/Colors";
import employeeData from '../mockApiCalls/employeeData.json';
import NameChangeModal from "../components/NameChangeModal";

function EmployeeSettingsScreen() {
    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.EMPLOYEE);
    }

    const [nameModalVisible, setNameModalVisible] = useState(false);

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
                    <NameChangeModal nameModalVisible={nameModalVisible} setNameModalVisible={setNameModalVisible} />
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
});

export default EmployeeSettingsScreen;