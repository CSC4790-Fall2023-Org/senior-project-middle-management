import React from 'react';
import {View} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import EmployeeShiftHeader from "../components/EmployeeShiftHeader";

function EmployeeScreen() {
    return (
        <View>
            <View>
                <CustomHeader title={"Employee Name"} />
            </View>
            <View>
                <EmployeeShiftHeader />
            </View>
        </View>
    );
}

export default EmployeeScreen;