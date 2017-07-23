import React from 'react';
import { View, Text, Dimensions, Platform, Image } from 'react-native';
import Avatar from './MessageAvatar';

const WIDTH = Dimensions.get('window').width;
const ME = 1;

const MessageItem = ({ item }) => (
  <View style={{  marginBottom: 10, alignItems: item.from.id === ME ? 'flex-end' : 'flex-start' }}>
    <View style={{ flexDirection: 'row', flex: 1 }}>

      { item.from.id !== ME ? <Avatar name={item.from.username} /> : null }

      <View style={{ backgroundColor: item.username === 'Error' ? '#ffecaa' : 'rgba(100,140,100,0.1)', maxWidth: WIDTH - 120, borderRadius: 5, padding: 10 }}>
        <Text style={{ fontWeight: Platform.OS === 'ios' ? '500' : '400', textAlign: item.from.id !== ME ? 'left' : 'right' }}>{ item.text }</Text>
          { item.imageSource ? <Image
          style={{ width: 100, height: 100, borderRadius: 3, marginTop: 10, alignSelf: item.from.id === ME ? 'flex-end' : 'flex-start' }}
          source={item.imageSource}
        /> : null }
      </View>

      { item.from.id === ME ? <Avatar name={'me'} /> : null }
      
    </View>
  </View>
);

export default MessageItem;