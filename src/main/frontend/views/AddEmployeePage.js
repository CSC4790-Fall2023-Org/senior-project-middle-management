import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity,  ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronLeft} from "../utils/Icons";
import {black, secondaryGray} from "../utils/Colors";
import AddEmployeeBody from "../components/company-dashboard-components/AddEmployeeBody";


const AddEmployeePage = ({ route }) => {
    const navigation = useNavigation();
    // const { locationOptions, shiftOptions } = route.params;

    const backPress = () =>{
        navigation.goBack()
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => backPress ()} style={styles.icon}>
                    <FontAwesomeIcon icon={ChevronLeft} size={24}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Employee</Text>
            </View>
            <ScrollView style={styles.pageScroll}>

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 100,
        backgroundColor: "white",
        alignItems: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: secondaryGray,
    },
    headerText: {
        color: black,
        fontSize: 17,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    icon: {
        color: black,
        position: 'absolute',
        left: 12,
        bottom: 12,
        width: 48,
    },
    pageScroll: {
        flex: 1,
    },
});
export default AddEmployeePage;