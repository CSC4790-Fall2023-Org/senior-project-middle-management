import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {useState} from "react";
import {ChevronRight, XMark} from "../../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {destructiveAction, white} from "../../utils/Colors";
import CustomButton from "../CustomButton";
import {ipAddy} from "../../utils/IPAddress";
import WarnPopup from "./WarnPopup";


const ManagerEmployeeCard = ({id, name, type, worked, shiftsTaken, pNum, email}) =>{
    const [isModalVisible, setModalVisible] = useState(false);

    const warnText = "You are about to delete employee " + name + " are you sure you want to?"
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(true);
    const handleDeleteModalVisible = () => {
        setDeleteModalVisible(!isDeleteModalVisible)
    }


    const handleModalVisible = () => {
        setModalVisible(!isModalVisible);
    };

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
                    <View style={{paddingTop:5}}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <FontAwesomeIcon icon={ChevronRight} size={25} />
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalVisible}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={handleModalVisible}
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
                        <Text>Phone Number:</Text>
                        <Text>{pNum}</Text>
                    </View>
                    <View style={styles.middleContainerModal}>
                        <Text>Email Address:</Text>
                        <Text>{email}</Text>
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
        backgroundColor: white,
        margin: 10,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: "row",
    },

    name: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    modal:{
        position: 'absolute',
        top: 240,
        left:45,
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
        paddingTop:10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: "row",
    },
    middleContainerModal: {
        paddingTop:25,
        justifyContent: 'center',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },

});
export default ManagerEmployeeCard;