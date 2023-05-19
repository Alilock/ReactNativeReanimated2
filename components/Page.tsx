import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const { width, height } = Dimensions.get('screen')
const SIZE = width * 0.7
interface PageProps {
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>
}

const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
    const indexRange = [(index - 1) * width, index * width, (index + 1) * width]
    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value,
            indexRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        )
        const borderRadius = interpolate(translateX.value, indexRange, [0, SIZE / 2, 0])
        return {
            transform: [
                { scale }
            ],
            borderRadius
        }
    })

    const rTextStyle = useAnimatedStyle(() => {

        const translateY = interpolate(translateX.value,
            indexRange, [height / 2, 0, -height / 2])

        const opacity = interpolate(translateX.value, indexRange, [-2, 1, -2])
        return {
            transform: [
                {
                    translateY
                }
            ],
            opacity
        }
    })

    return (
        <View style={[styles.container, { backgroundColor: `rgba(0,0,256,0.${index + 2})` }]}>
            <Animated.View style={[styles.square, rStyle]} />
            <Animated.View style={[rTextStyle, { position: "absolute" }]}>
                <Text style={styles.text}>{title}</Text>
            </Animated.View>

        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: "center",
        justifyContent: "center"
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: "rgba(0,0,256,0.4)"
    },
    text: {
        fontSize: 70,
        fontWeight: "700",
        color: "#fff"
    }
})