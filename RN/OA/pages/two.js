import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';
export default class two extends Component {

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    消息
                </Text>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
