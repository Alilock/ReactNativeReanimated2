import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'

const SIZE = 100

const AnimatedBasic = () => {

    const scale = useSharedValue(2)
    const progress = useSharedValue(1)

    const rSytle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { rotate: `${progress.value * 2 * Math.PI}rad` }],
            borderRadius: SIZE / 2 * progress.value,
            opacity: progress.value,
        }
    })

    useEffect(() => {
        scale.value = withRepeat(withSpring(0.5,), -1, true)
        progress.value = withRepeat(withSpring(0.5), -1, true)
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{ width: SIZE, height: SIZE, backgroundColor: "tomato" }, rSytle]} />
        </SafeAreaView>
    )
}

export default AnimatedBasic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})