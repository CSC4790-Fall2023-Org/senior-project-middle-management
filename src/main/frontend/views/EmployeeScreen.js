import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";

function EmployeeScreen() {
    return (
        <View>
            <CustomHeader title={"Employee Name"} page={ScreenNames.EMPLOYEE_SETTINGS} />
        </View>
    );
}

export default EmployeeScreen;