import React, {Component} from 'react';
import {StyleSheet,View,Image} from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Details extends Component {
  state={
    obj:{},
    counter:0,
    user:"",
    i:1,
     
  }
  componentWillMount(){
     this.isPresent()
    
     
  }
  constructor(props) {
    super(props);
   // alert(JSON.stringify( this.props.data.sessionId));
  
  }
  isPresent(){
    this.setState({
      user:firebase.auth().currentUser.uid
    }) 
    firebase.database().ref("Session/"+this.props.data.sessionId+"/players").once('value').then((snapshot)=>{
      //alert(JSON.stringify(snapshot))
      snapshot.forEach((doc)=>{
          var player = doc.toJSON()
          
          if(player==this.state.user){
            //alert(player+" / "+this.state.user)
              this.setState({
                i:2
              })
              
          }
      })
      
    })
  }
  joinGame(){
    this.setState({
      user:firebase.auth().currentUser.uid
    })
    // var obj={}
    firebase.database().ref("Session/"+this.props.data.sessionId).once('value').then((snapshot)=>{
      this.state.counter = snapshot.toJSON().counter;
      this.setState({
        counter:this.state.counter+1
      }) 
    
     // alert(counter)
    })
    .then(()=>{
      firebase.database().ref("Session/"+this.props.data.sessionId+"/players")
      .once('value').then((doc)=>{
        this.setState({
          obj:doc
        })
      })
    }).then(()=>{
      // alert(JSON.stringify(this.state.obj))
      firebase.database().ref("Session/"+this.props.data.sessionId+"/players").update({
        [this.state.counter]:this.state.user
      })
    }).then(()=>{
      firebase.database().ref("Session/"+this.props.data.sessionId).update({
        counter:this.state.counter
      })
    }).then(()=>{
      this.setState({
        i:2
      })
    })
  }
  uploadButton() {

    if (this.state.i == 2) {
      return <Button style={{ marginTop: 80, borderRadius: 5, height: 60 }} danger block
      onPress={()=>{
        //this.cancelGame()
        Actions.Confirm()
        }}>
            <Text style={{ color: 'white',textAlign:'right',fontWeight:'bold',fontSize:16 }}>Cancel</Text>
                        <Icon name='futbol-o' type="FontAwesome" /></Button>
    }
    else if (this.state.i == 1) {
      return <Button style={{ marginTop: 80, borderRadius: 5, height: 60 }} danger block
      onPress={()=>{
        //this.isPresent()
        this.joinGame()
        //Actions.Confirm()
        }}>
            <Text style={{ color: 'white',textAlign:'right',fontWeight:'bold',fontSize:16 }}>I want to Play</Text>
                        <Icon name='futbol-o' type="FontAwesome" /></Button>
    }
  }



  
render(){
return(
      <View style={{padding:10}}>
      <Card >
        <CardItem>
              <Left>
                <Thumbnail source={{uri :this.props.data.userInfo.profile_picture}} />
                <Body>
                  <Text>{this.props.data.sessionId}</Text>
                  <Text note>{this.props.data.location}</Text>
                </Body>
              </Left>
            </CardItem>  
            <CardItem cardBody>
              <Image source={{uri:this.props.data.pic}} style={{height: 200,padding:5, flex: 1}}/>
            </CardItem>
            <CardItem>
             
              <Body>
              <Text style={{textAlign:"center"}}>{this.props.data.description}</Text>  
              </Body>
            </CardItem>
            <CardItem>
            </CardItem>
      </Card>
      {this.uploadButton()}
      {/* <Button style={{ marginTop: 80, borderRadius: 5, height: 60 }} danger block
        onPress={()=>{
          this.isPresent()
       //   this.joinGame()
          Actions.Confirm()
          }}>
              <Text style={{ color: 'white',textAlign:'right',fontWeight:'bold',fontSize:16 }}>I want to Play</Text>
                          <Icon name='futbol-o' type="FontAwesome" /></Button> */}

      </View>
      

);
}
}




