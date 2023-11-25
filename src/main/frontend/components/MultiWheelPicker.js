import React, { useState } from 'react';
import {View, StyleSheet,} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {black, grayAction} from "../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronDown} from "../utils/Icons";


const MultiWheelPicker = ({wheelData,placeholder, selectedItem, setSelectedItems, wide, hasChevron}) => {


    const handleWheelChange = (value) => {
        setSelectedItems(value);
    };

    return (
            <View style={[styles.container, ]}>
                    <RNPickerSelect
                        style={{...pickerSelectStyles,
                            inputIOS: {
                                width: wide,
                                color: grayAction,
                                fontSize: 18,
                            },
                            inputAndroid: {
                                width: wide,
                                color: grayAction,
                                fontSize: 18,
                            },

                        }}
                        placeholder={{ label: placeholder.toString(), value: placeholder }}
                        placeholderTextColor="black"
                        onValueChange={(value) => handleWheelChange(value)}
                        items={wheelData.map((item) => ({ label: item.toString(), value: item }))}
                        value={selectedItem}
                        Icon={() => {
                            if (hasChevron) {
                                return <FontAwesomeIcon icon={ChevronDown} color={black} size={27}/>;
                            }

                        }}
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

    },
    inputAndroid: {

    },
    placeholder: {
        color: grayAction,
        fontSize: 18,
    },
});
export default MultiWheelPicker;
