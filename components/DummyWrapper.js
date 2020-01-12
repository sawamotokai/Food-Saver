import React from 'react'
import CustomHeader from './components/CustomHeader';
import ItemTable from './components/ItemTable';

// this will hold the edit state for both item table and custom header 
// this will implement the method to change the state 
// which will be passed into CustomHeader

export default class DummyWrapper extends React.Component{

    constructor(){
        super()
        this.state = {
            edit:false
        }
    }

    onEditClick(){
        this.setState(prevState => ({edit: !prevState.edit}))
    }

    render(){
        <View>
            <CustomHeader edit = {this.state.edit} onEditClick = {this.onEditClick}>
            </CustomHeader>
            <ItemTable edit = {this.state.edit}>
            </ItemTable>
        </View>
    }
}