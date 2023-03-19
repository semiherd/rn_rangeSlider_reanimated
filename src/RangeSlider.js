import React from 'react'
import {Dimensions,View,TextInput} from 'react-native'
import styles from './Styles'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated,{
	useAnimatedStyle,
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedProps,
	runOnJS
} from 'react-native-reanimated'
import SliderIcon from './SliderIcon'

const AnimatedTextInput= Animated.createAnimatedComponent(TextInput)
const {width,height}= Dimensions.get('window')
const iconSize= 20
const maxWidth= width*0.9 - iconSize*2

const RangeSlider= ({range,move,onChange}) => {
	const {lower,upper}= range
	const lowerLimit= useSharedValue(0)	
	const upperLimit= useSharedValue(maxWidth)	
	
	const scaleLowerLimit= useSharedValue(1)	
	const scaleUpperLimit= useSharedValue(1)	
	
	

	const styleLine= useAnimatedStyle(() => {
		return {
			backgroundColor: 'tomato',
			height: 5,
			marginTop: -5,
			borderRadius: 5,
			width: upperLimit.value - lowerLimit.value,
			transform: [
				{ translateX: lowerLimit.value }
			],
		}
	})
	
	const styleLowerLimit= useAnimatedStyle(() => {
		return {
			transform: [
				{translateX: lowerLimit.value},
				{scale: scaleLowerLimit.value}
			]
		}
	})

	const styleUpperLimit= useAnimatedStyle(() => {
		return {
			transform: [
				{translateX: upperLimit.value},
				{scale: scaleUpperLimit.value}
			]
		}
	})
	
	const gestureHandlerLower= useAnimatedGestureHandler({
          onStart: (_,ctx) => {
               ctx.startX= lowerLimit.value
          },
          onActive: (event,ctx) => {
			scaleLowerLimit.value= 1.5
               lowerLimit.value= 
				ctx.startX + event.translationX < 0 
                    ? 0
                    : ctx.startX+event.translationX>upperLimit.value 
                    ? upperLimit.value
                    : ctx.startX+event.translationX
          },
          onEnd: () => {
               scaleLowerLimit.value= 1
			const calculatedLower= lower + (lowerLimit.value/maxWidth) * (upper - lower)
			const calculatedUpper= lower + (upperLimit.value/maxWidth) * (upper - lower)
               runOnJS(onChange)({
                    lower: `${Math.round( calculatedLower / move)*move}`,
                    upper: `${Math.round( calculatedUpper / move)*move}`
               })
          },
     })

	const gestureHandlerUpper= useAnimatedGestureHandler({
          onStart: (_,ctx) => {
               ctx.startX= upperLimit.value
          },
          onActive: (event,ctx) => {
               scaleUpperLimit.value= 1.5
			upperLimit.value= 
				ctx.startX + event.translationX < lowerLimit.value
                    ? lowerLimit.value
                    : ctx.startX+event.translationX>maxWidth 
                    ? maxWidth
                    : ctx.startX+event.translationX
          },
          onEnd: () => {
               scaleUpperLimit.value= 1
			const calculatedLower= lower + (lowerLimit.value/maxWidth) * (upper - lower)
			const calculatedUpper= lower + (upperLimit.value/maxWidth) * (upper - lower)
               runOnJS(onChange)({
				lower: `${Math.round( calculatedLower / move)*move}`,
                    upper: `${Math.round( calculatedUpper / move)*move}`
               })
          },
     })
	
	const propsLowerLimit= useAnimatedProps(() => {
		const calculated= lower + (lowerLimit.value/maxWidth) * (upper - lower)
          return {
               text: `${Math.round(calculated / move)*move}`,
               
          }
     })

     const propsUpperLimit= useAnimatedProps(() => {
		const calculated= lower + (upperLimit.value/maxWidth) * (upper - lower)
          return {
               text: `${Math.round( calculated / move)*move}`,
          }
	})

	const imageSource1= require('./pomegranate.jpg')

	return (
		<View style={styles(maxWidth,iconSize).main} >
			<View style={styles().rangeContainer}>
				<View style={styles().labelContainer}>
                         <AnimatedTextInput default={'0'} 
						editable={false} 
						style={styles().label} 
						animatedProps={propsLowerLimit} />
                         <AnimatedTextInput default={'0'} 
						editable={false} 
						style={styles().label} 
						animatedProps={propsUpperLimit} />
                    </View>
				<View style={styles().track} />
				<Animated.View style={styleLine} />
				<View>
                         <PanGestureHandler 
						onGestureEvent={gestureHandlerLower} 
					>
                              <Animated.View 
							style={[styles(maxWidth,iconSize).icon,styleLowerLimit]} 
						>
							<SliderIcon param={{icon:imageSource1,iconSize}} />
						</Animated.View>
                         </PanGestureHandler>
 
                         <PanGestureHandler 
						onGestureEvent={gestureHandlerUpper} 
					>
                             <Animated.View 
							style={[styles(maxWidth,iconSize).icon,styleUpperLimit]} 
						>
							<SliderIcon param={{icon:imageSource1,iconSize}} />
						</Animated.View>
                         </PanGestureHandler>
                    </View>	
			</View>
		</View>
	)
}
export default RangeSlider;
