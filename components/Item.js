import React from 'react';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert,
  } from 'react-native';


export default class Item extends React.Component {
	constructor(props) {
		super(props);
		const year = new Date().getFullYear();
		const month = new Date().getMonth() + 1; //Current Month
		const date = new Date().getDate(); //Current Date
		this.state = {
			id: this.props.item.id,
			name: this.props.item.name,
			edit: this.props.edit,
			//edit should be solely determined from ItemTable state
			//keep consistent
			expiryDate: this.props.item.date
			//Assume it is a date object.
			//have to add logic to determine actual expiry Date
			//based on backend retrieve info and identifying what to
			//classify based on name
		};
		this.DiffinDays = this.DiffinDays.bind(this);
	}

	DiffinDays() {
		const one_day = 1000 * 60 * 60 * 24;
		const now = new Date(Date.now());
		const now_ms = now.getTime();
		const exp_ms = this.state.expiryDate.getTime();
		var diff = exp_ms - now_ms;
		return Math.round(diff / one_day);
	}

	// 0 < x <= 1 red
	// 1 < x <= 3 yellow
	// 3 < x green
	CalcStyle() {
		const diff = this.DiffinDays();
		if (diff <= 1) {
			return {
        display: inline,
        backgroundColor: "red"
      }
		}
		if (diff <= 3) {
			return {
        display: inline,
        backgroundColor: "yellow"
      }
		} else {
        return {
          display: inline,
          backgroundColor: "green"
      }
		}
	}

	render() {
		return (
			<View style={this.CalcStyle}>
				<Text>{this.state.name}</Text>
				<Text>{this.state.expiryDate.toLocaleString()}</Text>
			</View>
		);
}
};

