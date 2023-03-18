import React,{useState,useEffect} from 'react'
import {Dimensions,View,Text} from 'react-native'
import RangeSlider from './src/RangeSlider'

const App = () => {
	const [limit,setLimit]= useState()
	const {width,height}= Dimensions.get('window')

	const containerStyle={ 
		flex:1,
		marginTop: '20%',
	}

	const titleStyle={ 
		width: width,
		backgroundColor: 'tomato',
		color:'white',
		paddingVertical: '1%',
		overflow: 'hidden',
		fontSize: 25,
		fontWeight: '800',
		textAlign:'center'
	}

	return (
		<View style={containerStyle}>
			<Text style={titleStyle}>Title</Text>
			<RangeSlider 
				range={{lower:0,upper:1000}} 
				move={10}
				onChange={(range) => setLimit(range)}
			/>
		</View>
	)	
}

export default App