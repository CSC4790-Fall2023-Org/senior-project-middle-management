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
            transferShiftModalVisible: false,
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
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Transfer Shift',
                'Are you sure you want to transfer this shift?',
                [
                    {
                        text: 'Transfer',
                        style: 'default',
                        onPress: () => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            this.setState({ transferShiftModalVisible: true });
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
            )
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

    handleModalClose = () => {
        this.setState({ transferShiftModalVisible: false }); // Close the modal for this card
    };

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
                    {this.state.transferShiftModalVisible && (
                        <TransferShiftModal
                            transferShiftModalVisible={this.state.transferShiftModalVisible}
                            setTransferShiftModalVisible={this.handleModalClose}
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
        margin: 16,
        marginBottom: 0,
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
        margin: 16,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
})

export default MyShiftCardSwipe;
