import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

const SIZE = 100
const CIRCLE_RADIUS = SIZE * 2

type ContextType = {
    translateX: number
    translateY: number
}

const PanGesture = () => {
    const progress = useSharedValue(1)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const hexCode = useSharedValue(110000)
    const gestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

            translateX.value = event.translationX + context.translateX
            translateY.value = event.translationY + context.translateY
            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                progress.value = withSpring(1)
            }
            else {
                progress.value = withSpring(0.2)
            }
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0),
                    translateY.value = withSpring(0)
            }

        },
    })


    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ],
            opacity: progress.value,
            backgroundColor: `#${hexCode.value}`
        }
    })

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <View style={styles.circelArea}>
                    <PanGestureHandler onGestureEvent={gestureEvent}>
                        <Animated.View style={[styles.circle, rStyle]} />
                    </PanGestureHandler>
                </View>
            </GestureHandlerRootView>
        </View>
    )
}

export default PanGesture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        // backgroundColor: "rgba(0,0,0,1)"
    },
    circelArea: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderWidth: 6,
        borderRadius: CIRCLE_RADIUS,
        borderColor: 'rgba(0,0,0,1)',
        justifyContent: "center",
        alignItems: "center"
    }
})