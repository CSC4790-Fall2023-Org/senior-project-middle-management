import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,  ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronLeft} from "../utils/Icons";
import {secondaryGray} from "../utils/Colors";
import AddManagerBody from "../components/company-dashboard-components/AddManagerBody";



const AddManagerPage = ({ route }) => {
    //navigation tools
    const navigation = useNavigation();
    // const { locationOptions, shiftOptions } = route.params;

    const backPress = () =>{
        navigation.goBack()
    }
    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => backPress ()} style={styles.icon}>
                    <FontAwesomeIcon icon={ChevronLeft} size={24}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Manager</Text>
            </View>
            <ScrollView style={styles.pageScroll}>
                <AddManagerBody backPress={backPress}/>
            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 100,
        backgroundColor: "white",
        alignItems: "flex-end",
        borderBottomWidth: 1,
        borderBottomColor: secondaryGray,
    },
    headerText: {
        color: "black",
        fontSize: 24,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    icon: {
        color: 'black',
        position: 'absolute',
        left: 12,
        bottom: 12,
        width: 48,
    },
    pageScroll: {
        height: "88%",

    },
});
export default AddManagerPage;