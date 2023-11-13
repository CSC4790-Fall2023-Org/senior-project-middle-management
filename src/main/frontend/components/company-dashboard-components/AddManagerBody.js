import {
    TouchableWithoutFeedback,
    View,
    Keyboard, Text, TextInput,
} from "react-native";
import React, {useState} from "react";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import {ipAddy} from "../../utils/IPAddress";
import {primaryGreen, secondaryGray, white} from "../../utils/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../CustomButton";
import * as Haptics from "expo-haptics";





    const AddEmployeeBody = ({backPress}) => {
        const orgID = "6500cf35491cac473a9b80c9"

        //manager info
        const [fName, setFName] = useState("")
        const [fNameEmpty, setFNameEmpty] = useState(false)
        const [lName, setLName] = useState("")
        const [lNameEmpty, setLNameEmpty] = useState(false)
        const [email, setEmail] = useState("")
        const [emailEmpty, setEmailEmpty] = useState(false)
        const [phoneNum, setPhoneNum] = useState("")
        const [phoneNumEmpty, setPhoneNumEmpty] = useState(false)
        const [hours, setHours] = useState("")
        const [hoursEmpty, setHoursEmpty]= useState(false)

        //location & shift info
        const shiftOptions =["Guard", "Head Guard"]
        const [openShiftDD,setOpenShiftDD] = useState(false)
        const [displayedShift, setDisplayedShift] = useState(shiftOptions.map((shift) => ({ "label":shift, "value":shift})))
        const [shiftVal, setShiftVal] = useState([shiftOptions[0]]);

        const locationOptions =[{locationId:"6500e97e491cac473a9b80c9",locationName: "Town Pool", maxHours: 40},{locationId:"6500e97e491cac473a9b80c8",locationName: "Town Park", maxHours: 40}]
        const [openLocDD,setOpenLocDD] = useState(false)
        const [locVal, setLocVal] = useState([locationOptions[0].locationId]);
        const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(({ locationId, locationName }) => ({ "label": locationName, "value":locationId})))




        const handleManagerAdd = () => {
            // change ipAddy in utils/IPAddress
            fetch('http://' + ipAddy + ':8080/createManager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizationId: orgID,
                    firstName: fName,
                    lastName: lName,
                    managerEmail: email,
                    locationIdList: locVal,
                    maxHours: hours,
                    managerPhoneNumber: phoneNum,
                    shiftTypeList: shiftVal,
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
            if(fName.trim() === ""){
                setFNameEmpty(true);
                noErrors=false;
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }
            if(lName.trim() === ""){
                setLNameEmpty(true);
                noErrors=false;
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }
            if(email.trim() === ""){
                setEmailEmpty(true)
                noErrors=false;
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }
            if(phoneNum.trim() === ""){
                setPhoneNumEmpty(true)
                noErrors=false;
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }
            if(hours.trim()===""){
                setHoursEmpty(true)
                noErrors=false;
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }

            if(noErrors) {
                handleManagerAdd()
            }
        }

        const handleDismissKeyboard = () => {
            Keyboard.dismiss();
        };
        return(

            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <View style={[AddPopupStyles.modal]}>
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
                        <Text style={AddPopupStyles.text}>Shift Type(s):</Text>
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
                        <Text style={AddPopupStyles.text}>First Name:</Text>
                    </View>
                    <View style={[AddPopupStyles.inputContainer,fNameEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                        <TextInput
                            style={[AddPopupStyles.input]}
                            onChangeText={(fName) =>{
                                setFName(fName)
                                setFNameEmpty(false)
                            }}
                            value={fName}
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
                                setLName(lName)
                                setLNameEmpty(false)
                            }}
                            value={lName}
                            placeholder={"Type Here"}
                            placeholderTextColor={"#D0D0D0"}
                        />
                    </View>
                    <View style={[AddPopupStyles.longContainer]}>
                        <Text style={AddPopupStyles.text}>Phone Number:</Text>
                    </View>
                    <View style={[AddPopupStyles.inputContainer, phoneNumEmpty ? AddPopupStyles.destructiveAction:{borderColor:secondaryGray}]}>
                        <TextInput
                            style={[AddPopupStyles.input]}
                            keyboardType={"phone-pad"}
                            onChangeText={(numb) =>{
                                setPhoneNum(numb)
                                setPhoneNumEmpty(false)
                            }}
                            value={phoneNum}
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
                                setEmail(mail)
                                setEmailEmpty(false)
                            }}
                            value={email}
                            placeholder={"Type Here"}
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
                                setHours(hours)
                                setHoursEmpty(false)
                            }}
                            value={hours}
                            placeholder={"Type Here"}
                            keyboardType={"numeric"}
                            placeholderTextColor={"#D0D0D0"}
                        />
                    </View>
                    <CustomButton buttonText={"Add Manager"} handlePress={handleErrors} textColor={white} color={primaryGreen}/>
                 </View>
            </TouchableWithoutFeedback>

        )
    }



export default AddEmployeeBody