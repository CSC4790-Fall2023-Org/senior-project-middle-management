import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const CustomDashboardHeader = ({onTitlePress, tabs}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <View>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
export default CustomDashboardHeader