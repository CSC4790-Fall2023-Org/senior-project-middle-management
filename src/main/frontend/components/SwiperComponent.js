import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Swiper from 'react-native-swiper';




const slides = [
    {
        label: 'Button 1',
        description: 'This is the first button slide.',
    },
    {
        label: 'Button 2',
        description: 'This is the second button slide.',
    },
    {
        label: 'Button 3',
        description: 'This is the third button slide.',
    },
];

const SwiperComponent = () => {
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
            {slides.map((slide, index) => (
                <View key={index} style={styles.slide}>
                    <Text style={styles.description}>{slide.description}</Text>
                    <Button title={slide.label} onPress={() => alert(`Clicked on ${slide.label}`)} />
                </View>
            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default SwiperComponent;