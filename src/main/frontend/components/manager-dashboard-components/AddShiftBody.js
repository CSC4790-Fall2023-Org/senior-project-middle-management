import {
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from "react-native";
import React, {useState} from "react";
import CalendarPopup from "../CalendarPopup";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Calendar} from '../../utils/Icons';
import MultiWheelPicker from "../MultiWheelPicker";
import CustomButton from "../CustomButton";
import {black, destructiveAction, grayBackground, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import * as Haptics from "expo-haptics";
import TimeWarnPopup from "./TimeWarnPopup";


const AddShiftBody = ({handlePressButton, locationOptions, shiftOptions}) => {

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
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
        handlePressButton(false)
    }

    return(
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={[styles.modal]}>
                <View style={[styles.longContainer]}>
                    <Text style={styles.inputText}>Shift Name:</Text>
                </View>
                <View style={[styles.inputContainer,isShiftNameEmpty ? styles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[styles.input]}
                        onChangeText={(shiftName) =>{
                            setShiftName(shiftName)
                            setShiftNameEmpty(false)
                        }}
                        value={shiftName}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[styles.longContainer]}>
                    <Text style={styles.inputText}>Shift Type:</Text>
                </View>
                <View style={[styles.dropdownContainer]}>
                    {shiftOptions.length === 1 && <View style={[styles.longContainer]}><Text style={{fontSize:24}}>{shiftOptions[0]}</Text></View>}
                    {shiftOptions.length !== 1 &&
                        <View style={[styles.doubleContainer]}>
                            <MultiWheelPicker wheelData={shiftOptions} selectedItem={shiftType} setSelectedItems={shiftDropdownPress} placeholder={"Select Shift Type"} wide={screenWidth/1.2} hasChevron={true}/>
                        </View>}

                </View>
                <View style={[styles.longContainer]}>
                    <Text style={styles.inputText}>Location:</Text>
                </View>
                <View style={[styles.dropdownContainer]}>
                    {displayedLocations.length === 1 && <View style={[styles.longContainer]}><Text style={{fontSize:24}}>{locationOptions[0].locationName}</Text></View>}
                    {displayedLocations.length !== 1 &&
                        <View style={[styles.doubleContainer, isLocationError ? styles.destructiveAction:{}]}>
                            <MultiWheelPicker wheelData={displayedLocations} setSelectedItems={locationDropdownPress} selectedItem={location} placeholder={"Select A Location"} wide={screenWidth/1.2} hasChevron={true}/>
                        </View>}

                </View>
                    {(!startDate || !endDate) &&
                    <TouchableOpacity onPress={() => {
                        handleCalendar()
                        setDateWrong(false)
                    }}>
                        <View style={[styles.doubleContainer, {borderWidth:2, borderRadius:10, backgroundColor:white, margin: 20}, dateWrong ? styles.destructiveAction:{borderColor:secondaryGray,}]}>
                                <View style={[styles.doubleContainer, {width:'97.5%'}]}>
                                    <View style={styles.shortContainer}>
                                        <Text style={styles.inputText}>Choose Dates</Text>
                                    </View>
                                    <View style={styles.shortContainer}>
                                        <FontAwesomeIcon icon={Calendar} color={primaryGreen} size={35}/>
                                    </View>
                                </View>

                        </View>
                    </TouchableOpacity>}
                {(startDate && endDate) && <TouchableOpacity onPress={() => {
                    handleCalendar()
                    setDateWrong(false)
                }}>
                    <View style={[styles.doubleContainer, {
                        borderWidth: 2,
                        borderColor: secondaryGray,
                        borderRadius: 10,
                        backgroundColor: white,
                        margin: 20
                    }]}>
                        <View style={[styles.shortContainer, {width: '45%'}]}>
                            <Text style={styles.inputText}>From:</Text>
                            <Text>{startDate}</Text>
                        </View>
                        <FontAwesomeIcon icon={Calendar} color={primaryGreen} size={40}/>
                        <View style={[styles.shortContainer, {width:'42.5%'}]}>
                            <Text style={styles.inputText}>To:</Text>
                            <Text>{endDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>}
                <View style={[styles.doubleContainer]}>
                    <View style={[styles.shortContainer, {width:"50%"}]}>

                        <Text style={[styles.inputText]}>Start Hour:</Text>
                        <View style={[styles.doubleContainer, {width: "55%"}]}>
                            <MultiWheelPicker wheelData={hourOptions} placeholder={1} selectedItem={startHour} setSelectedItems={setStartHour}/>
                            <Text style={styles.inputText}>:</Text>
                            <MultiWheelPicker wheelData={minOptions} placeholder={"00"} selectedItem={startMinute} setSelectedItems={setStartMinute}/>
                            <Text> </Text>
                            <MultiWheelPicker wheelData={timePeriods} placeholder={"AM"} selectedItem={startPeriod} setSelectedItems={setStartPeriod}/>
                        </View>

                    </View>
                    <View style={[styles.shortContainer, {width:'55%'}]}>
                        <Text style={[styles.inputText]}>End Hour:</Text>
                        <View style={[styles.doubleContainer, {width: "50%"}]}>
                            <MultiWheelPicker wheelData={hourOptions} placeholder={1} selectedItem={endHour} setSelectedItems={setEndHour}/>
                            <Text style={styles.inputText}>:</Text>
                            <MultiWheelPicker wheelData={minOptions} placeholder={"00"} selectedItem={endMinute} setSelectedItems={setEndMinute}/>
                            <Text> </Text>
                            <MultiWheelPicker wheelData={timePeriods} placeholder={"AM"} selectedItem={endPeriod} setSelectedItems={setEndPeriod}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.longContainer, ]}>
                    <Text style={styles.inputText}>Repeats:</Text>
                </View>
                <View style={[styles.dropdownContainer,]}>
                    <View style={[styles.doubleContainer, ]}>
                        <MultiWheelPicker wheelData={displayedRepeats} setSelectedItems={repeatsDropdownPress} selectedItem={selectedRepeats} placeholder={"Select Option"} wide={screenWidth/1.2} hasChevron={true}/>
                    </View>
                </View>
                <View style={[styles.dayContainer, noWeekdaysPressed ? styles.destructiveAction:{}]}>
                    {weekdays.map(day  =>
                        <TouchableOpacity onPress={() => handleWeekdayPress(day.key)} key={day.key}>
                            <View style={[weekdaysPressed.includes(day.key) ? {backgroundColor:primaryGreen}:{backgroundColor:white}, styles.dayBox, day.key === 1 ? {borderTopLeftRadius:10,borderBottomLeftRadius:10,}:{}, day.key === 7 ? {borderTopRightRadius:10,borderBottomRightRadius:10,}:{}]}>
                                <Text style={[!weekdaysPressed.includes(day.key) ? {color:black}:{color:white}, {fontSize:20}]} >{day.text}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                </View>
                <View style={[styles.longContainer]}>
                    <Text style={styles.inputText}>Number of Shifts:</Text>
                </View>
                <View style={[styles.inputContainer, numShiftsError? styles.destructiveAction:{}]}>
                    <TextInput
                        style={[styles.input]}
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
                <TimeWarnPopup handlePressButton={handleWarnVisible} isModalVisible={warnModal} submitForm={handleShiftAdd}/>
                <CalendarPopup setSelectedEndDate={setSelectedEndDate} setSelectedStartDate={setSelectedStartDate} isCalendarVisible={isCalendarVisible} handleExitCalendar={handleCalendar}/>
            </View>
        </TouchableWithoutFeedback>


    )
}

const styles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderStyle: "solid",
        borderColor: secondaryGray,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,


    },
    titleContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,

    },
    longContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:5,
        width:"95%",
        margin:5,

    },
    inputContainer:{
        backgroundColor: white,
        padding:5,
        paddingHorizontal:10,
        margin:10,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:2,
        borderRadius:10,
        width:"95%",


    },
    inputText:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    dropdownContainer:{
        backgroundColor:white,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:2,
        borderRadius:10,
        width:"95%",

    },
    doubleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        margin:5,
        width:"95%",


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
        marginTop:20,
        width:"95%",

    },
    dayBox:{
        borderColor: secondaryGray,
        borderWidth:.5,
        marginTop:0,
        padding:5,
        paddingHorizontal:8
    },
    destructiveAction:{
        borderColor:destructiveAction,
        borderWidth: 2
    },
    input:{
        width:"95%",
        height:30,
        fontSize:24,
        margin:5,
    }



})

export default AddShiftBody