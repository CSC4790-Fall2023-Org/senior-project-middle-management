import {
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    TextInput, KeyboardAvoidingViewComponent, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import React, {useState} from "react";
import CalendarPopup from "../CalendarPopup";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Calendar} from '../../utils/Icons';
import MultiWheelPicker from "../MultiWheelPicker";
import CustomButton from "../CustomButton";
import {
    destructiveAction, dropdownSelected,
    placeholderText,
    primaryGreen,
    secondaryGray,
    white
} from "../../utils/Colors";
import * as Haptics from "expo-haptics";
import WarnPopup from "./WarnPopup";
import {ipAddy} from "../../utils/IPAddress";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddShiftBody = ({backPress, locationOptions, shiftOptions}) => {
    const warnText=" ou are making a shift that goes overnight are you sure you want to submit it?"
    const screenWidth = Dimensions.get('window').width;
    //shift type info
    const [shiftType, setShiftType] = useState(null);
    const shiftDropdownPress = (index) => {
        setShiftType(index);
    }
    //location info
    const [location, setLocation] = useState(null);
    const [locationId, setLocationId] = useState(null);
    const [isLocationError, setLocationError] = useState(false)
    let displayedLocations = locationOptions.map(a => a.locationName);

    const locationDropdownPress = (index) => {
        setLocationError(false)
        setLocation(index);
        for(let i = 0; i < locationOptions.length; i++){
            if(location === locationOptions[i].locationName){
                setLocationId(locationOptions[i].locationId)
            }
        }
    }
    //start & end hour info
    const hourOptions = [2, 3, 4, 5 ,6 ,7 ,8, 9, 10, 11, 12]
    const [startHour, setStartHour] = useState(1);
    const [endHour, setEndHour] = useState(1);

    //start & end minute info
    const minOptions = ["05", "10", "15", "20", "25" ,"30" ,"35", "40", "45", "50", "55"]
    const [startMinute, setStartMinute] = useState("00");
    const [endMinute, setEndMinute] = useState("00");

    //start & end Am Pm
    const timePeriods = ["PM"]
    const [startPeriod, setStartPeriod] = useState("AM");
    const [endPeriod, setEndPeriod] = useState("AM");

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    //calendar info
    const [isCalendarVisible, setCalendarVisible] = useState(null);
    const handleCalendar = () =>{
        setCalendarVisible(!isCalendarVisible)
    }
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const startDate = selectedStartDate ? selectedStartDate.format('MM/DD/YYYY').toString() : '';
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const endDate = selectedEndDate ? selectedEndDate.format('MM/DD/YYYY').toString() : '';
    const [dateWrong, setDateWrong] = useState(false)
    //shift name info
    const [shiftName, setShiftName] = useState("");
    const [isShiftNameEmpty, setShiftNameEmpty] = useState(false);

    //repeats info
    const repeatsOptions = [{
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
    ]
    let displayedRepeats = repeatsOptions.map(a => a.text);
    const [selectedRepeats, setSelectedRepeats] = useState(null);
    const [repeatsID, setRepeatsID] = useState(null);
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
        },]

    const [weekdaysPressed, setWeekdaysPressed] = useState([]);
    const [noWeekdaysPressed, setNoWeekdaysPressed] = useState(false)

    const handleWeekdayPress = (index) => {
        setNoWeekdaysPressed(false)
        if (weekdaysPressed.includes(index)) {
            const newData = weekdaysPressed.filter((item) => item !== index);
            setWeekdaysPressed(newData);
        }
        else{
            const addDay = [index]
            setWeekdaysPressed([].concat(weekdaysPressed,addDay))
        }
    };

    const repeatsDropdownPress = (text) => {
        setSelectedRepeats(text);
        for (let i = 0; i < repeatsOptions.length; i++) {
            if (selectedRepeats === repeatsOptions[i].text) {
                setRepeatsID(repeatsOptions[i].id)
            }
        }
    }

    //number of shifts
    const [numShifts, setNumShifts] = useState("");
    const [numShiftsError, setNumShiftsError] = useState(false)

    //check all fields are filled
    const [warnModal, setWarnModal] = useState(false)
    const handleWarnVisible = () =>{
        setWarnModal(!warnModal)
    }
    const handleErrors = () =>{
        let timeStart = startHour+(startMinute/100)
        let timeEnd = endHour+(endMinute/100)
        let noErrors= true
        if(endPeriod === "PM"){
            timeEnd += 12
        }
        if(startPeriod === "PM"){
            timeStart += 12
        }
        if(locationOptions.length === 1){
            setLocationId(locationOptions[0].locationId)
        }
        if(shiftOptions.length === 1){
            setShiftType(shiftOptions[0])
        }
        if(shiftName.trim() === ''){
            setShiftNameEmpty(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(!endDate || !startDate){
            setDateWrong(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(!locationId){
            setLocationError(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(weekdaysPressed.length === 0){
            setNoWeekdaysPressed(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(!numShifts){
            setNumShiftsError(true);
            noErrors=false;
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if(noErrors) {
                if (timeEnd < timeStart) {
                    setWarnModal(true)
                } else {
                    handleShiftAdd()
                }
        }

    }
    //post to Mongo
    const handleShiftAdd = () => {
        setWarnModal(false)
        const weekdays = weekdaysPressed.sort()
        const isEndPeriod = (endPeriod === "AM")
        const isStartPeriod = (startPeriod === "AM")
        //update fetch url according to IPv4 of Wi-Fi
        fetch('http://' + ipAddy + ':8080/createShifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shiftType: shiftType,
                endDate: endDate,
                daysOfWeek: weekdays,
                endHour: endHour,
                shiftName: shiftName,
                startHour: startHour,
                isEndAM: isEndPeriod ,
                locationId: locationId,
                isStartAM: isStartPeriod,
                startMinute: startMinute,
                startDate: startDate,
                endMinute: endMinute,
                repeatsEvery: repeatsID,
                numberOfShifts: numShifts,
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
        backPress()
    }

    return(
        <KeyboardAwareScrollView
            keyboardDismissMode={"interactive"}
            contentContainerStyle={[AddPopupStyles.modal, {flex: 1}]}
            // resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
        >
            <Text style={styles.sectionTitle}>Add Shift</Text>
            <TextInput
                style={[styles.inputText, isShiftNameEmpty ? styles.errorBorder : null]}
                onChangeText={(shiftName) =>{
                    setShiftName(shiftName)
                    setShiftNameEmpty(false)
                }}
                value={shiftName}
                placeholder={"Shift Name"}
                placeholderTextColor={placeholderText}
            />
            <Text style={styles.sectionSubtitle}>Shift Type</Text>
            <View style={[AddPopupStyles.dropdownContainer]}>
                {shiftOptions.length === 1 &&
                    <Text style={[styles.normalText, {color: dropdownSelected}]}>{shiftOptions[0]}</Text>
                }
                {shiftOptions.length !== 1 &&
                    <View style={[styles.doubleContainer]}>
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
            <View style={[AddPopupStyles.dropdownContainer]}>
                {displayedLocations.length === 1 &&
                    <View style={[AddPopupStyles.longContainer]}>
                        <Text style={{fontSize:18}}>{locationOptions[0].locationName}</Text>
                    </View>
                }
                {displayedLocations.length !== 1 &&
                    <View style={[styles.doubleContainer, isLocationError ? AddPopupStyles.destructiveAction:{}]}>
                        <MultiWheelPicker
                            wheelData={displayedLocations}
                            setSelectedItems={locationDropdownPress}
                            selectedItem={location}
                            placeholder={"Select A Location"}
                            wide={screenWidth/1.2}
                            hasChevron={true}
                        />
                    </View>
                }
            </View>
            <Text style={styles.sectionSubtitle}>Date and Time</Text>
            {(!startDate || !endDate) &&
            <TouchableOpacity onPress={() => {
                handleCalendar()
                setDateWrong(false)
            }}>
                <View style={[styles.doubleContainer,
                    {borderRadius: 10, backgroundColor: white},
                    dateWrong ? AddPopupStyles.destructiveAction : {borderColor: secondaryGray}]}>
                        <View style={[styles.doubleContainer, {width:'100%'}]}>
                            <View style={styles.shortContainer}>
                                <Text style={[styles.normalText, {color: dropdownSelected}]}>Select Dates</Text>
                            </View>
                            <View style={styles.shortContainer}>
                                <FontAwesomeIcon icon={Calendar} color={primaryGreen} size={18}/>
                            </View>
                        </View>

                </View>
            </TouchableOpacity>}
            {(startDate && endDate) &&
                <TouchableOpacity onPress={() => {
                handleCalendar()
                setDateWrong(false)
                }}>
                    <View style={[styles.doubleContainer, {
                        borderRadius: 10,
                        backgroundColor: white,
                        marginBottom: 18,
                    }]}>
                        <View style={[styles.shortContainer, {width: '45%'}]}>
                            <Text style={[styles.normalText, {color: dropdownSelected}]}>From</Text>
                            <Text style={[styles.normalText, {color: dropdownSelected}]}>{startDate}</Text>
                        </View>
                        <FontAwesomeIcon icon={Calendar} color={primaryGreen} size={40}/>
                        <View style={[styles.shortContainer, {width:'42.5%'}]}>
                            <Text style={[styles.normalText, {color: dropdownSelected}]}>To</Text>
                            <Text style={[styles.normalText, {color: dropdownSelected}]}>{endDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }
            <View style={[styles.doubleContainer]}>
                <View style={[styles.shortContainer, {width:"50%"}]}>
                    <Text style={styles.sectionSubtitle}>Start Time</Text>
                    <View style={[styles.doubleContainer, {width: "55%"}]}>
                        <MultiWheelPicker
                            wheelData={hourOptions}
                            placeholder={1}
                            selectedItem={startHour}
                            setSelectedItems={setStartHour}
                        />
                        <Text style={styles.normalText}>:</Text>
                        <MultiWheelPicker
                            wheelData={minOptions}
                            placeholder={"00"}
                            selectedItem={startMinute}
                            setSelectedItems={setStartMinute}
                        />
                        <Text> </Text>
                        <MultiWheelPicker
                            wheelData={timePeriods}
                            placeholder={"AM"}
                            selectedItem={startPeriod}
                            setSelectedItems={setStartPeriod}
                        />
                    </View>
                </View>
                <View style={[styles.shortContainer, {width:'55%'}]}>
                    <Text style={styles.sectionSubtitle}>End Time</Text>
                    <View style={[styles.doubleContainer, {width: "50%"}]}>
                        <MultiWheelPicker
                            wheelData={hourOptions}
                            placeholder={1}
                            selectedItem={endHour}
                            setSelectedItems={setEndHour}
                        />
                        <Text style={styles.normalText}>:</Text>
                        <MultiWheelPicker
                            wheelData={minOptions}
                            placeholder={"00"}
                            selectedItem={endMinute}
                            setSelectedItems={setEndMinute}
                        />
                        <Text> </Text>
                        <MultiWheelPicker
                            wheelData={timePeriods}
                            placeholder={"AM"}
                            selectedItem={endPeriod}
                            setSelectedItems={setEndPeriod}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.sectionSubtitle}>Repeats</Text>
            <View style={[AddPopupStyles.dropdownContainer]}>
                <View style={[styles.doubleContainer]}>
                    <MultiWheelPicker
                        wheelData={displayedRepeats}
                        setSelectedItems={repeatsDropdownPress}
                        selectedItem={selectedRepeats}
                        placeholder={"Select Option"}
                        wide={screenWidth/1.2}
                        hasChevron={true}
                    />
                </View>
            </View>
            <View style={[styles.dayContainer, noWeekdaysPressed ? AddPopupStyles.destructiveAction:{}]}>
                {weekdays.map(day  =>
                    <TouchableOpacity onPress={() => handleWeekdayPress(day.key)} key={day.key}>
                        <View
                            style={[weekdaysPressed.includes(day.key) ?
                                {backgroundColor: primaryGreen}
                                : {backgroundColor: white},
                                styles.dayBox,
                            ]}
                        >
                            <Text style={[!weekdaysPressed.includes(day.key) ?
                                {color: dropdownSelected}
                                : {color: white},
                                {fontSize: 18}]}
                            >
                                {day.text}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )}
            </View>
            <TextInput
                style={[styles.inputText, isShiftNameEmpty ? styles.errorBorder : null]}
                onChangeText={(numShifts)=>{
                    setNumShifts(numShifts)
                    setNumShiftsError(false)
                }}
                value={numShifts}
                placeholder={'Number of Shifts'}
                placeholderTextColor={placeholderText}
                keyboardType = 'numeric'
            />
            <View style={styles.addShiftButton}>
                <CustomButton
                    buttonText={"Add Shift"}
                    handlePress={handleErrors}
                    color={primaryGreen}
                    textColor={white}
                />
            </View>
            <WarnPopup
                handleModalVisible={handleWarnVisible}
                isModalVisible={warnModal}
                submitForm={handleShiftAdd}
                titleText={warnText}/>
            <CalendarPopup
                setSelectedEndDate={setSelectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                isCalendarVisible={isCalendarVisible}
                handleExitCalendar={handleCalendar}
            />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
    },
    inputTest: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 36,
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
        fontSize: 18,
        //fontFamily: 'HelveticaNeue-Medium',
        padding: 8,
        marginBottom: 18,
        backgroundColor: white,
        borderRadius: 10,
    },
    normalText: {
        fontSize: 18,
    },
    errorBorder: {
        borderWidth: 1,
        borderColor: destructiveAction,
    },
    doubleContainer: {
        //backgroundColor: 'blue',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    shortContainer: {
        //backgroundColor: 'green',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
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
        paddingHorizontal: 1,
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
})

export default AddShiftBody