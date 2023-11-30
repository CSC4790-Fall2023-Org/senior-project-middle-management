import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text, TouchableOpacity} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import EmployeeHrsStatusBar from "../components/EmployeeHrsStatusBar";
import MyShiftList from "../components/MyShiftList";
import AvailableShiftList from "../components/AvailableShiftList";
import CustomDashboardHeader from "../components/CustomDashboardHeader";
import employeeData from '../mockApiCalls/employeeData.json';
import companyData from '../mockApiCalls/companyData.json';
import {black, grayBackground, primaryGreen, white} from "../utils/Colors";
import {CircleUser, Inbox} from "../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import transferInbox from "../components/TransferInbox";
import TransferInbox from "../components/TransferInbox";

function EmployeeScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [transferInbox, setTransferInbox] = useState(false);

    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    const navigation = useNavigation();
    const handleProfileClick = () => {
        navigation.navigate(ScreenNames.EMPLOYEE_SETTINGS);
    }

    const handleInboxClick = () => {
        setTransferInbox(!transferInbox);
    }

    const tabs = [
        {
            id: 1,
            text: 'My Shifts',
        },
        {
            id: 2,
            text: 'Available',
        },
    ];

    return (
        <View style={styles.screen}>
            {/*<CustomHeader title={'Punchcard'} page={ScreenNames.EMPLOYEE_SETTINGS} icon={CircleUser}/>*/}
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    animated={true}
                    showHideTransition={'fade'}
                />
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>Punchcard</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => handleInboxClick()} style={styles.iconContainer}>
                        <FontAwesomeIcon icon={Inbox} size={32} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleProfileClick()} style={styles.iconContainer}>
                        <FontAwesomeIcon icon={CircleUser} size={32} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs} />
            </View>
            {selectedIndex === 0 && <MyShiftList />}
            {selectedIndex === 1 && <AvailableShiftList />}
            <EmployeeHrsStatusBar employee={employeeData} company={companyData} style={styles.statusBar} />
            <TransferInbox inboxModal={transferInbox} setInboxModal={setTransferInbox} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: grayBackground,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    container: {
        height: 100,
        backgroundColor: primaryGreen,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 16,
        paddingBottom: 2,
    },
    title: {
        color: white,
        fontSize: 34,
        fontWeight: "bold",
        overflow: "hidden",
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    iconContainer: {
        paddingLeft: 18,
    },
    icon: {
        color: white,
        marginBottom: 8,
    },
    headerContainer: {
        shadowColor: black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 2,
    },
    statusBar: {
        alignSelf: "stretch",
    },
});

export default EmployeeScreen;
