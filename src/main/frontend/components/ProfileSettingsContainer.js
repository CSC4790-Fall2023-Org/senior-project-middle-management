import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import employeeData from "../mockApiCalls/employeeData.json";
import EditNameModal from "./userSettings/EditNameModal";
import EditEmailModal from "./userSettings/EditEmailModal";
import EditPhoneNumberModal from "./userSettings/EditPhoneNumberModal";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronRight} from "../utils/Icons";
import {black, grayAction, secondaryGray, white} from "../utils/Colors";

function ProfileSettingsContainer() {
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);

    return (
        <View style={styles.settingContainer}>
            <TouchableOpacity style={styles.settingItem} onPress={() => setNameModalVisible(true)}>
                <Text style={styles.settingLabel}>Name</Text>
                <Text style={styles.labelValue} numberOfLines={1} ellipsizeMode={"tail"}>{employeeData.fName + ' ' + employeeData.lName}</Text>
            </TouchableOpacity>
            <EditNameModal nameModalVisible={nameModalVisible} setNameModalVisible={setNameModalVisible} />
            <TouchableOpacity style={styles.settingItem} onPress={() => setEmailModalVisible(true)}>
                <Text style={styles.settingLabel}>Email</Text>
                <Text style={styles.labelValue} numberOfLines={1} ellipsizeMode={"middle"}>{employeeData.email}</Text>
            </TouchableOpacity>
            <EditEmailModal emailModalVisible={emailModalVisible} setEmailModalVisible={setEmailModalVisible} />
            <TouchableOpacity style={styles.settingItem} onPress={() => setPhoneNumberModalVisible(true)}>
                <Text style={styles.settingLabel}>Phone Number</Text>
                <Text style={styles.labelValue}>{employeeData.phoneNumber}</Text>
            </TouchableOpacity>
            <EditPhoneNumberModal phoneNumberModalVisible={phoneNumberModalVisible} setPhoneNumberModalVisible={setPhoneNumberModalVisible} />
            <TouchableOpacity style={[styles.settingItem, {borderBottomWidth: 0}]}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <View style={{paddingRight: 16}}>
                    <FontAwesomeIcon icon={ChevronRight} size={16} style={styles.labelValue}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
        width: "40%",
        color: black,
        fontSize: 16,
        paddingLeft: 16,
    },
    labelValue: {
        width: "60%",
        color: grayAction,
        fontSize: 16,
        paddingRight: 16,
        textAlign: "right",
    },
})

export default ProfileSettingsContainer;