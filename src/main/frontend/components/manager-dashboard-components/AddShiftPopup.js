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
import {XMark, Calendar, ChevronDown} from '../../utils/Icons';
import MultiWheelPicker from "../MultiWheelPicker";
import CustomButton from "../CustomButton";
import {grayBackground, white} from "../../utils/Colors";


const AddShiftPopup = ({isModalVisible, handlePressButton}) => {
    const screenWidth = Dimensions.get('window').width;
    //shift type info
    const shiftOptions = ["Head Guard", "LifeGuard"]
    const [shiftType, setShiftType] = useState("Head Guard");
    const shiftDropdownPress = (index) => {
        setShiftType(index);
    }

    //location info
    const locationOptions = [{
            id: "6500e97e491cac473a9b80c9",
            text: 'Bryn Mawr',
        },
        {
            id: "1",
            text: 'Villanova',
        },]
    const [location, setLocation] = useState(locationOptions[0].name);
    const [locationId, setLocationId] = useState(locationOptions[0].id);
    let displayedLocations = locationOptions.map(a => a.text);
    const locationDropdownPress = (index) => {
        setLocation(index);
        for(let i = 0; i < locationOptions.length; i++){
            if(location === locationOptions[i].text){
                setLocationId(locationOptions[i].id)
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

    //shift name info
    const [shiftName, setShiftName] = useState("");

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
            id: 1,
            text: 'Mon',
        },
        {
            id: 2,
            text: 'Tue',
        },
        {
            id: 3,
            text: 'Wed',
        },
        {
            id: 4,
            text: 'Thu',
        },
        {
            id: 5,
            text: 'Fri',
        },
        {
            id: 6,
            text: 'Sat',
        },
        {
            id: 7,
            text: 'Sun',
        },]

    const [weekdaysPressed, setWeekdaysPressed] = useState([]);



    const handleWeekdayPress = (index) => {
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

    const handleShiftAdd = () => {
        const weekdays = weekdaysPressed.sort()
        const isEndPeriod = (endPeriod === "AM")
        const isStartPeriod = (startPeriod === "AM")
        fetch('http://192.168.1.162:8080/createShifts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
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
                numberOfShifts: 1,
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
                            <View style={[styles.inputContainer,{width:screenWidth/1.30}]}>
                                <TextInput
                                    style={[styles.input]}
                                    onChangeText={setShiftName}
                                    value={shiftName}
                                    placeholder={"Type Here"}
                                    placeholderTextColor={"#D0D0D0"}
                                />
                            </View>
                            <View style={[styles.longContainer,{width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Shift Type:</Text>
                            </View>
                            <View style={[styles.dropdownContainer,{width:screenWidth/1.30}]}>
                                <View style={[styles.doubleContainer, {width:screenWidth/1.35}]}>
                                    <MultiWheelPicker wheelData={shiftOptions} selectedItem={shiftType} setSelectedItems={shiftDropdownPress} placeholder={"Select Shift Type"}/>
                                    <FontAwesomeIcon icon={ChevronDown} size={20}/>
                                </View>
                            </View>
                            <View style={[styles.longContainer,{width: screenWidth/1.30}]}>
                                <Text style={styles.inputText}>Location:</Text>
                            </View>
                            <View style={[styles.dropdownContainer,{width:screenWidth/1.30}]}>
                                {displayedLocations.length === 1 && <View style={[styles.longContainer]}><Text>{displayedLocations[0]}</Text></View>}
                                {displayedLocations.length !== 1 &&
                                <View style={[styles.doubleContainer,{width:screenWidth/1.35}]}>
                                    <MultiWheelPicker wheelData={displayedLocations} setSelectedItems={locationDropdownPress} selectedItem={location} placeholder={"Select A Location"}/>
                                    <FontAwesomeIcon icon={ChevronDown} size={20}/>
                                </View>}

                            </View>
                            <View style={[styles.doubleContainer, {width: screenWidth/1.30}]}>
                                <View style={styles.shortContainer}>

                                    <TouchableOpacity onPress={handleCalendar}>
                                        <FontAwesomeIcon icon={Calendar} size={35}/>
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
                                        <MultiWheelPicker wheelData={hourOptions} placeholder={"1"} selectedItem={startHour} setSelectedItems={setStartHour}/>
                                        <Text style={styles.inputText}>:</Text>
                                        <MultiWheelPicker wheelData={minOptions} placeholder={"00"} selectedItem={startMinute} setSelectedItems={setStartMinute}/>
                                        <Text> </Text>
                                        <MultiWheelPicker wheelData={timePeriods} placeholder={"AM"} selectedItem={startPeriod} setSelectedItems={setStartPeriod}/>
                                    </View>

                                </View>
                                <View style={styles.shortContainer}>
                                    <Text style={styles.inputText}>End Hour:</Text>
                                    <View style={styles.doubleContainer}>
                                        <MultiWheelPicker wheelData={hourOptions} placeholder={"1"} selectedItem={endHour} setSelectedItems={setEndHour}/>
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
                                    <MultiWheelPicker wheelData={displayedRepeats} setSelectedItems={repeatsDropdownPress} selectedItem={selectedRepeats} placeholder={"Select Option"}/>
                                    <FontAwesomeIcon icon={ChevronDown} size={20}/>
                                </View>
                            </View>
                            <View style={[styles.dayContainer, {width: screenWidth/1.30}]}>
                                {weekdays.map(day =>
                                    <TouchableOpacity onPress={() => handleWeekdayPress(day.id)}>
                                        <View style={[weekdaysPressed.includes(day.id) ? {backgroundColor:'#50C878'}:{backgroundColor:'#FFFFFF'}, styles.dayBox, day.id === 1 ? {borderTopLeftRadius:15,borderBottomLeftRadius:15,}:{}, day.id === 7 ? {borderTopRightRadius:15,borderBottomRightRadius:15,}:{}]}>
                                            <Text style={[!weekdaysPressed.includes(day.id) ? {color:'#000000'}:{color:'#FFFFFF'}]}>{day.text}</Text>
                                        </View>
                                    </TouchableOpacity>

                                )}
                            </View>
                            <View style={styles.addShiftButton}>
                                <CustomButton buttonText={"Add Shift"} handlePress={handleShiftAdd} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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
        borderColor: "#ccc",
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
        margin:5,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor:"#ccc",
        borderWidth:.5,
    },
    inputText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdownContainer:{
        backgroundColor:white,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor:"#ccc",
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
        margin:0,
    },
    dayBox:{
        borderColor:"#ccc",
        borderWidth:".5",
        marginTop:10,
        padding:5,
        paddingHorizontal:8
    }


})

export default AddShiftPopup