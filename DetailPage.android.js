'use strict'

import React,{
		Component,
		StyleSheet,
		Text,
		View,
		Platform,
		BackAndroid,
		ToastAndroid,
		TouchableHighlight,
} from 'react-native';

import ViewPager from './ViewPager'


var URL ='http://gank.io/api/data/Android/10/2';
 

class DetailPage extends Component{
	constructor(props){
			super(props);
			this.state = {
				loaded:false,
				datas:[],
				id:null,
			}

	}

	componentWillMount(){
		if (Platform.OS === 'android') {
				BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
		};
	}

	componentDidMount(){
		 this.setState({
            id: this.props.id,
        });
		 
		this.fetchData();
	}

 
	/*componentWillUnmount(){
		if (Platform.OS === 'android') {
				BackAndroid.RemoveEventListener('hardwareBackPress',this.onBackAndroid);
		};
	}*/

	onBackAndroid = () => {
    const nav = this.props.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };

	fetchData(){
			 		 
			fetch(URL)
			.then((response) => response.json())
			.then((responseData) => {
					this.setState({
						loaded:true,
						datas:responseData,
					});
			})
			.done();
	}

	render(){
		if(!this.state.loaded){
				return this.renderLoadingView();
		}else{
			return this.renderDetailView();
		}
	}

	renderDetailView(){
	/*	createdAt: "2016-04-25T11:08:42.127Z",
desc: "底部导航栏（Bottom navigation）规范指南",
publishedAt: "2016-04-25T11:24:01.704Z",
source: "chrome",
type: "Android",
url: "https://github.com/LittleFriendsGroup/BottomNavigation",
used: true,
who: "onlylemi"*/
var responseData = this.state.datas;
return(
		 <View style= {styles.container}>
		 					<TouchableHighlight onPress={()=>this._onclick()}>
				 					<Text style = {styles.title}>
				 						获得的参数: id={ this.state.id }
				 					</Text>
		 					</TouchableHighlight>
		 					<Text style = {styles.title}>
		 						url={URL+this.state.id}
		 					</Text>
              <Text style = {styles.title}>
                {responseData.results[0].desc}
              </Text>
              <Text style = {styles.title}>
                {responseData.results[0].type}
              </Text>
              <Text style = {styles.title}>
                {responseData.results[0].url}
              </Text>
               <Text style = {styles.title}>
                {responseData.results[0].publishedAt}
              </Text>
                 <Text style = {styles.title}>
                发布者{responseData.results[0].who}
                 </Text>
           </View>
	);
	}

	_onclick(){
		ToastAndroid.show("onclicked",ToastAndroid.SHORT);

		 this.props.navigator.push({
		      title:'详情',
		      name:'ViewPager',
		      component:ViewPager,
		         
		      });

	}

	renderLoadingView(){
		return(
			<View style = {styles.loadingView}>
				<Text>
					加载中。。。
				</Text>
			</View>	
			);
	}

}

var styles = StyleSheet.create({
	loadingView:{
			flex:1,
			justifyContent:'center',
			backgroundColor:'#f4f4f4',
			alignItems:'center',
	},

	container:{
		flex:1,
		justifyContent:'center',
	},
	title:{
        fontSize:15,
        marginBottom:8,
        textAlign:'center',
    },


});

export default DetailPage;