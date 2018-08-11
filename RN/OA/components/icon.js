'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Navigator,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {

    render() {
        return (
            <Icon name={'md-home'}size={30}color={'#3e9ce9'}/>
            );
    }
}
