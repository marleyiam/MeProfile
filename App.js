
import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import LoginScreen from './LoginScreen.js';
import { MeProfileLabel, firebaseApp } from './Shared.js';
import MainFlow from './MainFlow.js';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NavigatorIOS
        initialRoute={{
          component: NavigatorManager,
	  navigationBarHidden: true,
	  title: 'Loading',
        }}
        style={{flex: 1}}
	/>
    );
  }
}

class NavigatorManager extends Component {
  constructor(props) {
    super(props);
    this.initializing = true;
  }
  
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
	// User is signed in.
	const route = {
	  component: MainFlow,
	  navigationBarHidden: true,
	  title: 'MainFlow',
	};
	if(this.initializing) {
	  this.props.navigator.resetTo(route);
	} else {
	  this.props.navigator.push(route);
	}
      } else {
	// No user is signed in.
	this.props.navigator.resetTo({
	  component: IntroFlow,
	  navigationBarHidden: true,
	  title: 'Intro',
	});
      }
      this.initializing = false;
    });
  }

  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText2}>Loading...</Text>
	</View>
    );
  }
}

class IntroFlow extends Component {
  constructor(props) {
    super(props);
  }

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
	<LoginScreen />
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
  slideText2: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
  },
});
