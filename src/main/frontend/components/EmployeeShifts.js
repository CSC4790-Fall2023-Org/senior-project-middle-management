import React from 'react';
import {View, Text, StyleSheet, Button, Pressable, Alert, TouchableOpacity} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import SwiperComponent from "../components/SwiperComponent";


const tabs = [
    {
        id: 1,
        text: 'My Shifts',
    },
    {
        id: 2,
        text: 'Available',
    },
];

function EmployeeShifts() {
    const [selected, setSelected] = React.useState(0)
    return (
        <View>
            <View style={styles.shiftsContainer}>
                {tabs.map((item, index) => (

                    <TouchableOpacity key={index} onPress={()=>setSelected(index)}>
                        <View>
                            <Text style={[styles.text]}>{item.text}</Text>
                            {selected===index && (
                                <View style={styles.underline} />
                            )}

                        </View>

                    </TouchableOpacity>
                ))}
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    shiftsContainer: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",
        paddingTop: 20,
    },
    loginButton: {
        width: 200,
        margin: 0,
        fontWeight: "bold"

    },
    text:{
        fontWeight: "bold",
        fontSize: 20,
    },
    selected:{
        borderBottomWidth:  100,
        textDecorationLine: "underline",
        textDecorationColor: "#50C878",
        // borderBlockColor: '#50C878',
    },
    underlineContainer: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",

    },
    underline: {
        width: '100%',
        borderBottomWidth: 5, // Increase the thickness of the underline
        borderBottomColor: '#50C878', // Set the underline color
        borderRadius: 10
    },

    //textDecorationLine: 'underline
});
export default EmployeeShifts;