import React from 'react'
import Animated from 'react-native-reanimated'

export default SliderIcon= ({param}) => {
	const {icon,iconSize}= param
	const iconStyle={
		position: 'absolute',
		height: iconSize,
		width: iconSize,
		borderRadius: 20,
		//backgroundColor: 'tomato',
		overflow: 'hidden',
		marginTop: - iconSize +10,
		marginLeft: -8,
	}
	return	<Animated.Image 
				style={[iconStyle]}
				source={icon}
			/>
}
