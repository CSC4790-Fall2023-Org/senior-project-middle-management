import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";


const CustomButton = ({title, destination}) => {
    const navigation = useNavigation();
    const reNavigate = () => {
        navigation.navigate(destination);
    }
    return (
        <TouchableOpacity style={styles.loginButton} onPress={() => reNavigate()}>
            <View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',

    },
    text:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000000',
    },

});

export default CustomButton();