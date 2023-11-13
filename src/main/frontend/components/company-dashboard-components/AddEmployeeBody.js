import {
    TouchableWithoutFeedback,
    View,
    Text,
    Keyboard,
    TextInput,
} from "react-native";
import React, {useState} from "react";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../CustomButton";
import {ipAddy} from "../../utils/IPAddress";
import * as Haptics from "expo-haptics";
import {primaryGreen, secondaryGray, white} from "../../utils/Colors";





const AddEmployeeBody = ({backPress}) => {

    //location info
    const locationOptions =[{locationId:"6500e97e491cac473a9b80c9",locationName: "Town Pool", maxHours: 40}]
    const [openLocDD,setOpenLocDD] = useState(false)
    const [locVal, setLocVal] = useState([locationOptions[0].locationId]);
    const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(({ locationId, locationName }) => ({ "label": locationName, "value":locationId})))


    //org info
    const orgID = "6500cf35491cac473a9b80c8"

    //employee info
    const [empFName, setEmpFName] = useState("")
    const [fNameEmpty, setFNameEmpty] = useState(false)
    const [empLName, setEmpLName] = useState("")
    const [lNameEmpty, setLNameEmpty] = useState(false)
    const [empEmail, setEmpEmail] = useState("")
    const [emailEmpty, setEmailEmpty] = useState(false)
    const [empPhone, setEmpPhone] = useState("")
    const [phoneEmpty, setPhoneEmpty] = useState(false)
    const [hoursPerWeek, setHoursPerWeek] = useState("")
    const [hoursEmpty, setHoursEmpty] = useState(false)
    const [wage, setWage] = useState("")
    const [wageEmpty, setWageEmpty] = useState(false)

    //shift type info
    const shiftOptions =["Guard"]
    const [openShiftDD,setOpenShiftDD] = useState(false)
    const [displayedShift, setDisplayedShift] = useState(shiftOptions.map((shift) => ({ "label":shift, "value":shift})))
    const [shiftVal, setShiftVal] = useState(null);

    const handleEmployeeAdd = () => {

        let payFloat
        let hoursFloat
        if (typeof wage === "string") {
            payFloat = parseFloat(wage)
        } else {
            payFloat = wage
        }
        if (typeof hoursPerWeek === "string") {
            hoursFloat = parseFloat(hoursPerWeek)
        } else {
            hoursFloat = hoursPerWeek
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
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });

        backPress()
    }
    const handleErrors = () =>{
        let noErrors= true

        if (!shiftVal) {
            setShiftVal(displayedShift[0].label)
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
            handleEmployeeAdd()
        }
    }

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return(

        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <View style={[AddPopupStyles.modal]}>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>First Name:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer,fNameEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(fName) =>{
                            setEmpFName(fName)
                            setFNameEmpty(false)
                        }}
                        value={empFName}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Last Name:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer, lNameEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(lName) =>{
                            setEmpLName(lName)
                            setLNameEmpty(false)
                        }}
                        value={empLName}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Phone Number:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer, phoneEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        keyboardType={"phone-pad"}
                        onChangeText={(numb) =>{
                            setEmpPhone(numb)
                            setPhoneEmpty(false)
                        }}
                        value={empPhone}
                        placeholder={"Type Here"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <View style={[AddPopupStyles.longContainer]}>
                    <Text style={AddPopupStyles.text}>Email:</Text>
                </View>
                <View style={[AddPopupStyles.inputContainer, emailEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(mail) =>{
                            setEmpEmail(mail)
                            setEmailEmpty(false)
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
                <View style={[AddPopupStyles.inputContainer, wageEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(pay) =>{
                            setWage(pay)
                            setWageEmpty(false)
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
                <View style={[AddPopupStyles.inputContainer, hoursEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                    <TextInput
                        style={[AddPopupStyles.input]}
                        onChangeText={(hours) =>{
                            setHoursPerWeek(hours)
                            setHoursEmpty(false)
                        }}
                        value={hoursPerWeek}
                        placeholder={"Type Here"}
                        keyboardType={"numeric"}
                        placeholderTextColor={"#D0D0D0"}
                    />
                </View>
                <CustomButton buttonText={"Submit Employee"} handlePress={handleErrors} color={primaryGreen} textColor={white}/>
            </View>
        </TouchableWithoutFeedback>

    )
}



export default AddEmployeeBody