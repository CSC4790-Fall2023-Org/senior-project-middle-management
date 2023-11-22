import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, StatusBar} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../utils/ScreenNames";
import {ChevronLeft} from "../utils/Icons";
import {secondaryGray} from "../utils/Colors";

function CompanySettingsScreen() {
    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.COMPANY);
    }

    return (
        <View>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                showHideTransition={'fade'}
            />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => handleUserClick()} style={styles.icon}>
                    <FontAwesomeIcon icon={ChevronLeft} size={24}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 100,
        backgroundColor: "white",
        alignItems: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: secondaryGray,
    },
    headerText: {
        color: "black",
        fontSize: 24,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    icon: {
        color: 'black',
        position: 'absolute',
        left: 12,
        bottom: 12,
        width: 48,
    }
});

export default CompanySettingsScreen;