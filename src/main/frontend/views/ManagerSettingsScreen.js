import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {useNavigation} from "@react-navigation/native";

function ManagerSettingsScreen() {
    const navigation = useNavigation();

    const handleUserClick = () => {
        navigation.navigate('Manager');
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => handleUserClick()} style={styles.icon}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24}/>
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
        borderBottomColor: '#dddddd',
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

export default ManagerSettingsScreen;