import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {CircleUser} from "../utils/Icons";
import {primaryGreen, white} from "../utils/Colors";

const CustomHeader = ({title, page}) => {
    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate(page);
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                animated={true}
                showHideTransition={'fade'}
            />
            <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>{title}</Text>
            <TouchableOpacity onPress={() => handleUserClick()}>
                <FontAwesomeIcon icon={CircleUser} size={32} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: primaryGreen,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 16,
    },
    title: {
        color: white,
        fontSize: 32,
        marginBottom: 8,
        overflow: "hidden",
        maxWidth: "90%",
        maxHeight: 32,
    },
    icon: {
        color: white,
        marginBottom: 8,
    }
});

export default CustomHeader;