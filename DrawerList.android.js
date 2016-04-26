'use strict'

import React,{
	Component,
	StyleSheet,
	Text,
	View,
} from 'react-native'

class DrawerList extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
			<View style = {styles.container}>
				<Text style = {styles.item}>item 1</Text>
				<Text style = {styles.item}>item 2</Text>
				<Text style = {styles.item}>item 3</Text>
				<Text style = {styles.item}>item 4</Text>
				<Text style = {styles.item}>item 5</Text>
			</View>
		);
	}

}

var styles = StyleSheet.create({
		 container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
      
    },

    item:{
    	flex:1,
    	justifyContent:'center',
      alignItems:'center',
      fontSize:20,
      color:'#000000',
    }
});

export default DrawerList;