import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";
import EmployeeList from "../company-dashboard-components/EmployeeList";

const ManagerEmployeeView = () =>{


    return(
            <View>
                <EmployeeList />
            </View>
        )

}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});
export default ManagerEmployeeView;