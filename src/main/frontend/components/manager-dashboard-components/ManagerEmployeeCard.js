import {Modal, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {useState} from "react";
import {ChevronRight, XMark} from "../../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {destructiveAction, white} from "../../utils/Colors";
import CustomButton from "../CustomButton";
import {ipAddy} from "../../utils/IPAddress";
import WarnPopup from "./WarnPopup";

const ManagerEmployeeCard = ({id, name, type, worked, shiftsTaken}) =>{
    const [isModalVisible, setModalVisible] = useState(false);

    const warnText = "Are you sure you want to delete " + name + "?"
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const handleDeleteModalVisible = () => {
        setDeleteModalVisible(!isDeleteModalVisible)
    }

    const handleModalVisible = () => {
        setModalVisible(!isModalVisible);
    }

    const handleEmployeeDelete = () =>{
        fetch('http://' + ipAddy + ':8080/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employeeId: id
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
    }

    return(
        <View>
            <TouchableWithoutFeedback onPress={handleModalVisible}>
                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                    <FontAwesomeIcon icon={ChevronRight} size={17} />
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={handleModalVisible}
                presentationStyle={"pageSheet"}
            >
                <StatusBar
                    barStyle={'light-content'}
                    animated={true}
                    showHideTransition={'fade'}
                />
                <View style={styles.modal}>
                    <View style={styles.topContainerModal}>
                        <Text style={styles.name}>Employee Info:</Text>
                        <TouchableOpacity onPress={handleModalVisible}>
                            <FontAwesomeIcon icon={XMark} size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Employee ID:</Text>
                        <Text>{id}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Name:</Text>
                        <Text>{name}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Hours Worked:</Text>
                        <Text>{worked}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Job Title:</Text>
                        <Text>{type}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Shifts Taken:</Text>
                        <Text>{shiftsTaken}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <CustomButton buttonText={"Delete Employee"} color={destructiveAction} textColor={white} handlePress={handleDeleteModalVisible}/>
                    </View>
                    </View>
                <WarnPopup titleText={warnText} isModalVisible={isDeleteModalVisible} handleModalVisible={handleDeleteModalVisible} submitForm={handleEmployeeDelete}/>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    name: {
        fontSize: 17,
        fontWeight: "600",
    },
    modal: {
        position: 'absolute',
        top: 240,
        left: 45,
        width: 300,
        height: 400,
        elevation: 5,
        zIndex: 1,
        backgroundColor: white,
        borderRadius:20,
        borderStyle:"solid",
        borderColor:"#ccc",
        flexDirection: "column",
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainerModal: {
        paddingTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: "row",
    },
    middleContainerModal: {
        paddingTop: 25,
        justifyContent: 'center',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },

});
export default ManagerEmployeeCard;