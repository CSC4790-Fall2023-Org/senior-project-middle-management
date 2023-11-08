import { StyleSheet } from 'react-native';
import {destructiveAction, grayBackground, secondaryGray, white} from "./Colors";

export const AddPopupStyles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        borderStyle: "solid",
        borderColor: secondaryGray,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    longContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:5,
        width:"95%",
        margin:5,

    },
    text:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    dropdownContainer:{
        backgroundColor:white,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:2,
        borderRadius:10,
        width: '95%'
    },
    input:{
        width:"95%",
        height:30,
        fontSize:24,
        margin:5,
    },
    inputContainer:{
        backgroundColor: white,
        padding:5,
        paddingHorizontal:10,
        margin:10,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderColor: secondaryGray,
        borderWidth:2,
        borderRadius:10,
        width:"95%",
    },
    destructiveAction:{
        borderColor:destructiveAction,
        borderWidth: 2
    },
});