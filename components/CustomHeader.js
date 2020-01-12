import React from 'react'
import {
    Image,
    Platform,
ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import {Header } from 'react-native-elements'
import SearchBar from 'react-native-search-bar'

export default class CustomHeader extends React.Component{

    constructor(){
        super()
        this.state = {
            search: ''
        }
    }

    updateSearch(event){
            
    }

    render(){
        return(
            <Header>
                <Button>

                </Button>
                <SearchBar
                    ref="searchBar"
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    onSearchButtonPress={...}
                    onCancelButtonPress={...}
                />
                <Button>

                </Button>
            </Header>
        )
    }
}