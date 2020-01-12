import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import TestItemData from './TestItemData';
import Item from './Item';

export default class ItemTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			items: TestItemData
		};
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		this.saveData();
		this.loadData();
	}

	saveData() {
		let data = {
			items: [ ...this.state.items ]
		};
		AsyncStorage.setItem('user', JSON.stringify(data));
	}

	loadData = async () => {
		try {
			let user = await AsyncStorage.getItem('user');
			this.setState({ items: [ ...JSON.parse(user) ] });
			alert(JSON.parse(user)[0].name);
		} catch (error) {
			throw error;
		}
	};

	handleEdit() {}

	render() {
		const ITEMS = this.state.items.map((item) => <Item key={item.id} edit={this.state.edit} item={item} />);
		return (
			<View className={this.state.edit ? 'TableEdit' : 'NoTableEdit'}>
				<Text>Name Expiry Date </Text>
				{ITEMS}
			</View>
		);
	}
}