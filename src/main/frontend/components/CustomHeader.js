import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {CircleUser} from "../utils/Icons";

const CustomHeader = ({title, page}) => {
    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate(page);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => handleUserClick()}>
                <FontAwesomeIcon icon={CircleUser} size={32} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#50C878',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",

    },
    title: {
        color: 'white',
        fontSize: 32,
        marginBottom: 8,
        marginLeft: 12,

    },
    icon: {
        color: 'white',
        marginBottom: 8,
        marginRight: 12,
    }
});

export default CustomHeader;