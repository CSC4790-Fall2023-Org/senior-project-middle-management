import React from 'react';
import {View, StyleSheet,} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {dropdownSelected, placeholderText} from "../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronDown} from "../utils/Icons";

const MultiWheelPicker = ({wheelData,placeholder, selectedItem, setSelectedItems, wide, hasChevron}) => {
    const handleWheelChange = (value) => {
        setSelectedItems(value);
    };

    return (
        <View style={[styles.container]}>
            <RNPickerSelect
                style={{...pickerSelectStyles,
                    inputIOS: {
                        width: wide,
                        color: dropdownSelected,
                        fontSize: 18,
                    },
                    inputAndroid: {
                        width: wide,
                        color: dropdownSelected,
                        fontSize: 18,
                    },
                }}
                placeholder={{ label: placeholder.toString(), value: placeholder }}
                placeholderTextColor={placeholderText}
                onValueChange={(value) => handleWheelChange(value)}
                items={wheelData.map((item) => ({ label: item.toString(), value: item }))}
                value={selectedItem}
                Icon={() => {
                    if (hasChevron) {
                        return <FontAwesomeIcon icon={ChevronDown} color={dropdownSelected} size={18}/>;
                    }

                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    },
    inputAndroid: {
    },
    placeholder: {
        color: dropdownSelected,
        fontSize: 18,
    },
});
export default MultiWheelPicker;
