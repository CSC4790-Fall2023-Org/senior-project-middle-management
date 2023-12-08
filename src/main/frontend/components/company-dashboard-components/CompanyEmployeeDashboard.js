import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {black, grayBackground, primaryGreen, white} from "../../utils/Colors";
import AddEmployeeBody from "./AddEmployeeBody";
import EmployeeList from "../manager-dashboard-components/EmployeeList";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Plus} from "../../utils/Icons";

const CompanyEmployeeDashboard = () => {
    const [addEmployeeModal, setAddEmployeeModal] = useState(false);
    const [reloadKey, setReloadKey] = useState(0)
    const reload = () => {
        setReloadKey(prevKey => prevKey + 1)
    }
    const handleAddEmployeeClick = () => {
        setAddEmployeeModal(true);
    }

    return (
        <View styles={styles.page}>
            <View style={{height: "91%"}}>
                <EmployeeList canDelete={true} reload={reload} reloadKey={reloadKey}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddEmployeeClick}>
                    <View style={styles.addButton}>
                        <FontAwesomeIcon icon={Plus} size={34} color={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <AddEmployeeBody
                addEmployeeModal={addEmployeeModal}
                setAddEmployeeModal={setAddEmployeeModal}
                reload={reload}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: grayBackground,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    addShiftButton: {
        paddingLeft: 16,
    },
    icon: {
        marginRight: 16,
        color: primaryGreen,
    },
    buttonContainer: {
        position: "relative",
    },
    addButton: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 40,
        right: 16,
        height: 64,
        width: 64,
        backgroundColor: primaryGreen,
        padding: 10,
        borderRadius: 32,
        shadowColor: black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
});

export default CompanyEmployeeDashboard;
