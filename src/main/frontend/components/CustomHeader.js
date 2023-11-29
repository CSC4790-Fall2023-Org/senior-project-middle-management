import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {primaryGreen, white} from "../utils/Colors";

const CustomHeader = ({title, page, icon}) => {
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
                {icon &&
                    <FontAwesomeIcon icon={icon} size={32} style={styles.icon}/>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        maxWidth: "90%",
    },
    icon: {
        color: white,
        marginBottom: 8,
    },
});

export default CustomHeader;
