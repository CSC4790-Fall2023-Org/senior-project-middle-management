import {
    TouchableWithoutFeedback,
    View,
    Text,
    Keyboard,
    TextInput, Modal, StatusBar, StyleSheet, TouchableOpacity, Alert,
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

const AddEmployeeBody = ({addEmployeeModal, setAddEmployeeModal, reload}) => {
    const orgID = "6500e97e491cac473a9b80c8";

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [hoursCap, setHoursCap] = useState('');
    const [wage, setWage] = useState('');
    let wageFloat;
    let hoursFloat;

    const shiftOptions = ["Guard"];

    const [employeeType, setEmployeeType] = useState(shiftOptions.length === 1 ?
        shiftOptions[0] : '');

    const [displayedShift, setDisplayedShift] = useState(shiftOptions.map(
        (shift) => ({ "label": shift, "value": shift})));
    const [shiftVal, setShiftVal] = useState(null);

    const locationOptions = [
        {locationId:"6500e97e491cac473a9b80c9", locationName: "Town Pool", maxHours: 40},
        {locationId:"6500e97e491cac473a9b80c7", locationName: "Town Park", maxHours: 40}
    ];

    const [location, setLocation] = useState(locationOptions.length === 1 ?
        locationOptions[0] : '');
    const [locationId, setLocationId] = useState(locationOptions.length === 1 ?
        [locationOptions[0].locationId] : []);
    let displayedLocations = locationOptions.map(a => a.locationName);

    const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(
        ({ locationId, locationName }) =>
            ({ "label": locationName, "value":locationId})));

    const closeModal = () => {
        clearValues();
        setAddEmployeeModal(false);
    }

    const clearValues = () => {
        setFName('');
        setLName('');
        setPhoneNumber('');
        setEmail('');
        setEmployeeType(shiftOptions.length === 1 ?
            shiftOptions[0] : '');
        setLocation(locationOptions.length === 1 ?
            locationOptions[0] : '');
        setLocationId(locationOptions.length === 1 ?
            locationOptions[0].locationId : '');
        setWage('');
        setHoursCap('');
    }

    const formatPhoneNumber = (input) => {
        const numericInput = input.replace(/\D/g, '');
        return numericInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    };

    const typeDropdownPress = (index) => {
        setEmployeeType(index);
    }

    const locationDropdownPress = (index) => {
        setLocation(index);
        for (let i = 0; i < locationOptions.length; i++) {
            if (location === locationOptions[i].locationName) {
                setLocationId([locationOptions[i].locationId]);
            }
        }
    }

    const wageToNum = (wage) => {
        // return Math.round(Number(parseFloat(wage).toFixed(2))*100)/100;
        // return (Math.round(Number(wage) * 100) / 100).toFixed(2);
        // return Number(wage).toFixed(2);
        return Number(parseFloat(wage).toFixed(2));
    }

    const hoursToNum = (hours) => {
        return parseFloat(hours);
    }

    const handleErrors = () => {
        let noErrors= true;
        wageFloat = wageToNum(wage);
        hoursFloat = hoursToNum(hoursCap);

        const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
        const phoneNoDashes = /^\d{10}$/;
        const validPhoneNoDashes = phoneNoDashes.test(phoneNumber);
        const validPhoneNumber = phoneNumberPattern.test(phoneNumber);
        const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        const validEmail = emailPattern.test(email);
        const wageString = wage.toString();
        const invalidWage = /^(\d+(\.0)?)?$/.test(wageString);

        if (!shiftVal) {
            setShiftVal(displayedShift[0].label);
        }
        if (fName.trim() === '') {
            noErrors = false;
            Alert.alert(
                'Please enter a valid first name.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (lName.trim() === '') {
            noErrors = false;
            Alert.alert(
                'Please enter a valid last name.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!validPhoneNumber) {
            noErrors = false;
            Alert.alert (
                'Please enter a valid phone number.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!validEmail) {
            noErrors = false;
            Alert.alert(
                'Please enter a valid email address.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }  else if (!shiftOptions.includes(employeeType)) {
            noErrors = false;
            Alert.alert (
                'Please select a shift type.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!locationOptions.some(loc => loc.locationName === location)) {
            noErrors = false;
            Alert.alert (
                'Please select a location.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (invalidWage) {
            noErrors = false;
            Alert.alert(
                'Please enter a valid hourly wage.',
                'Wage must end with at least one non-zero decimal place.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        else if (!hoursFloat) {
            noErrors = false;
            Alert.alert(
                'Please enter a valid weekly hours cap.',
                '',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }

        if(noErrors) {
            handleEmployeeAdd();
        }
    }

    const handleEmployeeAdd = () => {
        fetch('http://' + ipAddy + ':8080/createEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationId: orgID,
                firstName: fName,
                lastName: lName,
                employeePhoneNumber: phoneNumber,
                employeeEmail: email,
                employeeType: employeeType,
                locationIdList: locationId,
                pay: wageFloat,
                maxHours: hoursFloat,
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message);
        })
            .catch(error => {
                console.error(error);
            });
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
        reload()
        closeModal();
        reload()
    }

    return (
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
                                onChangeText={(fName) => {
                                    setFName(fName)
                                }}
                                value={fName}
                                placeholder={"First Name"}
                                placeholderTextColor={placeholderText}
                                autoCapitalize={"words"}
                            />
                            <TextInput
                                style={[styles.containerRow, {borderBottomWidth: 0}]}
                                onChangeText={(lName) => {
                                    setLName(lName)
                                }}
                                value={lName}
                                placeholder={"Last Name"}
                                placeholderTextColor={placeholderText}
                                autoCapitalize={"words"}
                            />
                        </View>
                        <Text style={styles.sectionSubtitle}>Contact Information</Text>
                        <View style={styles.sectionContainer}>
                            <TextInput
                                style={styles.containerRow}
                                onChangeText={(input) => {
                                    const formattedPhoneNumber = formatPhoneNumber(input);
                                    setPhoneNumber(formattedPhoneNumber);
                                }}
                                // onChangeText={(phoneNumber) => {
                                //     setPhoneNumber(phoneNumber);
                                // }}
                                value={phoneNumber}
                                placeholder={"Phone Number"}
                                placeholderTextColor={placeholderText}
                                keyboardType={"number-pad"}
                            />
                            <TextInput
                                style={[styles.containerRow, {borderBottomWidth: 0}]}
                                onChangeText={(email) => {
                                    setEmail(email)
                                }}
                                value={email}
                                placeholder={"Email"}
                                placeholderTextColor={placeholderText}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                            />
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
                                        setSelectedItems={typeDropdownPress}
                                        placeholder={"Select Employee Type"}
                                        wide={screenWidth/1.2}
                                        hasChevron={true}
                                    />
                                </View>
                            }
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
                        <Text style={styles.sectionSubtitle}>Hourly Wage</Text>
                        <TextInput
                            style={[styles.inputText, {borderBottomWidth: 0}]}
                            onChangeText={(wage) => {
                                setWage(wage);
                            }}
                            value={wage}
                            placeholder={"Wage"}
                            placeholderTextColor={placeholderText}
                            keyboardType={"numeric"}
                        />
                        <Text style={styles.sectionSubtitle}>Weekly Hours Cap</Text>
                        <TextInput
                            style={[styles.inputText, {borderBottomWidth: 0}]}
                            onChangeText={(hoursCap) => {
                                setHoursCap(hoursCap)
                            }}
                            value={hoursCap}
                            placeholder={"Hours Cap"}
                            placeholderTextColor={placeholderText}
                            keyboardType={"number-pad"}
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
