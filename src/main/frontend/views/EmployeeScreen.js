import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from "../components/CustomHeader";

function EmployeeScreen() {
    return (
        <View>
            <CustomHeader title={"Employee Name"} page={"Employee Settings"} />
        </View>
    );
}

export default EmployeeScreen;