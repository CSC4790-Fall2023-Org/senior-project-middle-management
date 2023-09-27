import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";

const ManagerEmployeeView = ({ selected, handleEmpPress}) =>{


    return(
        <ScrollView style={styles.scrollView}>
            <View>
                <ManagerEmployeeCard pressed={selected} id={12345} name={"Tua Tagovailoa"} available={"Mon, Thu, Sun"} type={"Quarterback"} worked={4} handlePress={handleEmpPress}/>
                <ManagerEmployeeCard pressed={selected} id={12346} name={"Tyreek Hill"} available={"Mon-Fri"} type={"Wide Reciever"} worked={12} handlePress={handleEmpPress}/>
            </View>

        </ScrollView>
        )

}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});
export default ManagerEmployeeView;