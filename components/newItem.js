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


export default class NewItem extends React.Component {
	constructor(props) {
		super(props);
		const year = new Date().getFullYear();
		const month = new Date().getMonth() + 1; //Current Month
		const date = new Date().getDate(); //Current Date
		this.state = {
			name: this.props.name,
	
			//edit should be solely determined from ItemTable state
			//keep consistent
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
			return 'item_red';
		}
		if (diff <= 3) {
			return 'item_yellow';
		} else {
			return 'item_green';
		}
	}

	render() {
		return (
			<View style = {item}>
                <Text>{this.state.name}</Text>
            </View>
		);
        //item style will be dependent on how close expiry date is to current date. 
        const styles = StyleSheet.create({
            item: {
                display: inline
            },
            item_red: {
                display: inline,
                backgroundColor: "red"
            },
            item_yellow:{
                display: inline,
                backgroundColor: "yellow"
            },
            item_green:{
                display: inline,
                backgroundColor: "green"
            }
        })
    }
}

