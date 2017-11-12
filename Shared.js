
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export function MeProfileLabel() {
  return (
    <Text style={{fontWeight: 'bold'}}>MeProfile</Text>    
  );
}

export function Hr() {
  return (
    <View
      style={{
	borderBottomColor: 'black',
	borderBottomWidth: 1,
	marginLeft: 25,
	marginRight: 25,
	paddingTop: 10,
	paddingBottom: 10,
      }}/>	  
  );
}
