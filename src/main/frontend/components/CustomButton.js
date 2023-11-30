import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CustomButton = ({ buttonText, handlePress, color, textColor }) => {

    return (
        <TouchableOpacity onPress={() => {handlePress()} }>
            <View style={[styles.button, {backgroundColor: color}]}>
                <Text style={[styles.buttonTextStyle, {color: textColor,}]}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 18,
        paddingVertical: 12,
        borderRadius: 10,
        width: 250,
    },
    buttonTextStyle:{
        fontSize: 17,
        fontWeight: "bold",
    },
});

export default CustomButton;