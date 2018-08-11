import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation'
import one from './one'
import two from './two'
import Three from './Three'
import CustTabBarItem from "../components/TabBarItem"
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SimpleApp = TabNavigator({

    Home: {
        screen: one,
        navigationOptions: ({navigation}) => ({
            tabBarVisible: true,
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor})=>(
                <Icon name="md_home" size={30} color="#52C0FE"/>
                /*<CustTabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    selectImage={{uri: 'md_home'}}
                    normalImage={{uri: 'tabbar_home'}}
                />*/
            ),
        })
    },

    Detail: {
        screen: two,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '消息',
            tabBarIcon: ({focused, tintColor})=>(
                <CustTabBarItem
                    tintColor={'#fff'}
                    focused={focused}
                    selectImage={{uri: 'tabbar_licai_select'}}
                    normalImage={{uri: 'tabbar_licai'}}
                />
            ),
        })
    },

    Three: {
        screen: Three,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor})=>(
                <CustTabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    selectImage={{uri: 'tabbar_my_select'}}
                    normalImage={{uri: 'tabbar_my'}}
                />
            ),
        })
    }
},
{
    tabBarPosition:'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    lazy:true,
    swipeEnabled:true,
    showIcon:true,
    animationEnabled:true,
    tabBarOptions:{
        activeTintColor:'red',
        inactiveTintColor:'black',
        style:{backgroundColor:'#ddd',},
        labelStyle: {
            fontSize: 16, // 文字大小
        },
        tabBarIcon: ({focused, tintColor})=>(
            <Icon name="md_home" size={30} color="#52C0FE"/>
            /*<CustTabBarItem
                tintColor={tintColor}
                focused={focused}
                selectImage={{uri: 'md_home'}}
                normalImage={{uri: 'tabbar_home'}}
            />*/
        ),
    }
})

export default SimpleApp
