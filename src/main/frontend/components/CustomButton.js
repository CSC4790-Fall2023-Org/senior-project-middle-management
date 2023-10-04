import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CustomButton = ({ buttonText, handlePress, buttonWidth }) => {

    return (
        <TouchableOpacity onPress={() => {handlePress()} }>
            <View style={[styles.button, {width: buttonWidth}]}>
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
        backgroundColor: '#50C878',
    },
    buttonTextStyle:{
        fontSize: 24,
        color: 'white',
    },
});

export default CustomButton;