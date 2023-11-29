import React from "react";
import {StyleSheet, View, Text, ScrollView, Pressable, StatusBar} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../utils/ScreenNames";
import {ChevronLeft} from "../utils/Icons";
import {black, secondaryGray, white} from "../utils/Colors";
import ProfileSettingsContainer from "../components/ProfileSettingsContainer";

function EmployeeSettingsScreen() {
    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.EMPLOYEE);
    }

    return (
        <View>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                showHideTransition={'fade'}
            />
            <View style={styles.headerContainer}>
                <Pressable onPress={() => handleUserClick()} style={styles.icon}>
                    <FontAwesomeIcon icon={ChevronLeft} size={24} color={black}/>
                </Pressable>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <ScrollView style={styles.pageScroll}>
                <ProfileSettingsContainer />
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
        fontSize: 17,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    icon: {
        position: 'absolute',
        left: 12,
        bottom: 12,
        width: 48,
    },
    pageScroll: {
        height: "100%",
    },
});

export default EmployeeSettingsScreen;
