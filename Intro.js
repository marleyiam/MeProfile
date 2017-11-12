
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

function MeProfileLabel() {
  return (
    <Text style={{fontWeight: 'bold'}}>MeProfile</Text>    
  );
}

export default class Intro extends Component {
  render() {
    return (
      <Swiper loop={false}>
	<View style={styles.slide}>
	  <Text style={styles.slideText}>Welcome to <MeProfileLabel />,</Text>
	  <Text style={styles.slideText}>a statistical profiler for your life.</Text>
	</View>
	<View style={styles.slide}>
	  <Text style={styles.slideText}>
	    <MeProfileLabel /> randomly asks you what you're doing.
	  </Text>
	  <View style={{paddingTop: 20}}/>
	  <Text style={[styles.slideText, {fontStyle: 'italic'}]}>
	    After a few samples, it tells you how you spend your time.
	  </Text>
	</View>
	<View style={styles.slide}>
	  <Text style={styles.slideText}>Stay tuned...</Text>
	</View>
      </Swiper>
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