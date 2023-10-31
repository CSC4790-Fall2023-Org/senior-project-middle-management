import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    TextInput
} from "react-native";
import React, {useState} from "react";
import CalendarPopup from "../CalendarPopup";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {XMark, Calendar} from '../../utils/Icons';
import MultiWheelPicker from "../MultiWheelPicker";
import CustomButton from "../CustomButton";
import {black, destructiveAction, grayBackground, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import * as Haptics from "expo-haptics";
import TimeWarnPopup from "./TimeWarnPopup";


const AddShiftPopup = ({isModalVisible, handlePressButton, locationOptions, shiftOptions}) => {

    const screenWidth = Dimensions.get('window').width;
    //shift type info
    const [shiftType, setShiftType] = useState(shiftOptions[0]);
    const shiftDropdownPress = (index) => {
        setShiftType(index);
    }
    //location info
    const [location, setLocation] = useState(locationOptions[0].locationName);
    const [locationId, setLocationId] = useState(locationOptions[0].locationId);
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
    const startDate = selectedStartDate ? selectedStartDate.format('YYYY/MM/DD').toString() : '';
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const endDate = selectedEndDate ? selectedEndDate.format('YYYY/MM/DD').toString() : '';
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
    const [selectedRepeats, setSelectedRepeats] = useState(repeatsOptions[0].text);
    const [repeatsID, setRepeatsID] = useState(repeatsOptions[0].id);
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
        console.log(timeStart)
        let timeEnd = endHour+(endMinute/100)
        if(endPeriod === "PM"){
            timeEnd += 12
        }
        if(startPeriod === "PM"){
            timeStart += 12
        }
        console.log(timeStart)

        if(locationOptions.length === 1){
            setLocationId(locationOptions[0].locationId)
        }
        if(shiftOptions.length === 1){
            setShiftType(shiftOptions[0])
        }
        if(shiftName.trim() === ''){
            setShiftNameEmpty(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }else if(!endDate || !startDate){
            setDateWrong(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }else if(!locationId){
            setLocationError(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }else if(weekdaysPressed.length === 0){
            setNoWeekdaysPressed(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }else if(!numShifts){
            setNumShiftsError(true);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        else if(timeEnd<timeStart){
            setWarnModal(true)
        }else{
            handleShiftAdd()
        }

    }
    //post to Mongo
    const handleShiftAdd = () => {
        setWarnModal(false)
        const weekdays = weekdaysPressed.sort()
        const isEndPeriod = (endPeriod === "AM")
        const isStartPeriod = (startPeriod === "AM")
        
        //update fetch url according to IPv4 of Wi-Fi
        fetch('http://10.138.27.56:8080/createShifts', {
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
            console.log(json)
        })
            .catch(error => {
                console.error(error);
            });
        handlePressButton(false)
    }

    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handlePressButton}
        >
            <TouchableWithoutFeedback onPress={handlePressButton}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                        <View style={styles.modal}>
                            <View style={[styles.titleContainer, {width: screenWidth/1.15}]}>
                                <Text style={styles.titleText}>Add Shift</Text>
                                <TouchableOpacity onPress={handlePressButton}>
                                    <FontAwesomeIcon icon={XMark} size={24} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.longContainer,{width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Shift Name:</Text>
                            </View>
                            <View style={[styles.inputContainer,{width:screenWidth/1.30},isShiftNameEmpty ? styles.destructiveAction:{borderColor:secondaryGray}]}>
                                <TextInput
                                    style={[styles.input, {width:screenWidth/1.30}]}
                                    onChangeText={(shiftName) =>{
                                        setShiftName(shiftName)
                                        setShiftNameEmpty(false)
                                    }}
                                    value={shiftName}
                                    placeholder={"Type Here"}
                                    placeholderTextColor={"#D0D0D0"}
                                />
                            </View>
                            <View style={[styles.longContainer,{width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Shift Type:</Text>
                            </View>
                            <View style={[styles.dropdownContainer,{width:screenWidth/1.30}]}>
                                {shiftOptions.length === 1 && <View style={[styles.longContainer]}><Text style={{fontSize:20}}>{shiftOptions[0]}</Text></View>}
                                {shiftOptions.length !== 1 &&
                                    <View style={[styles.doubleContainer,{width:screenWidth/1.35}]}>
                                        <MultiWheelPicker wheelData={shiftOptions} selectedItem={shiftType} setSelectedItems={shiftDropdownPress} placeholder={"Select Shift Type"} wide={screenWidth/1.40} hasChevron={true}/>
                                    </View>}

                            </View>
                            <View style={[styles.longContainer,{width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Location:</Text>
                            </View>
                            <View style={[styles.dropdownContainer,{width:screenWidth/1.30}]}>
                                {displayedLocations.length === 1 && <View style={[styles.longContainer]}><Text style={{fontSize:20}}>{locationOptions[0].locationName}</Text></View>}
                                {displayedLocations.length !== 1 &&
                                <View style={[styles.doubleContainer,{width:screenWidth/1.35}, isLocationError ? styles.destructiveAction:{}]}>
                                    <MultiWheelPicker wheelData={displayedLocations} setSelectedItems={locationDropdownPress} selectedItem={location} placeholder={"Select A Location"} wide={screenWidth/1.40} hasChevron={true}/>
                                </View>}

                            </View>
                            <View style={[styles.doubleContainer, {width: screenWidth/1.30}]}>
                                <View style={styles.shortContainer}>
                                    <TouchableOpacity onPress={() =>{
                                        handleCalendar()
                                        setDateWrong(false)}}>
                                        <FontAwesomeIcon icon={Calendar} size={35} style={dateWrong ? {color:destructiveAction}:{color:black}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.shortContainer]}>
                                    <Text style={styles.inputText}>From:</Text>
                                    {startDate && <Text>{startDate}</Text>}
                                    {!startDate && <Text>Press Calendar</Text>}
                                </View>
                                <View style={styles.shortContainer}>
                                    <Text style={styles.inputText}>To:</Text>
                                    {endDate && <Text>{endDate}</Text>}
                                    {!endDate && <Text>Press Calendar</Text>}
                                </View>
                            </View>
                            <View style={[styles.doubleContainer,{width: screenWidth/1.30}]}>
                                <View style={styles.shortContainer}>
                                    <Text style={styles.inputText}>Start Hour:</Text>
                                    <View style={styles.doubleContainer}>
                                        <MultiWheelPicker wheelData={hourOptions} placeholder={1} selectedItem={startHour} setSelectedItems={setStartHour}/>
                                        <Text style={styles.inputText}>:</Text>
                                        <MultiWheelPicker wheelData={minOptions} placeholder={"00"} selectedItem={startMinute} setSelectedItems={setStartMinute}/>
                                        <Text> </Text>
                                        <MultiWheelPicker wheelData={timePeriods} placeholder={"AM"} selectedItem={startPeriod} setSelectedItems={setStartPeriod}/>
                                    </View>

                                </View>
                                <View style={styles.shortContainer}>
                                    <Text style={styles.inputText}>End Hour:</Text>
                                    <View style={styles.doubleContainer}>
                                        <MultiWheelPicker wheelData={hourOptions} placeholder={1} selectedItem={endHour} setSelectedItems={setEndHour}/>
                                        <Text style={styles.inputText}>:</Text>
                                        <MultiWheelPicker wheelData={minOptions} placeholder={"00"} selectedItem={endMinute} setSelectedItems={setEndMinute}/>
                                        <Text> </Text>
                                        <MultiWheelPicker wheelData={timePeriods} placeholder={"AM"} selectedItem={endPeriod} setSelectedItems={setEndPeriod}/>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.longContainer, {width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Repeats:</Text>
                            </View>
                            <View style={[styles.dropdownContainer,{width:screenWidth/1.30}]}>
                                <View style={[styles.doubleContainer, {width: screenWidth/1.35}]}>
                                    <MultiWheelPicker wheelData={displayedRepeats} setSelectedItems={repeatsDropdownPress} selectedItem={selectedRepeats} placeholder={"Select Option"} wide={screenWidth/1.40} hasChevron={true}/>
                                </View>
                            </View>
                            <View style={[styles.dayContainer, {width: screenWidth/1.30}, noWeekdaysPressed ? styles.destructiveAction:{}]}>
                                {weekdays.map(day  =>
                                    <TouchableOpacity onPress={() => handleWeekdayPress(day.key)} key={day.key}>
                                        <View style={[weekdaysPressed.includes(day.key) ? {backgroundColor:primaryGreen}:{backgroundColor:white}, styles.dayBox, day.key === 1 ? {borderTopLeftRadius:15,borderBottomLeftRadius:15,}:{}, day.key === 7 ? {borderTopRightRadius:15,borderBottomRightRadius:15,}:{}]}>
                                            <Text style={[!weekdaysPressed.includes(day.key) ? {color:black}:{color:white}]} >{day.text}</Text>
                                        </View>
                                    </TouchableOpacity>

                                )}
                            </View>
                            <View style={[styles.longContainer, {width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Number of Shifts:</Text>
                            </View>
                            <View style={[styles.inputContainer,{width:screenWidth/1.30}, numShiftsError? styles.destructiveAction:{}]}>
                                <TextInput
                                    style={[styles.input, {width:screenWidth/1.30}]}
                                    onChangeText={(numShifts)=>{
                                        setNumShifts(numShifts)
                                        setNumShiftsError(false)
                                    }}
                                    value={numShifts}
                                    placeholder={'Type Here'}
                                    placeholderTextColor={"#D0D0D0"}
                                    keyboardType = 'numeric'
                                />
                            </View>

                            <View style={styles.addShiftButton}>
                                <CustomButton buttonText={"Add Shift"} handlePress={handleErrors} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TimeWarnPopup handlePressButton={handleWarnVisible} isModalVisible={warnModal} submitForm={handleShiftAdd}/>
                    <CalendarPopup setSelectedEndDate={setSelectedEndDate} setSelectedStartDate={setSelectedStartDate} isCalendarVisible={isCalendarVisible} handleExitCalendar={handleCalendar}/>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: secondaryGray,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,

    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    longContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:5,
    },
    inputContainer:{
        backgroundColor: white,
        padding:5,
        paddingHorizontal:10,
        margin:5,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:.5,
        borderRadius:20,
    },
    inputText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdownContainer:{
        backgroundColor:white,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:.5,
        borderRadius:10
    },
    doubleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        margin:5,
    },
    shortContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
    },
    dayContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },
    dayBox:{
        borderColor: secondaryGray,
        borderWidth:".5",
        marginTop:0,
        padding:5,
        paddingHorizontal:8
    },
    destructiveAction:{
        borderColor:destructiveAction,
        borderWidth: 2
    }



})

export default AddShiftPopup