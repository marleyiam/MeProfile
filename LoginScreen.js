
import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { firebaseApp, MeProfileLabel, Hr } from './Shared.js';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  
  render() {
    return(
      <NavigatorIOS
        initialRoute={{
          component: Login,
	  navigationBarHidden: true,
	  title: 'Login',
	  passProps: {onLogin: this.props.onLogin}
        }}
        style={{flex: 1}}
	/>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSignin = this.onSignin.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onForgot = this.onForgot.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSignin() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
      this.props.onLogin(user);
    }).catch((err)=>{
      this.setState({error: err.message});
    });
  }

  onSignup() {
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
      this.props.navigator.push({
        component: GoodSignup,
        navigationBarHidden: true,
        title: 'Good Signup',
	passProps: {user: user, onLogin: this.props.onLogin }
      });
    }).catch((err)=>{
      this.setState({error: err.message});
    });
  }

  onForgot() {
    this.props.navigator.push({
      component: Forgot,
      navigationBarHidden: true,
      title: 'Forgot password'
    });
  }

  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>Login to <MeProfileLabel /></Text>
	<TextInput
          style={styles.slideInput}
          placeholder={"E-mail"}
	  autoCapitalize={'none'}
	  onChangeText={(txt)=>this.setState({email: txt})}/>
	<TextInput
          style={styles.slideInput}
          placeholder={"Password"}
	  autoCapitalize={'none'}
	  secureTextEntry={true}
	  onChangeText={(txt)=>this.setState({password: txt})}/>
	<Text style={{marginLeft: 50, marginRight: 50, marginTop: 20, color: 'red'}}>{this.state.error}</Text>
	<View style={{marginTop: 15, marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    onPress={this.onSignin}
	    title="Sign in"
	    color="blue" />
	</View>
	<View style={{marginTop: 25, marginLeft: 105, marginRight: 105, borderColor: 'lightgrey', borderWidth: 2}}>
	  <Button
	    onPress={this.onSignup}
	    title="Sign up"
	    color="blue" />
	</View>
	<View style={{marginTop: 15 }} />
	<Button
	  onPress={this.onForgot}
	  title="Forgot password"
	  color="grey" />
      </View>
    );
  }
};

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', error: '' };
    this.onCancel = this.onCancel.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(()=>{
      this.props.navigator.push({
        component: GoodReset,
        navigationBarHidden: true,
        title: 'Good Reset',
      });
    }).catch((err)=>{
      this.setState({error: err.message});
    });
  }

  onCancel() {
    this.props.navigator.pop();
  }
  
  render() {
    return (
      <View style={styles.slide}>
	<Text style={styles.slideText}>Reset password</Text>
	<TextInput
          style={styles.slideInput}
          placeholder={"E-mail"}
	  autoCapitalize={'none'}
	  onChangeText={(txt)=>this.setState({email: txt})}/>
	<Text style={{marginLeft: 50, marginRight: 50, marginTop: 20, color: 'red'}}>{this.state.error}</Text>
	<View style={{marginTop: 15, marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    title="Reset password"
	    color="blue"
	    onPress={this.onReset}/>
	</View>
	<View style={{marginTop: 15}}>
	  <Button
	    title="Cancel"
	    color="grey"
	    onPress={this.onCancel} />
	</View>
      </View>
    );
  }
};

class GoodSignup extends Component {
  render() {
    return (
      <View style={styles.slide}>
	<Text style={{marginBottom: 20, textAlign: 'center'}}>Thanks for signing up!</Text>
	<View style={{marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    title="Next"
	    color="blue"
	    onPress={()=>this.props.onLogin(this.props.user)}/>
	</View>
      </View>
    );
  }
}

class GoodReset extends Component {
  constructor(props) {
    super(props);
    this.onSignin = this.onSignin.bind(this);
  }
  
  onSignin() {
    this.props.navigator.popN(2);
  }
  
  render() {
    return (
      <View style={styles.slide}>
	<Text style={{marginLeft: 50, marginRight: 50, marginBottom: 20, textAlign: 'center'}}>Reset email has been sent. Check your inbox.</Text>
	<View style={{marginLeft: 105, marginRight: 105, backgroundColor: 'lightgrey'}}>
	  <Button
	    title="Sign in"
	    color="blue"
	    onPress={this.onSignin}/>
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
