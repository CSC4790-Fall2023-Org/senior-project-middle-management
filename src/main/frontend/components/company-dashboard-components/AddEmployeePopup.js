import {
    Modal,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Text,
    Keyboard,
    Dimensions, TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {XMark} from "../../utils/Icons";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import DropDownPicker from "react-native-dropdown-picker";




const AddEmployeePopup = ({isModalVisible, handlePressButton}) => {

    //location info
    const locationOptions =[{locationId:"6500e97e491cac473a9b80c9",locationName: "Town Pool", maxHours: 40}
                                                    , {locationId:"6500e97e491cac473a9b80c8",locationName: "Town Park", maxHours: 40}]
    const [selectedLocations, setSelectedLocations] = useState([])
    const [openDD,setOpenDD] = useState(false)
    const [value, setValue] = useState(null);
    const [displayedLoc, setDisplayedLoc] = useState(locationOptions.map(({ locationId, locationName }) => ({ "label": locationName, "value":locationId})))
    const changeSelectedLocation = (location) =>{
        if (selectedLocations.includes(location)) {
            const newData = selectedLocations.filter((item) => item !== location);
            setSelectedLocations(newData);
        }
        else{
            const addLocation = [location]
            setSelectedLocations([].concat(selectedLocations,addLocation))
        }
    }

    //org info
    const orgName = "Town Pool"
    const orgEmail = "tpool@gmail.com"

    //employee info
    const [empFName, setEmpFName] = useState("")
    const [empLName, setEmpLName] = useState("")
    const [empEmail, setEmpEmail] = useState("")
    const [empPhone, setEmpPhone] = useState("")


    const handleEmployeeAdd = () => {
        //update fetch url according to IPv4 of Wi-Fi
        fetch('http://10.0.0.194:8080/createEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locationList: selectedLocations,
                organizationName: orgName,
                orgOwnerEmail: orgEmail,
                firstName: empFName,
                lastName:empLName,
                employeeEmail: empEmail,
                employeePhoneNumber: empPhone,
            }),
        }).then(r => r.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
    }
    {  }
    const screenWidth = Dimensions.get('window').width;

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handlePressButton}
        >
            <TouchableWithoutFeedback onPress={handlePressButton}>
                <View style={AddPopupStyles.overlay}>
                    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                        <View style={[AddPopupStyles.modal]}>
                            <View>
                                <View style={[AddPopupStyles.titleContainer, {width: screenWidth/1.15}]}>
                                    <Text style={AddPopupStyles.text}>Add Employee</Text>
                                    <TouchableOpacity onPress={handlePressButton}>
                                        <FontAwesomeIcon icon={XMark} size={24} style={AddPopupStyles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[AddPopupStyles.longContainer, {width: screenWidth/1.30}]}>
                                <Text style={AddPopupStyles.text}>Location(s):</Text>
                            </View>

                            {displayedLoc.length === 1 && <View style={[AddPopupStyles.dropdownContainer,{width:screenWidth/1.30}]}><View style={[AddPopupStyles.longContainer]}><Text style={{fontSize:20}}>{locationOptions[0].locationName}</Text></View></View>}
                            {displayedLoc.length !== 1 &&
                                <View style={[AddPopupStyles.longContainer,{width:screenWidth/1.35}]}>
                                    <DropDownPicker
                                        containerStyle={
                                            [AddPopupStyles.dropdownContainer, {zIndex: 10}]
                                        }
                                        multiple={true}
                                        open={openDD}
                                        value={value}
                                        items={displayedLoc}
                                        setOpen={setOpenDD}
                                        setValue={setValue}
                                        setItems={setDisplayedLoc}
                                    />
                                </View>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({

})

export default AddEmployeePopup