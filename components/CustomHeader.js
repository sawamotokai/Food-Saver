import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import SearchBar from 'react-native-search-bar';

export default class CustomHeader extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onClick() {
		this.props.onEditClick();
	}

	render() {
		return (
			<Header>
				<Button title="Camera" />
				<Button onPress={this.onClick()} title="Edit" />
			</Header>
		);
	}
}
