import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const CustomHeader = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#50C878',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    title: {
        color: 'white',
        fontSize: 32,
        marginBottom: 8,
        marginLeft: 12,
    },
});

export default CustomHeader;