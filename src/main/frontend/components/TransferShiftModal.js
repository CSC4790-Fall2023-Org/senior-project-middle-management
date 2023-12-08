import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    View, TouchableWithoutFeedback, Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
    black,
    grayAction, grayBackground,
    primaryGreen,
    secondaryGray,
    white
} from "../utils/Colors";
import MultiWheelPicker from "./MultiWheelPicker";
import {ipAddy} from "../utils/IPAddress";
import {useAppContext} from "../AppContext";

function TransferShiftModal({transferShiftModal,
                                setTransferShiftModal,
                                shiftId,
                                shiftName,
                                shiftStartDate,
                                shiftEndDate,
                                shiftStartTime,
                                shiftEndTime,
                                shiftHours,
                                shiftLocation,
                                updateReloadKey}) {
    const [recipientSelected, setRecipientSelected] = useState(false);
    const [recipientsData, setRecipientsData] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const [displayedRecipients, setDisplayedRecipients] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [transferSubmitData, setTransferSubmitData] = useState(null);
    const { constEmployeeId } = useAppContext();

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getAllEmployeesWithNoShiftDuringShift', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                employeeId: constEmployeeId,
                shiftId: shiftId
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                if (!data || !data.employeeList) {
                    console.error('Data or employeeList is undefined');
                    return;
                }
                const simplifiedEmployees = data.employeeList.map(({ firstName, lastName, employeeId }) => ({
                    firstName,
                    lastName,
                    employeeId,
                }));

                setRecipientsData(simplifiedEmployees);
                const mappedRecipients = data.employeeList.map(a => (a.firstName + ' ' + a.lastName));
                setDisplayedRecipients(mappedRecipients);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const recipientSelection = (selectedName) => {
        if (!recipientsData) {
            console.error('Recipients data is undefined');
            setRecipientSelected(false);
            return;
        }

        if (selectedName === 'Select Recipient') {
            setRecipientSelected(false);
            setRecipient('Select Recipient');
            setSelectedEmployeeId(null);
        } else {
            const selectedEmployee = recipientsData.find(employee => {
                const fullName = `${employee.firstName} ${employee.lastName}`;
                return fullName === selectedName;
            });

            if (selectedEmployee) {
                setRecipient(selectedName);
                setRecipientSelected(true);
                setSelectedEmployeeId(selectedEmployee.employeeId);
            } else {
                console.error('Invalid selection - selectedEmployee is undefined');
                setRecipientSelected(false);
            }
        }
    };

    const handleMultipleDays = () => {
        try {
            return ((shiftStartDate === shiftEndDate) ? shiftStartDate : shiftStartDate + ' - ' + shiftEndDate);
        } catch (error) {
            return false;
        }
    }

    const handleSubmit = () => {
        if (recipientSelected) {
            fetch('http://' + ipAddy + ':8080/transferShift', {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                    shiftId: shiftId,
                    targetEmployeeId: selectedEmployeeId,
                    sourceEmployeeId: "651f3f35631f63367d896196"
                }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    setTransferSubmitData(data);
                    updateReloadKey();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            setTransferShiftModal(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    const handleSingularHours = () => {
        const hours = parseInt(shiftHours, 10);
        return (hours === 1 ? 'Hour' : 'Hours');
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={transferShiftModal}
                onRequestClose={transferShiftModal}
            >
                <TouchableWithoutFeedback onPress={() => {setTransferShiftModal(false)}}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText} numberOfLines={2} ellipsizeMode={"middle"}>Transfer '{shiftName}' Shift</Text>
                                    <View style={styles.selectorContainer}>
                                        <MultiWheelPicker
                                            wheelData={displayedRecipients || []}
                                            setSelectedItems={recipientSelection}
                                            selectedItem={recipient}
                                            placeholder={"Select Recipient"}
                                            hasChevron={false}
                                        />
                                    </View>
                                <View style={styles.shiftContainer}>
                                    <Text style={styles.shiftDate}>{handleMultipleDays()}</Text>
                                    <Text style={styles.shiftTime}>{shiftStartTime} – {shiftEndTime}</Text>
                                    <Text style={styles.shiftHours}>{shiftHours} {handleSingularHours()}</Text>
                                    <Text style={styles.shiftLocation}>{shiftLocation}</Text>
                                </View>
                                <View style={[styles.submitButton]}>
                                    <TouchableOpacity
                                        style={{width: "100%", alignItems: "center"}}
                                        onPress={handleSubmit}>
                                        <Text style={[styles.submitText, recipientSelected ? {color: primaryGreen}
                                            : {color: grayAction}]}>Transfer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 24,
        width: "75%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        paddingBottom: 0,
        alignItems: 'center',
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
    },
    modalText: {
        marginBottom: 16,
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    },
    selectorContainer: {
        flexDirection: "row",
        width: "100%",
        borderColor: primaryGreen,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    shiftContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: white,
        marginVertical: 24,
        borderRadius: 10,
        padding: 16,
        paddingTop: 12,
        borderWidth: 2,
        borderColor: secondaryGray,
    },
    shiftDate: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 12,
    },
    shiftTime: {
        fontSize: 17,
        marginBottom: 12,
    },
    shiftHours: {
        fontSize: 17,
        marginBottom: 12,
    },
    shiftLocation: {
        fontSize: 17,
    },
    submitButton: {
        width: "100%",
        borderRadius: 10,
        marginBottom: 24,
        padding: 12,
        alignItems: "center",
        backgroundColor: grayBackground,
    },
    submitText: {
        fontSize: 17,
        fontWeight: "bold",
        color: white,
    },
})

export default TransferShiftModal;