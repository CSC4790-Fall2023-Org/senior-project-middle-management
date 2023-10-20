import React, { Component } from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarDelete, Transfer} from "../utils/Icons";
import {white, blueAction, destructiveAction} from "../utils/Colors";
import ShiftCard from "./ShiftCard";

class MyShiftCardSwipe extends Component {
    swipeableRef = React.createRef();
    handleSwipeOpen = (direction) => {
        console.log("noneOpen val on handleSwipeOpen call: ", this.props.noneOpen);
        if (this.props.noneOpen) {
            if (direction === 'right') {
                this.props.setNoneOpen(false);
                console.log("noneOpen val after direction right handleSwipeOpen call: ", this.props.noneOpen);
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                );
                Alert.alert(
                    'Drop Shift',
                    'Are you sure you want to drop this shift?',
                    [
                        {
                            text: 'Drop',
                            style: 'destructive',
                            onPress: () => {
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Success
                                );
                                this.swipeableRef.current.close();
                                this.props.setNoneOpen(true);
                            },
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => {
                                this.swipeableRef.current.close();
                                this.props.setNoneOpen(true);
                            }
                        }
                    ]
                );
            } else if (direction === 'left') {
                this.props.setNoneOpen(false);
                console.log("noneOpen val after direction left handleSwipeOpen call: ", this.props.noneOpen);
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                );
                Alert.alert(
                    'Transfer shift',
                    'Are you sure you want to transfer this shift?',
                    [
                        {
                            text: 'Transfer',
                            style: 'default',
                            onPress: () => {
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Success
                                );
                                this.swipeableRef.current.close();
                                this.props.setNoneOpen(true);
                            },
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => {
                                this.swipeableRef.current.close();
                                this.props.setNoneOpen(true);
                            }
                        }
                    ]
                )
            }
        } else {
            this.swipeableRef.current.close();
        }
    };

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, -10, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={Transfer} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-101, -100, -50, 0],
            outputRange: [-1, 0, 10, 20],
        });
        return (
            <RectButton style={styles.rightAction}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={CalendarDelete} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    render() {
        const { ShiftCardComponent } = this.props;
        const { noneOpen } = this.props;
        const { setNoneOpen } = this.props;

        return (
                <Swipeable renderLeftActions={this.renderLeftActions}
                           renderRightActions={this.renderRightActions}
                           onSwipeableOpen={noneOpen ? (direction) => this.handleSwipeOpen(direction) : null}
                           ref={this.swipeableRef}
                           overshootFriction={8}
                           leftThreshold={100}
                           rightThreshold={100}
                >
                    {ShiftCardComponent}
                    {noneOpen}
                    {setNoneOpen}
                </Swipeable>
        );
    }
}

const styles= StyleSheet.create({
    leftAction: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: blueAction,
        justifyContent: 'center',
        height: ShiftCard.height,
        margin: 16,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
    actionText: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    rightAction: {
        flex: 1,
        backgroundColor: destructiveAction,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: ShiftCard.height,
        margin: 16,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
})

export default MyShiftCardSwipe;
