
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';

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
const db = firebase.firestore();

export function save(tags, selectedTags) {
  const x = new Date();
  const uid = firebaseApp.auth().currentUser.uid;
  const p1 = db.collection('tags').doc(uid).set({tags});
  const p2 = db.collection('samples').doc('' + x.getTime()).set({
      uid: uid,
      sample: selectedTags,
  });
  return Promise.all([p1, p2]);
}

export function getTags(cb, err) {
  const uid = firebaseApp.auth().currentUser.uid;
  return db.collection('tags').doc(uid).get();
}
