import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {grayBackground, primaryGreen, white} from "../../utils/Colors";
import CustomButton from "../CustomButton";

const StaffBanner = ({setBannerPress, bannerPress}) => {
    const handlePressRight = () => {
        setBannerPress(true);
    };
    const handlePressLeft = () =>{
        setBannerPress(false);
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressLeft}>
                <View
                    style={[!bannerPress ? {backgroundColor: primaryGreen}
                        : {backgroundColor: grayBackground},
                        styles.touchableContainer,
                        {borderTopLeftRadius: 15, borderBottomLeftRadius: 15}]}
                >
                    <Text style={!bannerPress ? styles.touchedText : styles.text}>Employees</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressRight}>
                <View
                    style={[bannerPress ? {backgroundColor : primaryGreen}
                        : {backgroundColor: grayBackground},
                        styles.touchableContainer,
                        {borderTopRightRadius: 15, borderBottomRightRadius: 15}]}
                >
                    <Text style={bannerPress ? styles.touchedText:styles.text}>Managers</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: CustomButton.width,
        borderWidth: 1,
        borderColor: primaryGreen,
    },
    text: {
        color: primaryGreen,
        fontSize: 17,
    },
    touchedText: {
        color: white,
        fontSize: 17,
    },
});

export default StaffBanner;
