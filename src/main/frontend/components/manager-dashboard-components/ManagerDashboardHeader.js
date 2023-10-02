import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const tabs = [
    {
        id: 1,
        text: 'Employees',
    },
    {
        id: 2,
        text: 'Shifts',
    },
];

const ManagerDashboardHeader = ({onTitlePress}) => {
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
    text:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 2,
    },
    underline: {
        width: '100%',
        borderBottomWidth: 4,
        borderBottomColor: '#50C878',
        borderRadius: 10
    },
});
export default ManagerDashboardHeader;