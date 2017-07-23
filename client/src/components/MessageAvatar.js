import React from 'react';
import { View, Text, Image } from 'react-native';
import Touchable from '@appandflow/touchable';

const _getAvatar = (name) => {
  switch (name) {
    case 'Error':
      return (
        <View style={{ height: 33, width: 33,  backgroundColor :'blue' }} />
      )
    default:
      return (
        <View style={{ backgroundColor: 'rgba(100,100,150,0.5)', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFF' }}>{ name.substr(0,2).toUpperCase() }</Text>
        </View>
      )
  }
}

const Avatar = ({ name }) => (
  <View style={{ width: 50, alignItems: 'center' }}>
    { _getAvatar(name) }
  </View>
);

export default Avatar;