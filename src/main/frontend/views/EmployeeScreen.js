import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import EmployeeShifts from "../components/EmployeeShifts";
import SwiperComponent from "../components/SwiperComponent";

function EmployeeScreen() {
    return (
        <View>
            <View>
                <CustomHeader title={"Employee Name"} />
            </View>
            <View>
                <EmployeeShifts />
                {/*<SwiperComponent />*/}
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 200,
    },
    loginButton: {
        width: 200,
        margin: 0,

    },
});
export default EmployeeScreen;