import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {black, primaryGreen} from "../utils/Colors";


const CustomDashboardHeader = ({onTitlePress, tabs}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <View style={styles.container}>
            {tabs.map((item, index) => (
                <TouchableOpacity key={index} onPress={()=> {setSelected(index); onTitlePress(index);}}>
                    <View>
                        <Text style={[styles.text]}>{item.text}</Text>
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
        shadowColor: black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    text:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 2,
    },
    underline: {
        width: '100%',
        borderBottomWidth: 4,
        borderBottomColor: primaryGreen,
        borderRadius: 10
    },
});
export default CustomDashboardHeader