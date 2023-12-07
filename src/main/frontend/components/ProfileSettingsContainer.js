import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import EditNameModal from "./userSettings/EditNameModal";
import EditEmailModal from "./userSettings/EditEmailModal";
import EditPhoneNumberModal from "./userSettings/EditPhoneNumberModal";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronRight} from "../utils/Icons";
import {black, grayAction, secondaryGray, white} from "../utils/Colors";
import {ipAddy} from "../utils/IPAddress";
import {useAppContext} from "../AppContext";

function ProfileSettingsContainer() {
    // const [nameModalVisible, setNameModalVisible] = useState(false);
    // const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
    // const [emailModalVisible, setEmailModalVisible] = useState(false);
    const { constEmployeeId } = useAppContext();
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getEmployeeInfo', {
            method: 'POST',
            body: JSON.stringify({
                employeeId: constEmployeeId
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                setEmployeeData(data.employeeInfo);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const firstName = employeeData ? employeeData.firstName : '';
    const lastName = employeeData ? employeeData.lastName : '';
    const email = employeeData ? employeeData.employeeEmail : '';
    const phoneNumber = employeeData ? employeeData.employeePhoneNumber : '';

    return (
        <View style={styles.settingContainer}>
            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Name</Text>
                <Text
                    style={styles.labelValue}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                >
                    {firstName + ' ' + lastName}
                </Text>
            </View>
            {/*<EditNameModal*/}
            {/*    nameModalVisible={nameModalVisible}*/}
            {/*    setNameModalVisible={setNameModalVisible}*/}
            {/*/>*/}
            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Email</Text>
                <Text
                    style={styles.labelValue}
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                >
                    {email}
                </Text>
            </View>
            {/*<EditEmailModal*/}
            {/*    emailModalVisible={emailModalVisible}*/}
            {/*    setEmailModalVisible={setEmailModalVisible}*/}
            {/*/>*/}
            <View style={[styles.settingItem, {borderBottomWidth: 0}]}>
                <Text style={styles.settingLabel}>Phone Number</Text>
                <Text style={styles.labelValue}>
                    {phoneNumber}
                </Text>
            </View>
            {/*<EditPhoneNumberModal*/}
            {/*    phoneNumberModalVisible={phoneNumberModalVisible}*/}
            {/*    setPhoneNumberModalVisible={setPhoneNumberModalVisible}*/}
            {/*/>*/}
            {/*<View style={[styles.settingItem, {borderBottomWidth: 0}]}>*/}
            {/*    <Text style={styles.settingLabel}>Notifications</Text>*/}
            {/*    <View style={{paddingRight: 16}}>*/}
            {/*        <FontAwesomeIcon icon={ChevronRight} size={17} style={styles.labelValue}/>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    settingContainer: {
        backgroundColor: white,
        margin: 16,
        borderRadius: 10,
        paddingLeft: 14,
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
        fontSize: 17,
    },
    labelValue: {
        width: "60%",
        color: grayAction,
        fontSize: 17,
        paddingRight: 14,
        textAlign: "right",
    },
})

export default ProfileSettingsContainer;