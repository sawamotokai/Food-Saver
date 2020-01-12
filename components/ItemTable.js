import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import TestItemData from './TestItemData';
import Item from './Item';
import { SwipeListView } from 'react-native-swipe-list-view';
import NewItem from './newItem';


export default class ItemTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			items: TestItemData,
			newItems: this.props.newItems
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
		const NEWITEMS = this.state.newItems.map((item) => <NewItem name = {item}/>)
		return (
			<View>
				<Text>Pre-existing</Text>
			<SwipeListView
				data={ITEMS}
				renderItem={(data, rowMap) => (
					<View>
                    	<Item key={item.id} edit={this.state.edit} item={item} />
                	</View>
				)}
				renderHiddenItem={ (data, rowMap) => (
					<View >
						<Text>edit</Text>
						<Text>delete</Text>
					</View>
				)}
				leftOpenValue={75}
				rightOpenValue={-75}
			/>
				<Text>New</Text>
			<SwipeListView
				data={NEWITEMS}
				renderItem={(data, rowMap) => (
					<View >
                    	<Text>{data.item}</Text>
                	</View>
					// <Item key={item.id} edit={this.state.edit} name={item} />
				)}
				renderHiddenItem={ (data, rowMap) => (
					<View >
						<Text>edit</Text>
						<Text>delete</Text>
					</View>
				)}
				leftOpenValue={75}
				rightOpenValue={-75}
			/>
			</View>
		)
	}
	// return (
	// 	<View className={this.state.edit ? 'TableEdit' : 'NoTableEdit'}>
	// 		<Text>Name Expiry Date </Text>
	// 		{ITEMS}
	// 	</View>
	// );
	
}