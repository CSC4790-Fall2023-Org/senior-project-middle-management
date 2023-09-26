import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React, {useState} from "react";


const MyShiftList = () => {
    const [hours, setHours] = useState(0);

    const handleHours = (hours) => {
        setHours(hours);
    }

    return(
        <ScrollView style={styles.scrollView}>
            <EmployeeShiftCard date={"Fri Sep 22"} shiftType={"Head Guard"} startTime={"10:00am"} endTime={"6:30pm"} locationId={12345} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default MyShiftList;