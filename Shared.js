
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';

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

const firebaseConfig = {
  apiKey: "AIzaSyDtQoBsQRPK_8b4cBDLHDyJcTrH85RqZJw",
  authDomain: "meprofile-b5785.firebaseapp.com",
  databaseURL: "https://meprofile-b5785.firebaseio.com",
  projectId: "meprofile-b5785",
  storageBucket: "meprofile-b5785.appspot.com",
  messagingSenderId: "133459696829"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
