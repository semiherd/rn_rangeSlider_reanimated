import {StyleSheet} from 'react-native'

const styles= (maxWidth,iconSize) => StyleSheet.create({
	main:{
		width: maxWidth + iconSize + 5,
		alignSelf: 'center',
	},
	rangeContainer:{
		paddingHorizontal: '1%',
		paddingTop: '5%',
		paddingBottom: '10%',
		backgroundColor: '#fff',
		overflow: 'hidden',
	},
	labelContainer:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '5%',
	},
	label:{
		fontSize: 20,
		color: 'tomato',
		fontWeight: '900'
	},
	track:{	
		height: 5,
		backgroundColor: 'lightgray',
		borderRadius: 5,
	},
	icon:{
		position: 'absolute',
		height: iconSize,
		width: iconSize,
		borderRadius: 20,
		backgroundColor: 'tomato',
		overflow: 'hidden',
		marginTop: -iconSize + 10,
	}
})

export default styles;