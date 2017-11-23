
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MeProfileLabel } from './Shared.js';

export default class MainFlow extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>Welcome to <MeProfileLabel />,</Text>
	<Text style={styles.slideText}>Just wait now...</Text>
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
  slideText: {
    marginLeft: 50,
    marginRight: 50,
    fontSize: 20,
    lineHeight: 30,
  },
});
