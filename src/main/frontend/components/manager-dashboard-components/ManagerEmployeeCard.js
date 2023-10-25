import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {useState} from "react";
import {faChevronDown, faChevronRight, faChevronUp, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {white} from "../../utils/Colors";

const ManagerEmployeeCard = ({id, name, type, worked, shiftsTaken}) =>{
    const [isModalVisible, setModalVisible] = useState(false);
    

    const handlePressButton = () => {
        setModalVisible(!isModalVisible);
    };
    return(
        <View>
            <TouchableWithoutFeedback onPress={handlePressButton}>
                <View style={styles.container}>
                    <View style={{paddingTop:5}}>
                        <Text style={styles.name}>{name}</Text>
                    </View>

                    <FontAwesomeIcon icon={faChevronRight} size={25} />
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handlePressButton}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={handlePressButton}
                />
                <View style={styles.modal}>
                    <View style={styles.topContainerModal}>
                        <Text style={styles.name}>Employee Info:</Text>
                        <TouchableOpacity onPress={handlePressButton}>
                            <FontAwesomeIcon icon={faX} size={24} />
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
                </View>
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