
import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MeProfileLabel, firebaseApp } from './Shared.js';
import CustomMultiPicker from "./multipleSelect.js";

export default class MainFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToSample: true,
    };
  }
  
  render() {
    return(
      <NavigatorIOS
        initialRoute={{
          component: this.state.readyToSample ? ReadyToSampleScreen : WaitScreen,
	  title: 'Sampling',
	  leftButtonTitle: 'Logout',
	  onLeftButtonPress: (_) => { firebaseApp.auth().signOut(); },
        }}
        style={{flex: 1}}
	/>
    );
  }
}

class WaitScreen extends Component {
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}><MeProfileLabel /> will notify you</Text>
	<Text style={styles.slideText}>when the next survey is ready.</Text>
	<View style={{marginTop: 30}}/>
	<Text style={styles.slideText}>Nothing to do for now!</Text>
      </View>
    );
  }
}

class ReadyToSampleScreen extends Component {
  constructor(props) {
    super(props);
    this.startSurvey = this.startSurvey.bind(this);
  }
  
  startSurvey() {
    this.props.navigator.push({
      component: SurveyScreen,
      title: 'Survey',
      rightButtonTitle: 'Submit',
      onRightButtonPress: (_) => {},
    });
  }
  
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>A survey is ready!</Text>
	<View style={{marginTop: 30, marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    onPress={this.startSurvey}
	    title="Start survey"
	    color="blue" />
	</View>
      </View>
    );
  }
}

const userList = {
  "1":"Tom",
  "2":"Michael",
  "4":"Christin",
};

class SurveyScreen extends Component {
  constructor(props) {
    super(props);
    this.onTagAdded = this.onTagAdded.bind(this);
  }

  onTagAdded(tag) {
    
  }
  
  render() {
    return (
      <View style={styles.slide2}>
	<CustomMultiPicker
	  options={userList}
	  search={true}
	  multiple={true} //
	  placeholder={"Search"}
	  placeholderTextColor={'#757575'}
	  returnValue={"label"}
	  callback={(res)=>{}}
	  tagAdded={this.onTagAdded}
	  rowBackgroundColor={"#eee"}
	  rowHeight={40}
	  rowRadius={5}
	  iconColor={"#00a2dd"}
	  iconSize={30}
	  selectedIconName={"ios-checkmark-circle-outline"}
	  unselectedIconName={"ios-radio-button-off-outline"}
	  selected={[]}
	  />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    backgroundColor: '#9DD6EB',
    paddingTop: 68,
  },
  slideText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
  },
});
