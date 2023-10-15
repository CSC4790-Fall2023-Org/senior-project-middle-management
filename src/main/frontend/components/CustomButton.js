import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import {primaryGreen} from "../utils/Colors";

const CustomButton = ({ buttonText, handlePress }) => {

    return (
        <TouchableOpacity onPress={() => {handlePress()} }>
            <View style={styles.button}>
                <Text style={styles.buttonTextStyle}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 12,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 10,
        width: 250,
        backgroundColor: primaryGreen,
    },
    buttonTextStyle:{
        fontSize: 24,
        color: 'white',
    },
});

export default CustomButton;