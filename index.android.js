/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 
 
 
import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View,
   
} from 'react-native';

import MovieList from './MovieList'



class AwesomeProject extends Component{
  constructor(props){
    super(props);
  }


  render(){
    let defaultName = 'MovieList';
    let defaultComponent = MovieList;
    return(
      <Navigator
        initialRoute = {{name:defaultName,component:defaultComponent}}
        configureScene = {(route)=>{
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        renderScene = {(route,navigator)=>{
          let Component = route.component;
          return <Component {...route.params} navigator = {navigator}/>
        }}

      />
    );
  
  }

}  

  
  

AppRegistry.registerComponent('AwesomeProject', ()=>AwesomeProject);


 


