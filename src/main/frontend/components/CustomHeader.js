import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {useNavigation} from "@react-navigation/native";

const CustomHeader = ({title}) => {
    const navigation = useNavigation();
    const handleUserClick = () => {
        navigation.navigate('User Settings');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => handleUserClick()}>
                <FontAwesomeIcon icon={faCircleUser} size={32} style={styles.icon}/>
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