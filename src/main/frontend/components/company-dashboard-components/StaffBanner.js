import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';


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
                <View style={[!bannerPress ? {backgroundColor:'#50C878'}:{backgroundColor:'#FFFFFF'}, styles.touchableContainer, {borderTopLeftRadius:15,borderBottomLeftRadius:15,}]}>
                    <Text style={!bannerPress ? styles.touchedText:styles.text}>Employees</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressRight}>
                <View style={[bannerPress ? {backgroundColor:'#50C878'}:{backgroundColor:'#FFFFFF'},styles.touchableContainer, {borderTopRightRadius:15,borderBottomRightRadius:15,}]}>
                    <Text style={bannerPress ? styles.touchedText:styles.text}>Managers</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

    },
    touchableContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        width:150,
        borderWidth:1,
        borderColor:'#50C878',
    },

    text:{
        color:'#50C878',
        fontSize:20,
    },
    touchedText:{
        color:'#FFFFFF',
        fontSize:20,
    },
});
export default StaffBanner;