import React, { Component } from 'react'
import {Text,Alert,Image} from 'react-native';
import * as firebase from "firebase";
import { View } from 'native-base';

var ref = firebase.database().ref("Pages/About");
export default class About extends Component {  
  constructor(props){
    super(props);
   this.state={
      about:''
    }
      this.Data();
  }
  Data()
  {
    ref.once("value",(data)=>{
    //  Alert.alert(data.toJSON());
    this.setState({
      about:data.toJSON()
    })
    })
  }
  render() {
    return (
      <View style={{ alignItems: 'center',padding:10}} >
        <Image style={{width:100,height:100}} source={require('../Img/1.png')}></Image>
      <Text style={{fontSize:20,textAlign:"left" ,color:'black'}}>{this.state.about}
      

      </Text>

      </View>
    )
  }
}
