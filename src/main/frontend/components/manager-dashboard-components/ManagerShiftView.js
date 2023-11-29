import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import ShiftCard from "../ShiftCard";

const ManagerShiftView = ({available}) => {
    return(
        <ScrollView style={styles.scrollView}>
            {available === "Open" || available ==="All" ? (
                <ShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={12345} />
            ):null}
            {available === "Taken" || available ==="All" ? (
                <ShiftCard date={"Fri Sep 22"} shiftType={"Head Guard"} startTime={"10:00am"} endTime={"6:30pm"} locationId={12345} />
            ):null}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
});

export default ManagerShiftView;
