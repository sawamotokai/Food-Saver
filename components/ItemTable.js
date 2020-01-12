import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import TestItemData from './TestItemData'

export default class ItemTable extends React.Component{
    constructor(){
        super();
        state = {
            edit: false,
            Items: ItemArray
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    render(){
        const Items = this.state.Items.map(item => 
            <Item 
                key={item.id} 
                edit = {this.state.edit} 
                item = {item}
            />)
        return(
            <View className = {this.state.edit ? "TableEdit" : "NoTableEdit"}>
                <Text>Name     |     Expiry Date </Text>
                {Items}
            </View>
        )
        
    }
}