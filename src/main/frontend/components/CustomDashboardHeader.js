import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {black, clickableText, grayBackground, primaryGreen} from "../utils/Colors";


const CustomDashboardHeader = ({onTitlePress, tabs}) => {
    const [selected, setSelected] = useState(0);

    return (
        <View style={styles.container}>
            {tabs.map((item, index) => (
                <TouchableOpacity key={index} onPress={()=> {setSelected(index); onTitlePress(index);}}>
                    <View>
                        <Text
                            style={[styles.text, selected===index
                                ? {color: black}
                                : {color: clickableText}
                            ]}
                        >
                            {item.text}
                        </Text>
                        {selected===index && (
                            <View style={styles.underline} />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",
        paddingTop: 20,
        backgroundColor: grayBackground,
    },
    text: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 2,
    },
    underline: {
        width: '100%',
        borderBottomWidth: 4,
        borderBottomColor: primaryGreen,
        borderRadius: 10,
    },
});
export default CustomDashboardHeader