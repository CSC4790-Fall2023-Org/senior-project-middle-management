import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import {black, placeholderText, primaryGreen, secondaryGray, white} from "../utils/Colors";

const CalendarPopup = ({setSelectedEndDate, setSelectedStartDate, isCalendarVisible, handleExitCalendar}) => {
    const handleCalendarClick = (date,type) =>{
        if(type === 'END_DATE'){
            setSelectedEndDate(date)
        }
        else{
            setSelectedStartDate(date)
        }
    }
    const minDate = new Date();

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCalendarVisible}
            onRequestClose={handleExitCalendar}
        >
            <TouchableWithoutFeedback onPress={handleExitCalendar}>
                <View style={styles.overlay} >
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={true}
                                todayBackgroundColor={placeholderText}
                                selectedDayColor={primaryGreen}
                                selectedDayTextColor={white}
                                todayTextStyle={black}
                                onDateChange={handleCalendarClick}
                                width={300}
                                minDate={minDate}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        position: "relative",
        backgroundColor: white,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: secondaryGray,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
    },
    overlay:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CalendarPopup;
