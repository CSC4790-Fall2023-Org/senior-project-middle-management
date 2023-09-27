import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {useState} from "react";
import {faCaretDown, faCaretUp, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ManagerEmployeeCard = ({pressed, id, name, type, worked, available, handlePress}) =>{
    const [isModalVisible, setModalVisible] = useState(false);

    const handlePressButton1 = () => {
        // Handle press for Button 1
        handlePress(null)
    };

    const handlePressButton2 = () => {
        // Handle press for Button 2
        handlePress(id)
    };

    const handlePressButton3 = () => {
        // Handle press for Button 2
        setModalVisible(!isModalVisible);
    };
    if(pressed === id){

        return (
                <View style={styles.containerExpanded}>
                        <TouchableWithoutFeedback onPress={handlePressButton1}>
                            <View style={styles.topContainer}>
                                <Text style={styles.name}>{name}</Text>
                                <FontAwesomeIcon icon={faCaretUp} size={32} style={styles.upCaret} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handlePressButton3}>
                            <View>
                                <View style={styles.middleContainer}>
                                    <Text style={styles.worked}>{worked}</Text>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <Text style={styles.type}>{type}</Text>
                                    <Text style={styles.available}>{available}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={handlePressButton3}
                    >
                        <TouchableOpacity
                            style={styles.overlay}
                            onPress={handlePressButton3}
                        />
                        <View style={styles.modal}>
                            <View style={styles.topContainerModal}>
                                <Text style={styles.name}>Employee Info:</Text>
                                <TouchableOpacity onPress={handlePressButton3}>
                                    <FontAwesomeIcon icon={faX} size={24} style={styles.upCaret} />
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
                                <Text>Horus Worked:</Text>
                                <Text>{worked}</Text>
                            </View>
                            <View style={styles.middleContainerModal}>
                                <Text>Job Title:</Text>
                                <Text>{type}</Text>
                            </View>
                            <View style={styles.middleContainerModal}>
                                <Text>Days Available:</Text>
                                <Text>{available}</Text>
                            </View>
                        </View>
                    </Modal>
                </View>


        );
    }
    else{
        return(
            <TouchableWithoutFeedback onPress={handlePressButton2}>
                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                    <FontAwesomeIcon icon={faCaretDown} size={32} style={styles.downCaret} />
                </View>
            </TouchableWithoutFeedback>

            )

    }

}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        backgroundColor: '#FFFFFF',
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        padding: 5,
        paddingTop: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: "row",
    },
    containerExpanded: {
        flexDirection: "column",
        backgroundColor: '#FFFFFF',
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
    },
    topContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },
    middleContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },
    bottomContainer:{
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },
    name: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    type: {
        fontSize: 16,
        marginBottom: 0,
        marginTop: 10,
    },
    worked: {
        paddingTop:10,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: "500",
    },

    available: {
        fontSize: 16,
        textAlign: "right",
        marginTop: 10,
    },
    upCaret:{
        marginBottom:10,
    },
    downCaret:{
        left:5,
    },
    modal:{
        position: 'absolute',
        top: 240, // Adjust the top position to control the dropdown placement
        left:45,
        width: 300,
        height: 400,
        elevation: 5,
        zIndex: 1,
        backgroundColor:'#FFFFFF',
        borderRadius:20,
        borderStyle:"solid",
        borderColor:"#ccc",
        flexDirection: "column",
    },
    modalContent:{
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        alignItems: 'center',
        flexDirection: "row",
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
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