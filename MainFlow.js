
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MeProfileLabel } from './Shared.js';
import CustomMultiPicker from "./multipleSelect.js";

export default class MainFlow extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    //return (<ReadyToSampleScreen />);
    //return (<WaitScreen />);
    return (<SurveyScreen />);
  }
}

const userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin"
};

class SurveyScreen extends Component {
  render() {
    return (
      <View style={styles.slide2}>
	<CustomMultiPicker
	  options={userList}
	  search={true} // should show search bar?
	  multiple={true} //
	  placeholder={"Search"}
	  placeholderTextColor={'#757575'}
	  returnValue={"label"} // label or value
	  callback={(res)=>{ console.log(res); }} // callback, array of selected items
	  rowBackgroundColor={"#eee"}
	  rowHeight={40}
	  rowRadius={5}
	  iconColor={"#00a2dd"}
	  iconSize={30}
	  selectedIconName={"ios-checkmark-circle-outline"}
	  unselectedIconName={"ios-radio-button-off-outline"}
	  scrollViewHeight={260}
	  selected={[1,2]} // list of options which are selected by default
	  />
      </View>
    );
  }
}

class WaitScreen extends Component {
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText2}><MeProfileLabel /> will notify you</Text>
	<Text style={styles.slideText2}>when the next survey is ready.</Text>
	<View style={{marginTop: 30}}/>
	<Text style={styles.slideText2}>Nothing to do for now!</Text>
      </View>
    );
  }
}

class ReadyToSampleScreen extends Component {
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>A survey is ready!</Text>
	<View style={{marginTop: 30, marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    onPress={()=>{}}
	    title="Start survey"
	    color="blue" />
	</View>
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
    paddingTop: 30,
  },
  slideText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
  },
  slideText2: {
    marginLeft: 50,
    marginRight: 50,
    fontSize: 20,
    lineHeight: 30,
  },
});
