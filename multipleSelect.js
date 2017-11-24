/**
 * Multiple select list with search
 * ataomega@gmail.com
 * www.atasmohammadi.net
 * version 1.0
 */
import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomMultiPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      searchText: null,
      selected: [],
      options: this.props.options,
    };
  }

  componentDidMount = () => {
    const selected = this.props.selected;
    if(typeof selected === "object"){
      selected.map(select => {
        this._onSelect(select);
      });
    } else {
      this._onSelect(selected);
    }
  }

  getNewDimensions(event){
    var pageHeight = event.nativeEvent.layout.height;
    var pageWidth = event.nativeEvent.layout.width;
    this.setState({
      pageHeight, pageWidth
    });
    }

  _onSelect = (item) => {
    var selected = this.state.selected;
    if(this.props.multiple){
      if(selected.indexOf(item) == -1){
        selected.push(item);
        this.setState({
          selected: selected
        });
      } else {
        selected = selected.filter(i => i != item);
        this.setState({
          selected: selected
        });
      }
    } else {
      if(selected.indexOf(item) == -1){
        selected = [item];
        this.setState({
          selected: selected
        });
      } else {
        selected = [];
        this.setState({
          selected: selected
        });
      }
    }
    this.props.callback(selected);
  }

  _onSearch = (text) => {
    this.setState({
      searchText: text.length > 0 ? text.toLowerCase() : null
    });
  }

  _isSelected = (item) => {
    const selected = this.state.selected;
    if(selected.indexOf(item) == -1){
      return false;
    }
    return true;
  }

  filterObjectByValue = (obj, predicate) => {
    return Object.keys(obj)
      .filter( key => predicate(obj[key]) )
      .reduce( (res, key) => (res[key] = obj[key], res), {} );
  }

  addOption = () => {
    if(this.state.searchText) {
      let options = this.state.options;
      options[this.state.searchText] = this.state.searchText;
      this.setState({
	options: options,
	searchText: null
      });
      this.props.tagAdded(this.state.searchText);
    }
  }

  render(){
    const { returnValue } = this.props;
    const { options } = this.state;
    const list = this.state.searchText ? this.filterObjectByValue(options, option => option.toLowerCase().includes(this.state.searchText)) : options;
    const labels = Object.keys(list).map(i => list[i]);
    const values = Object.keys(list);
    return(
      <View onLayout={(evt)=>{this.getNewDimensions(evt);}} style={{flex: 1}}>
        {this.props.search && <View style={{ flexDirection: 'row', height: 55 }}>
            <View style={{ marginTop: 15, marginLeft: 15, backgroundColor: 'transparent' }}>
		<Icon name="ios-search-outline" color={this.props.iconColor} size={25}/>
              </View>
              <TextInput
		  style={{
		    width: this.state.pageWidth-75,
		    height: 35,
		    margin: 0,
		    marginTop: 10,
		    marginLeft: -25,
		    padding: 5,
		    paddingLeft: 30,
		    borderColor: this.props.iconColor,
		    borderWidth: 1,
		    borderRadius: 5
		  }}
		  autoCapitalize={'none'}
		  autoCorrect={false}
		  onChangeText={(text) => { this._onSearch(text); }}
		  value={this.state.searchText}
		  clearButtonMode={'always'}
		  placeholder={this.props.placeholder}
		  placeholderTextColor={this.props.placeholderTextColor}
		  underlineColorAndroid={'transparent'}
		  />
		  <View style={{ backgroundColor: 'lightgrey', width: 55, marginLeft: 5, height: 35, marginTop: 10, justifyContent: 'center' }}>
		      <Button
			  title="Add"
			  color="blue"
			  onPress={this.addOption}/>
		    </View>
        </View>}
        <ScrollView
          style={{ padding: 5, flex: 1  }}
	  automaticallyAdjustContentInsets={false}
          >
          {labels.map((label, index) => {
            const itemKey = returnValue == "label" ? label : values[index];
            return(
              <TouchableOpacity
                key={Math.round(Math.random() * 1000000)}
                style={{
                  padding: 7,
                  marginTop: 0,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: 6,
                  backgroundColor: this.props.rowBackgroundColor,
                  height: this.props.rowHeight,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: this.props.rowRadius
                }}
                onPress={() => {
                  this._onSelect(itemKey);
                }}
		>
                <Text>{label}</Text>
                {

                  this._isSelected(itemKey) ?
                    <Icon name={this.props.selectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                      :
                      <Icon name={this.props.unselectedIconName} color={this.props.iconColor} size={this.props.iconSize} />
                      }
              </TouchableOpacity>
            );
          })}
      </ScrollView>
	</View>
    );
  }
}
