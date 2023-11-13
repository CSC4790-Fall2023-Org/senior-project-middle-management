import React, {Component} from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarDelete, Transfer} from "../utils/Icons";
import {white, blueAction, destructiveAction} from "../utils/Colors";
import ShiftCard from "./ShiftCard";
import TransferShiftModal from "./TransferShiftModal";

class MyShiftCardSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transferShiftModal: false,
        };
        this.swipeableRef = React.createRef();
    }

    handleSwipeOpen = (direction) => {
        if (direction === 'right') {
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
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            this.swipeableRef.current.close();

                        }
                    }
                ]
            );
        } else if (direction === 'left') {
            this.handleTransferOpen();
        }
    };

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, -10, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
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
            <RectButton style={styles.rightAction} onPress={this.close}>
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

    handleTransferClose = () => {
        this.swipeableRef.current.close();
        this.setState({ transferShiftModal: false }); // Close the modal.
    }

    handleTransferOpen = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        this.setState({transferShiftModal: true});
    }

    render() {
        return (
                <Swipeable
                    renderLeftActions={this.renderLeftActions}
                    renderRightActions={this.renderRightActions}
                    onSwipeableOpen={(direction) => this.handleSwipeOpen(direction)}
                    ref={this.swipeableRef}
                    overshootFriction={8}
                >
                    {this.props.ShiftCardComponent}
                    {this.state.transferShiftModal && (
                        <TransferShiftModal
                            transferShiftModal={this.state.transferShiftModal}
                            setTransferShiftModal={this.handleTransferClose}
                            shiftName={this.props.shiftName}
                            startDate={this.props.startDate}
                            shiftStartTime={this.props.startTime}
                            shiftEndTime={this.props.endTime}
                            shiftHours={this.props.shiftHours}
                            shiftLocation={this.props.location}
                        />
                    )}
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
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
    actionText: {
        color: white,
        backgroundColor: 'transparent',
    },
    rightAction: {
        flex: 1,
        backgroundColor: destructiveAction,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: ShiftCard.height,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
})

export default MyShiftCardSwipe;
