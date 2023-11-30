import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";

const ManagerEmployeeView = () =>{


    return(
        <ScrollView style={styles.scrollView}>
            <View>
                <ManagerEmployeeCard id={"651f3f35631f63367d896196"} name={"Tua Tagovailoa"} shiftsTaken={40} type={"Head Lifeguard"} worked={4} pNum={"123-123-1123"} email={"tua@gmail.com"}/>
                <ManagerEmployeeCard id={"12346"} name={"Tyreek Hill"} shiftsTaken={30} type={"Lifeguard"} worked={12} pNum={"786-451-5178"} email={"tyreek@gmail.com"}/>
            </View>

        </ScrollView>
        )

}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});
export default ManagerEmployeeView;