import {
    TouchableWithoutFeedback,
    View,
    Text,
    Keyboard,
    TextInput, Modal, StatusBar, StyleSheet, TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../CustomButton";
import {ipAddy} from "../../utils/IPAddress";
import * as Haptics from "expo-haptics";
import {clickableText, grayBackground, placeholderText, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import MultiWheelPicker from "../MultiWheelPicker";
import {screenWidth} from "../../utils/Constants";

const AddEmployeeBody = ({backPress, addEmployeeModal, setAddEmployeeModal}) => {
    //location info
    const locationOptions = [
        {locationId:"6500e97e491cac473a9b80c9", locationName: "Town Pool", maxHours: 40}
    ];

    const shiftOptions = ["Guard"];

    const [shiftType, setShiftType] = useState(shiftOptions.length === 1 ?
        shiftOptions[0] : '');

    const [location, setLocation] = useState(locationOptions.length === 1 ?
        locationOptions[0] : '');
    const [locationId, setLocationId] = useState(locationOptions.length === 1 ?
        locationOptions[0].locationId : null);
    let displayedLocations = locationOptions.map(a => a.locationName);

    const [openLocDD,setOpenLocDD] = useState(false);
    const [locVal, setLocVal] = useState([locationOptions[0].locationId]);
    const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(
        ({ locationId, locationName }) =>
            ({ "label": locationName, "value":locationId})));

    //org info
    const orgID = "6500cf35491cac473a9b80c8";

    //employee info
    const [employeeFName, setEmployeeFName] = useState('');
    const [fNameEmpty, setFNameEmpty] = useState(false);
    const [employeeLName, setEmployeeLName] = useState('');
    const [lNameEmpty, setLNameEmpty] = useState(false);
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState('');
    const [phoneEmpty, setPhoneEmpty] = useState(false);
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [hoursPerWeek, setHoursPerWeek] = useState("");
    const [hoursEmpty, setHoursEmpty] = useState(false);
    const [wage, setWage] = useState("");
    const [wageEmpty, setWageEmpty] = useState(false);

    //shift type info
    const [openShiftDD,setOpenShiftDD] = useState(false);
    const [displayedShift, setDisplayedShift] = useState(shiftOptions.map(
        (shift) => ({ "label":shift, "value":shift})));
    const [shiftVal, setShiftVal] = useState(null);

    const closeModal = () => {
        setAddEmployeeModal(false);
    }

    const shiftDropdownPress = (index) => {
        setShiftType(index);
    }

    const locationDropdownPress = (index) => {
        setLocation(index);
        for (let i = 0; i < locationOptions.length; i++) {
            if (location === locationOptions[i].locationName) {
                setLocationId(locationOptions[i].locationId);
            }
        }
    }

    const handleEmployeeAdd = () => {
        let payFloat;
        let hoursFloat;
        if (typeof wage === "string") {
            payFloat = parseFloat(wage);
        } else {
            payFloat = wage;
        }
        if (typeof hoursPerWeek === "string") {
            hoursFloat = parseFloat(hoursPerWeek);
        } else {
            hoursFloat = hoursPerWeek;
        }
        // //update fetch url according to IPv4 of Wi-Fi
        fetch('http://' + ipAddy + ':8080/createEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationId: orgID,
                firstName: empFName,
                lastName: empLName,
                locationIdList: locVal,
                maxHours: hoursFloat,
                employeeType: shiftVal,
                employeePhoneNumber: empPhone,
                employeeEmail: empEmail,
                pay: payFloat,
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message);
        })
            .catch(error => {
                console.error(error);
            });
        backPress();
    }
    const handleErrors = () =>{
        let noErrors= true;

        if (!shiftVal) {
            setShiftVal(displayedShift[0].label);
        }
        if(empFName.trim() === ''){
            setFNameEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(empLName.trim() === ''){
            setLNameEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(empPhone.trim() === ''){
            setPhoneEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(empEmail.trim() === ''){
            setEmailEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(wage.trim() === ''){
            setWageEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(hoursPerWeek.trim() === ''){
            setHoursEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(noErrors) {
            handleEmployeeAdd();
        }
    }

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    }

    return(
        <View>
            <Modal
                animationType={"slide"}
                visible={addEmployeeModal}
                presentationStyle={"pageSheet"}
            >
                <StatusBar
                    barStyle={'light-content'}
                    animated={true}
                    showHideTransition={'fade'}
                />
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text
                                style={[styles.normalText, {color: white}]}
                                allowFontScaling={false}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleErrors}>
                            <Text
                                style={[styles.normalText, {color: white, fontWeight: 'bold'}]}
                                allowFontScaling={false}
                            >
                                Create
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAwareScrollView
                        keyboardDismissMode={"interactive"}
                        contentContainerStyle={styles.scrollView}
                        scrollEnabled={true}
                    >
                        <Text style={styles.sectionTitle}>Create Employee</Text>
                        <View style={styles.sectionContainer}>
                            <TextInput
                                style={styles.containerRow}
                                onChangeText={(shiftName) => {
                                    setEmployeeFName(employeeFName)
                                }}
                                value={employeeFName}
                                placeholder={"Employee's First Name"}
                                placeholderTextColor={placeholderText}
                                autoCapitalize={"words"}
                            />
                            <TextInput
                                style={styles.containerRow}
                                onChangeText={(shiftName) => {
                                    setEmployeeLName(employeeLName)
                                }}
                                value={employeeLName}
                                placeholder={"Employee's Last Name"}
                                placeholderTextColor={placeholderText}
                                autoCapitalize={"words"}
                            />
                            <TextInput
                                style={styles.containerRow}
                                onChangeText={(shiftName) => {
                                    setEmployeePhoneNumber(employeePhoneNumber)
                                }}
                                value={employeePhoneNumber}
                                placeholder={"Employee's Phone Number"}
                                placeholderTextColor={placeholderText}
                                keyboardType={"number-pad"}
                            />
                            <TextInput
                                style={[styles.containerRow, {borderBottomWidth: 0}]}
                                onChangeText={(shiftName) => {
                                    setEmployeeEmail(employeeEmail)
                                }}
                                value={employeeEmail}
                                placeholder={"Employee's Email"}
                                placeholderTextColor={placeholderText}
                                keyboardType={"email-address"}
                            />
                        </View>
                        <Text style={styles.sectionSubtitle}>Employee Location</Text>
                        <View style={AddPopupStyles.dropdownContainer}>
                            {displayedLocations.length === 1 &&
                                <View>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {locationOptions[0].locationName}
                                    </Text>
                                </View>
                            }
                            {displayedLocations.length !== 1 &&
                                <MultiWheelPicker
                                    wheelData={displayedLocations}
                                    setSelectedItems={locationDropdownPress}
                                    selectedItem={location}
                                    placeholder={"Select Employee Location"}
                                    wide={screenWidth/1.2}
                                    hasChevron={true}
                                />
                            }
                        </View>
                        <Text style={styles.sectionSubtitle}>Employee Type</Text>
                        <View style={[AddPopupStyles.dropdownContainer]}>
                            {shiftOptions.length === 1 &&
                                <View>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {shiftOptions[0]}
                                    </Text>
                                </View>
                            }
                            {shiftOptions.length !== 1 &&
                                <View style={styles.doubleContainer}>
                                    <MultiWheelPicker
                                        wheelData={shiftOptions}
                                        selectedItem={shiftType}
                                        setSelectedItems={shiftDropdownPress}
                                        placeholder={"Select Employee Type"}
                                        wide={screenWidth/1.2}
                                        hasChevron={true}
                                    />
                                </View>
                            }
                        </View>
                        <Text style={styles.sectionSubtitle}>Hourly Wage</Text>
                        <TextInput
                            style={[styles.inputText, {borderBottomWidth: 0}]}
                            onChangeText={(shiftName) => {
                                setEmployeeEmail(employeeEmail)
                            }}
                            value={employeeEmail}
                            placeholder={"Employee's Wage"}
                            placeholderTextColor={placeholderText}
                            keyboardType={"numeric"}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalHeader: {
        height: 55,
        backgroundColor: primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: grayBackground,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    scrollView: {
        position: "relative",
        backgroundColor: grayBackground,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 34,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 21,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    containerRow: {
        width: "100%",
        fontSize: 17,
        padding: 12,
        paddingLeft: 0,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
    inputText: {
        width: "100%",
        fontSize: 17,
        padding: 12,
        marginBottom: 18,
        backgroundColor: white,
        borderRadius: 10,
    },
    normalText: {
        fontSize: 17,
    },
    doubleContainer: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    shortContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
    },
    dayContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 18,
        width: "100%",
        backgroundColor: secondaryGray,
        borderRadius: 7,
        paddingVertical: 4,
        paddingHorizontal: 4,
        overflow: 'hidden',
    },
    dayBox: {
        borderRadius: 7,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginHorizontal: 2,
    },
    input: {
        width: "100%",
        height: 30,
        fontSize: 24,
        margin: 5,
    },
    sectionContainer: {
        backgroundColor: white,
        width: "100%",
        borderRadius: 10,
        flexDirection: "column",
        paddingLeft: 12,
        marginBottom: 18,
    },
    dateTimeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        paddingLeft: 0,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
});

export default AddEmployeeBody;
