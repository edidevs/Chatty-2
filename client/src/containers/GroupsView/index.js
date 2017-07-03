import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../../graphql/userQuery';


class Group extends Component {
  render() {
    const { id, name } = this.props.group;
    return (
      <TouchableHighlight
        key={id}
        onPress={() => this.props.goToMessages(this.props.group)}
      >
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>{`${name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class Groups extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  goToMessages = ({ name, id }) => this.props.navigation.navigate('Messages', { title: name, id });
  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Group goToMessages={this.goToMessages} group={item} />;
  render() {
    // render list of groups for user
    return (
      <View style={styles.container}>
        <FlatList
          data={!this.props.loading && this.props.user.groups}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        { this.props.loading ? <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: Dimensions.get('window').height/2 - 100 }} /> : null }
        
      </View>
    );
  }
}

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 3 } }),
  props: ({ data: { loading, user } }) => ({
    loading, user,
  }),
});

const componentWithData = compose(
  userQuery,
  // .. other queries
//   connect(mapStateToProps, mapDispatchToProps), // redux
)(Groups);

Group.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});

export default componentWithData;