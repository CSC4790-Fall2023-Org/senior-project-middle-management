import React, { useState } from 'react';
import {View, StyleSheet,} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


const MultiWheelPicker = ({wheelData,placeholder, selectedItem, setSelectedItems}) => {


    const handleWheelChange = (value) => {
        setSelectedItems(value);
    };

    return (
            <View style={[styles.container]}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: placeholder.toString(), value: placeholder }}
                        placeholderTextColor="black"
                        onValueChange={(value) => handleWheelChange(value)}
                        items={wheelData.map((item) => ({ label: item.toString(), value: item }))}
                        value={selectedItem}
                    />
            </View>


    );
};
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"stretch",
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: "#000000",
        fontSize: 20,
    },
    inputAndroid: {
        color: "#000000",
        fontSize: 20,
    },
    placeholder: {
        color: "#000000",
        fontSize:20
    },
});
export default MultiWheelPicker;
