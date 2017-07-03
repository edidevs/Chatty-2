import { _ } from 'lodash';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Text
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import randomColor from 'randomcolor';

import { graphql, compose } from 'react-apollo';
import { GROUP_QUERY } from '../../graphql/groupQuery';

class Message extends PureComponent {
  render() {
   const message = { ...this.props.data.item};
   const isCurrentUser = message.from.id === 1;
    return (
      <View key={message.id} style={styles.container}>
        {isCurrentUser ? <View style={styles.messageSpacer} /> : undefined }
        <View
          style={[styles.message, isCurrentUser && styles.myMessage]}
        >
          <Text
            style={[
              styles.messageUsername,
              
            ]}
          >{message.from.username}</Text>
          <Text>{message.text}</Text>
          <Text style={styles.messageTime}>{moment(message.createdAt).format('h:mm A')}</Text>
        </View>
        {!isCurrentUser ? <View style={styles.messageSpacer} /> : undefined }
      </View>
    );
  }
}


class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.title,
    };
  };
  keyExtractor = item => item.id;
  renderItem = (item) => (
   <Message data={item} />
  )

  render() {
    // render list of messages for group
    return (
      <View style={styles.container}>
        <FlatList
          data={!this.props.loading && this.props.group.messages}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />

        { this.props.loading ? <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: Dimensions.get('window').height/2 - 100 }} /> : null }
      </View>
    );
  }
}

const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.id,
    },
  }),
  props: ({ data: { loading, group } }) => ({
    loading, group,
  }),
});

 const componentWithData = compose(
    groupQuery
  )(Messages)

export default componentWithData;


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
  },
  message: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
    },
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
  },
  messageUsername: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  messageTime: {
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right',
  },
  messageSpacer: {
    flex: 0.2,
  },
});