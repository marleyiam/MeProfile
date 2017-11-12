
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MeProfileLabel, Hr } from './Shared.js';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>Login to <MeProfileLabel /></Text>
	<TextInput
          style={styles.slideInput}
          placeholder={"E-mail"}
	  autoCapitalize={'none'}/>
	<TextInput
          style={styles.slideInput}
          placeholder={"Password"}
	  autoCapitalize={'none'}
	  secureTextEntry={true}/>
	<View style={{marginTop: 25, marginLeft: 50, marginRight: 50, backgroundColor: 'lightgrey'}}>
	  <Button
	    onPress={(_)=>{}}
	    title="Sign in"
	    color="blue" />
	</View>
	<View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
	  <Button
	    onPress={(_)=>{}}
	    title="Sign up"
	    color="grey" />
	  <View style={{width: 40 }} />
	  <Button
	    onPress={(_)=>{}}
	    title="Forgot"
	    color="grey" />
	</View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  slideText: {
    marginLeft: 50,
    marginRight: 50,
    fontSize: 20,
    lineHeight: 30,
  },
  slideInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  }
});
