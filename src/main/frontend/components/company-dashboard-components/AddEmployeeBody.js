import {
    TouchableWithoutFeedback,
    View,
    Text,
    Keyboard,
    Dimensions,
    TextInput,
} from "react-native";
import React, {useState} from "react";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../CustomButton";





const AddEmployeeBody = ({backPress}) => {

    //location info
    const locationOptions =[{locationId:"6500e97e491cac473a9b80c9",locationName: "Town Pool", maxHours: 40}
                                                    ]
    const [openLocDD,setOpenLocDD] = useState(false)
    const [locVal, setLocVal] = useState([]);
    const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(({ locationId, locationName }) => ({ "label": locationName, "value":locationId})))


    //org info
    const orgID = "6500cf35491cac473a9b80c8"

    //employee info
    const [empFName, setEmpFName] = useState("")
    const [empLName, setEmpLName] = useState("")
    const [empEmail, setEmpEmail] = useState("")
    const [empPhone, setEmpPhone] = useState("")
    const [hoursPerWeek, setHoursPerWeek] = useState(0)
    const [wage, setWage] = useState(0)

    //shift type info
    const shiftOptions =["Guard"]
    const [openShiftDD,setOpenShiftDD] = useState(false)
    const [shiftVal, setShiftVal] = useState([]);
    const [displayedShift, setDisplayedShift] = useState(shiftOptions.map((shift) => ({ "label":shift, "value":shift})))


    const handleEmployeeAdd = () => {
        //update fetch url according to IPv4 of Wi-Fi
        fetch('http://10.132.7.105:8080/createEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationId: orgID,
                firstName: empFName,
                lastName: empLName,
                locationIdList: locVal,
                maxHours: hoursPerWeek,
                employeeType: shiftVal,
                employeePhoneNumber:empPhone,
                employeeEmail: empEmail,
                pay: wage,
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
    const screenWidth = Dimensions.get('window').width;

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return(

        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={[AddPopupStyles.modal]}>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>First Name:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(fName) =>{
                            setEmpFName(fName)
                        }}
                        value={empFName}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Last Name:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(lName) =>{
                            setEmpLName(lName)
                        }}
                        value={empLName}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Phone Number:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        keyboardType={"phone-pad"}
                        onChangeText={(numb) =>{
                            setEmpPhone(numb)
                        }}
                        value={empPhone}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Email:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(mail) =>{
                            setEmpEmail(mail)
                        }}
                        value={empEmail}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Location(s):</Text>
                </View>
                {displayedLoc.length === 1 && <View style={[AddPopupStyles.dropdownContainer]}><View style={[AddPopupStyles.longContainer]}><Text style={{fontSize:24}}>{locationOptions[0].locationName}</Text></View></View>}
                {displayedLoc.length !== 1 &&
                    <View style={[AddPopupStyles.longContainer, {zIndex: 100}]}>
                        <DropDownPicker
                            containerStyle={
                                [{}]
                            }
                            dropDownDirection="BOTTOM"
                            multiple={true}
                            open={openLocDD}
                            value={locVal}
                            items={displayedLoc}
                            setOpen={setOpenLocDD}
                            setValue={setLocVal}
                            setItems={setDisplayedLoc}
                        />

                    </View>}
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Employee Type(s):</Text>
                </View>
                {displayedShift.length === 1 && <View style={[AddPopupStyles.dropdownContainer]}><View style={[AddPopupStyles.longContainer]}><Text style={{fontSize:24}}>{displayedShift[0].label}</Text></View></View>}
                {displayedShift.length !== 1 &&
                    <View style={[AddPopupStyles.longContainer, {zIndex: 99}]}>
                        <DropDownPicker
                            containerStyle={
                                [ {}]
                            }
                            dropDownDirection="BOTTOM"
                            multiple={true}
                            open={openShiftDD}
                            value={shiftVal}
                            items={displayedShift}
                            setOpen={setOpenShiftDD}
                            setValue={setShiftVal}
                            setItems={setDisplayedShift}
                        />

                    </View>}
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Wage Per Hour</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(pay) =>{
                            setWage(pay)
                        }}
                        value={wage}
                        placeholder={"Type Here"}
                        keyboardType={"numeric"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Max Hours Per Week</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(hours) =>{
                            setHoursPerWeek(hours)
                        }}
                        value={hoursPerWeek}
                        placeholder={"Type Here"}
                        keyboardType={"numeric"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <CustomButton buttonText={"Submit Employee"} handlePress={handleEmployeeAdd}/>
            </View>
        </TouchableWithoutFeedback>

    )
}



export default AddEmployeeBody