import { StyleSheet } from 'react-native';
import {grayBackground, secondaryGray, white} from "./Colors";

export const AddPopupStyles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: "#ccc",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    longContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:5,
    },
    titleContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,

    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdownContainer:{
        backgroundColor:white,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:.5,
        borderRadius:10
    },
});