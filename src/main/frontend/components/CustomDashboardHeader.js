import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {primaryGreen} from "../utils/Colors";


const CustomDashboardHeader = ({onTitlePress, tabs}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <View>
            <View style={styles.shiftsContainer}>
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