import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Page from './components/Page'
const WORDS = ["What's", 'up', 'mobile', 'devs?']

const AnimatedOnBoarding = () => {

    const translateX = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {

        translateX.value = event.contentOffset.x
    })

    return (
        <Animated.ScrollView
            pagingEnabled
            onScroll={scrollHandler}
            horizontal
            scrollEventThrottle={16}
        >
            {
                WORDS.map((title, index) => (
                    <Page key={index} title={title} index={index} translateX={translateX} />
                ))
            }
        </Animated.ScrollView>
    )
}

export default AnimatedOnBoarding

const styles = StyleSheet.create({})