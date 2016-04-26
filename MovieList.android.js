/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 
 import DetailPage from './DetailPage'
 import DrawerList from './DrawerList'
 
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
  RefreshControl,
  DrawerLayoutAndroid,
 
} from 'react-native';

 var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
 var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
 var PAGE_SIZE = 25;
 var PARAMS = '?apikey='+API_KEY+'&page_limit='+PAGE_SIZE;
 var REQUEST_URL = API_URL + PARAMS;



class MovieList extends Component{
  constructor(props){
    super(props);
    this.renderMovie=this.renderMovie.bind(this);
    this.pressRow = this.pressRow.bind(this);
   
    this.state = {
      isRefreshing:false,
      
      dataSource:new ListView.DataSource({
          rowHasChanged:(row1,row2)=>row1!==row2,
        }),
      
      loaded:false,
      id:2,
     
    };
  }


 

  componentDidMount() {
      this.fetchData();
    }

  fetchData(){
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
    }


  render(){
    if(!this.state.loaded){
       return this.renderLoadingView();
    }

  
    return(
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <DrawerList/>}>
      
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="Loading..."
              colors={['#ff0000', '#00ff00', '#0000ff']}
             
              />
           }
        />
       </DrawerLayoutAndroid>
    );
  
  }




_onRefresh(){
  this.setState({
          isRefreshing: true,
      });

 
   fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
          isRefreshing: false,
        });
      })
      .done();
  
     
}
   

  renderLoadingView(){
    return(
      <View style = {styles.container}>
        <Text>
          加载中。。。
        </Text>
      </View>
    );
  }

  renderMovie(movie){
    return(
      
      <TouchableHighlight onPress={() => this.pressRow(movie.title,movie.id)}>
        <View style={styles.container}>
          <Image
              style = {styles.thumbnail}
              source={{uri:movie.posters.thumbnail}}

           />

           <View style= {styles.rightContainer}>
              <Text style = {styles.title}>
                {movie.title}
              </Text>
              <Text style = {styles.year}>
                {movie.year}年
              </Text>
              <Text style = {styles.score}>
                {movie.ratings.audience_score}分
              </Text>
                <View style= {styles.divider}/>
           </View>
        </View>
      </TouchableHighlight>
       
    );

  }


  pressRow(rowToast,idstr){
      ToastAndroid.show(rowToast, ToastAndroid.SHORT);
      this.setState({
        id:idstr,
      });
      this.props.navigator.push({
      title:'详情',
      name:'DetailPage',
      component:DetailPage,
        params:{
          id:this.state.id
        }
      })
    }

}

 var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5fcff',
        padding:10,

    },
    rightContainer:{
        flex:1,
    },
    title:{
        fontSize:20,
        marginBottom:8,
        textAlign:'center',
    },
    year:{
      fontSize:15,
       textAlign:'center',
    },
    score:{
       textAlign:'center',
       fontSize:18,
    },
    thumbnail:{
        width:53,
        height:81,
    },

    listview:{
        paddingTop:20,
        backgroundColor:'#f5fcff',
    },
    divider:{
        height:1,
        backgroundColor:'#ff0000',
        flexDirection: 'row',
    },

 });

 export default MovieList;

 


