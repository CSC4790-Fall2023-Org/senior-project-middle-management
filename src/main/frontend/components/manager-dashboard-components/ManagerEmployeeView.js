import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";

const ManagerEmployeeView = ({ selected, handleEmpPress}) =>{


    return(
        <ScrollView style={styles.scrollView}>
            <View>
                <ManagerEmployeeCard pressed={selected} id={12345} name={"Tua Tagovailoa"} shiftsTaken={40} type={"Head Lifeguard"} worked={4} handlePress={handleEmpPress}/>
                <ManagerEmployeeCard pressed={selected} id={12346} name={"Tyreek Hill"} shiftsTaken={30} type={"Lifeguard"} worked={12} handlePress={handleEmpPress}/>
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