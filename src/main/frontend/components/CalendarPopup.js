import React from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import CalendarPicker from "react-native-calendar-picker";

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
            animationType="none"
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
                                todayBackgroundColor="#F1F1F1"
                                selectedDayColor="#50C878"
                                selectedDayTextColor="#FFFFFF"
                                todayTextStyle={'#000000'}
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

        position:"relative",
        backgroundColor:'#FFFFFF',
        borderRadius:20,
        borderStyle:"solid",
        borderColor:"#ccc",
        flexDirection: "column",
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
    },
    overlay:{

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default CalendarPopup