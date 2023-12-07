import {
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
    Modal,
    StatusBar,
} from "react-native";
import React, {useEffect, useState} from "react";
import MultiWheelPicker from "../MultiWheelPicker";
import {
    clickableText,
    placeholderText,
    primaryGreen,
    secondaryGray,
    white,
    grayBackground,
} from "../../utils/Colors";
import * as Haptics from "expo-haptics";
import {ipAddy} from "../../utils/IPAddress";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AddShiftBody = ({addShiftModal, setAddShiftModal, locationOptions, shiftOptions, loadKey, updateReloadKey}) => {
    const screenWidth = Dimensions.get('window').width;

    const [shiftName, setShiftName] = useState("");

    const [shiftType, setShiftType] = useState(shiftOptions.length === 1 ?
        shiftOptions[0] : '');

    const [location, setLocation] = useState(locationOptions.length === 1 ?
        locationOptions[0] : '');
    const [locationId, setLocationId] = useState(locationOptions.length === 1 ?
        locationOptions[0].locationId : '');
    let displayedLocations = locationOptions.map(a => a.locationName);

    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [startHour, setStartHour] = useState(null);
    const [startMinute, setStartMinute] = useState(null);
    const [isStartAM, setIsStartAM] = useState(false);
    const [twentyFourStart, setTwentyFourStart] = useState(null);

    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [endTime, setEndTime] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [endMinute, setEndMinute] = useState(null);
    const [isEndAM, setIsEndAM] = useState(false);
    const [twentyFourEnd, setTwentyFourEnd] = useState(null);

    useEffect(() => {
        if (shiftOptions.length === 1) {
            setShiftType(shiftOptions[0]);
        } else {
            setShiftType('');
        }
        if (locationOptions.length === 1) {
            setLocation(locationOptions[0].name);
        } else {
            setLocation('');
        }
        if (locationOptions.length === 1) {
            setLocationId(locationOptions[0].locationId);
        } else {
            setLocationId('');
        }
    }, [loadKey]);

    const weekdays = [
        {
            key: 1,
            text: 'Mon',
        },
        {
            key: 2,
            text: 'Tue',
        },
        {
            key: 3,
            text: 'Wed',
        },
        {
            key: 4,
            text: 'Thu',
        },
        {
            key: 5,
            text: 'Fri',
        },
        {
            key: 6,
            text: 'Sat',
        },
        {
            key: 7,
            text: 'Sun',
        },
    ];

    const [weekdaysPressed, setWeekdaysPressed] = useState([]);

    const [numShifts, setNumShifts] = useState('');

    const repeatsOptions = [
        {
            id: 0,
            text: 'Never',
        },
        {
            id: 1,
            text: 'Weekly',
        },
        {
            id: 2,
            text: 'Biweekly',
        },
        {
            id: 3,
            text: 'Monthly',
        },
    ];

    let displayedRepeats = repeatsOptions.map(a => a.text);
    const [selectedRepeats, setSelectedRepeats] = useState(null);
    const [repeatsID, setRepeatsID] = useState(null);

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [displayStartDate, setDisplayStartDate] = useState(null);

    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [displayEndDate, setDisplayEndDate] = useState(null);

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

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    }

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    }

    const handleStartTimeConfirm = (time) => {
        const formattedTime = moment(time).format('h:mma');
        const hour = moment(formattedTime, 'h:mm a').format('h');
        const min = moment(formattedTime, 'h:mm a').format('mm');
        setTwentyFourStart(moment(time).format('HH:mm'));
        setStartTime(formattedTime);
        setStartHour(hour);
        setStartMinute(min);
        setIsStartAM(moment(time).format('a') === 'am');
        hideStartTimePicker();
    }

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    }

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    }

    const handleEndTimeConfirm = (time) => {
        const formattedTime = moment(time).format('h:mma');
        const hour = moment(formattedTime, 'h:mm a').format('h');
        const min = moment(formattedTime, 'h:mm a').format('mm');
        setTwentyFourEnd(moment(time).format('HH:mm'));
        setEndTime(formattedTime);
        setEndHour(hour);
        setEndMinute(min);
        setIsEndAM(moment(time).format('a') === 'am');
        hideEndTimePicker();
    }

    const handleWeekdayPress = (index) => {
        if (weekdaysPressed.includes(index)) {
            const newData = weekdaysPressed.filter((item) => item !== index);
            setWeekdaysPressed(newData);
        } else {
            const addDay = [index];
            setWeekdaysPressed([].concat(weekdaysPressed,addDay));
        }
    }

    const repeatsDropdownPress = (text) => {
        setSelectedRepeats(text);
        for (let i = 0; i < repeatsOptions.length; i++) {
            if (selectedRepeats === repeatsOptions[i].text) {
                setRepeatsID(repeatsOptions[i].id)
            }
        }
    }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    }

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    }

    const handleStartDateConfirm = (date) => {
        setStartDate(moment(date).format('YYYY/MM/DD'));
        setDisplayStartDate(moment(date).format('MM/DD/YYYY'));
        hideStartDatePicker();
    }

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    }

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    }

    const handleEndDateConfirm = (date) => {
        setEndDate(moment(date).format('YYYY/MM/DD'));
        setDisplayEndDate(moment(date).format('MM/DD/YYYY'));
        hideEndDatePicker();
    }

    const closeModal = () => {
        setAddShiftModal(!addShiftModal);
        clearValues();
    }

    const handleErrors = () => {
        if (shiftOptions.length === 1) {
            setShiftType(shiftOptions[0]);
        }
        if (locationOptions.length === 1) {
            setLocationId(locationOptions[0].locationName);
        }
        let noErrors= true;
        if (shiftName.trim() === '') {
            noErrors = false;
            Alert.alert (
                'Shift Name',
                'Please enter a shift name.',
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
        } else if (!shiftOptions.includes(shiftType)) {
            noErrors = false;
            Alert.alert (
                'Shift Type',
                'Please select a shift type.',
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
                'Location',
                'Please select a location.',
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
        } else if (!startTime) {
            noErrors = false;
            Alert.alert (
                'Shift Time',
                'Please select a start time.',
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
        }  else if (!endTime) {
            noErrors = false;
            Alert.alert (
                'Shift Time',
                'Please select an end time.',
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
        } else if (weekdaysPressed.length === 0) {
            noErrors = false;
            Alert.alert (
                'Shift Days',
                'On which days will this shift occur?',
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
        } else if (!numShifts) {
            noErrors = false;
            Alert.alert (
                'Number of Shifts',
                'Please enter how many instances of the shift you want to create.',
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
        } else if (!selectedRepeats|| selectedRepeats === 'Select Option') {
            noErrors = false;
            Alert.alert (
                'Repeat Shift Schedule',
                'Please select how often you want to repeat this shift schedule.',
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
        } else if (!startDate) {
            noErrors = false;
            Alert.alert (
                'Repeat Window',
                'Please select a beginning date.',
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
        } else if (!endDate) {
            noErrors = false;
            Alert.alert (
                'Repeat Window',
                'Please select an ending date.',
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
        } else if (startDate > endDate) {
            noErrors = false;
            Alert.alert (
                'Repeat Window',
                'Beginning date cannot occur after ending date.',
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
        } else if (startDate === endDate && twentyFourStart >= twentyFourEnd) {
            noErrors = false;
            Alert.alert (
                'Shift Time',
                'Start time cannot occur after end time for a one day shift.',
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

        if (noErrors) {
            if (twentyFourStart >= twentyFourEnd) {
                Alert.alert (
                    'Overnight Shift',
                    'Are you sure you want to create an overnight shift?',
                    [
                        {
                            text: 'Create',
                            style: 'default',
                            onPress: handleShiftAdd,
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        }
                    ]
                );
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                );
            } else {
                handleShiftAdd();
            }
        }
    }

    const handleShiftAdd = () => {
        const weekdays = weekdaysPressed.sort();
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
        );
        fetch('http://' + ipAddy + ':8080/createShifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shiftName: shiftName,
                shiftType: shiftType,
                locationId: locationId,
                startHour: startHour,
                startMinute: startMinute,
                isStartAM: isStartAM,
                endHour: endHour,
                endMinute: endMinute,
                isEndAM: isEndAM,
                daysOfWeek: weekdays,
                numberOfShifts: numShifts,
                repeatsEvery: repeatsID,
                startDate: startDate,
                endDate: endDate,
            }),
        }).then(res => res.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
        updateReloadKey()
        setAddShiftModal(false);
        clearValues();
        updateReloadKey()
    }

    const clearValues = () => {
        setShiftName('');
        setShiftType(shiftOptions.length === 1 ?
            shiftOptions[0] : '');
        setLocation(locationOptions.length === 1 ?
            locationOptions[0] : '');
        setLocationId(locationOptions.length === 1 ?
            locationOptions[0].locationId : null);
        setStartTime(null);
        setEndTime(null);
        setWeekdaysPressed([]);
        setNumShifts('');
        setSelectedRepeats(null);
        setRepeatsID(null);
        setDisplayStartDate(null);
        setDisplayEndDate(null);
        setStartDate(null);
        setEndDate(null);
    }

    return(
        <View>
            <Modal
                animationType={"slide"}
                visible={addShiftModal}
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
                        <Text style={styles.sectionTitle}>Create Shift</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(shiftName) => {
                                setShiftName(shiftName)
                            }}
                            value={shiftName}
                            placeholder={"Shift Name"}
                            placeholderTextColor={placeholderText}
                            autoCapitalize={"words"}
                        />
                        <Text style={styles.sectionSubtitle}>Shift Type</Text>
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
                                        placeholder={"Select Shift Type"}
                                        wide={screenWidth/1.2}
                                        hasChevron={true}
                                    />
                                </View>
                            }
                        </View>
                        <Text style={styles.sectionSubtitle}>Location</Text>
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
                                    placeholder={"Select Location"}
                                    wide={screenWidth/1.2}
                                    hasChevron={true}
                                />
                            }
                        </View>
                        <Text style={styles.sectionSubtitle}>Shift Time</Text>
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity onPress={showStartTimePicker}>
                                <View style={styles.dateTimeRow}>
                                    <Text style={styles.normalText}>Start Time</Text>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {startTime !== null ? startTime : 'Not selected'}
                                    </Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isStartTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleStartTimeConfirm}
                                    onCancel={hideStartTimePicker}
                                    themeVariant={"light"}
                                    display={"spinner"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showEndTimePicker}>
                                <View style={[styles.dateTimeRow, {borderBottomWidth: 0}]}>
                                    <Text style={styles.normalText}>End Time</Text>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {endTime !== null ? endTime : 'Not selected'}
                                    </Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isEndTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleEndTimeConfirm}
                                    onCancel={hideEndTimePicker}
                                    themeVariant={"light"}
                                    display={"spinner"}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubtitle}>Shift Days</Text>
                        <View style={styles.dayContainer}>
                            {weekdays.map(day  =>
                                <TouchableWithoutFeedback onPress={() => handleWeekdayPress(day.key)} key={day.key}>
                                    <View
                                        style={[weekdaysPressed.includes(day.key) ?
                                            {backgroundColor: primaryGreen}
                                            : {backgroundColor: white},
                                            styles.dayBox,
                                        ]}
                                    >
                                        <Text style={[!weekdaysPressed.includes(day.key) ?
                                            {color: clickableText}
                                            : {color: white},
                                            {fontSize: 17}]}
                                        >
                                            {day.text}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            )}
                        </View>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(numShifts)=> {
                                setNumShifts(numShifts)
                            }}
                            value={numShifts}
                            placeholder={'Number of Shifts'}
                            placeholderTextColor={placeholderText}
                            keyboardType='numeric'
                        />
                        <Text style={styles.sectionSubtitle}>Repeat Shift Schedule</Text>
                        <View style={[AddPopupStyles.dropdownContainer]}>
                            <MultiWheelPicker
                                wheelData={displayedRepeats}
                                setSelectedItems={repeatsDropdownPress}
                                selectedItem={selectedRepeats}
                                placeholder={"Select Option"}
                                wide={screenWidth/1.2}
                                hasChevron={true}
                            />
                        </View>
                        <Text style={styles.sectionSubtitle}>Repeat Window</Text>
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity onPress={showStartDatePicker}>
                                <View style={styles.dateTimeRow}>
                                    <Text style={styles.normalText}>Beginning Date</Text>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {displayStartDate !== null ? displayStartDate : 'Not selected'}
                                    </Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isStartDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleStartDateConfirm}
                                    onCancel={hideStartDatePicker}
                                    themeVariant={"light"}
                                    display={"inline"}
                                    minimumDate={new Date(1950, 0, 1)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showEndDatePicker}>
                                <View style={[styles.dateTimeRow, {borderBottomWidth: 0}]}>
                                    <Text style={styles.normalText}>Ending Date</Text>
                                    <Text style={[styles.normalText, {color: clickableText}]}>
                                        {displayEndDate !== null ? displayEndDate : 'Not selected'}
                                    </Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isEndDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleEndDateConfirm}
                                    onCancel={hideEndDatePicker}
                                    themeVariant={"light"}
                                    display={"inline"}
                                    minimumDate={new Date(1950, 0, 1)}
                                />
                            </TouchableOpacity>
                        </View>
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
    dateTimeContainer: {
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

export default AddShiftBody;
