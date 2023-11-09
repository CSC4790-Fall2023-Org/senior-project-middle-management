import {
    TouchableWithoutFeedback,
    View,
    Keyboard,
} from "react-native";
import React, {useState} from "react";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import {ipAddy} from "../../utils/IPAddress";





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
        const shiftOptions =["Guard"]
        const [openShiftDD,setOpenShiftDD] = useState(false)
        const [displayedShift, setDisplayedShift] = useState(shiftOptions.map((shift) => ({ "label":shift, "value":shift})))
        const [shiftVal, setShiftVal] = useState(null);

        const locationOptions =[{locationId:"6500e97e491cac473a9b80c9",locationName: "Town Pool", maxHours: 40}]
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

                </View>
            </TouchableWithoutFeedback>

        )
    }



export default AddEmployeeBody