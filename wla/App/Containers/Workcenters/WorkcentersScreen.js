import React from 'react'
import { Text, View, ActivityIndicator, ScrollView, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import WorkcentersActions from 'App/Stores/Workcenters/Actions'
import { StyleSheet } from 'react-native'
import { ApplicationStyles, Helpers, Fonts } from 'App/Theme'

class WorkcentersScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Công đoạn sản xuất',
    }
  }
  constructor() {
    super()
  }
  componentDidMount() {
    this._fetchWorkcenters()
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('WorkcenterDetailScreen', { id: item.id, otherParam: item.name })
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.workcentersIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.workcentersErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.workcentersErrorMessage}</Text>
                <Button onPress={() => this._fetchWorkcenters()} title="Refresh" />
              </View>
            ) : (
              <ScrollView>
                {this.props.workcenters.map((item, key) => (
                  <View key={key}>
                    <Button title={item.name} onPress={this.showArrayItem.bind(this, item)} />
                    <Divider style={{ backgroundColor: 'blue', marginBottom: 15 }} />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchWorkcenters() {
    this.props.fetchWorkcenters()
  }
}

WorkcentersScreen.propTypes = {
  workcenters: PropTypes.array,
  workcentersIsLoading: PropTypes.bool,
  workcentersErrorMessage: PropTypes.string,
  fetchWorkcenters: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  workcenters: state.workcentersReducer.workcenters,
  workcentersIsLoading: state.workcentersReducer.workcentersIsLoading,
  workcentersErrorMessage: state.workcentersReducer.workcentersErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkcenters: () => dispatch(WorkcentersActions.fetchWorkcenters()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkcentersScreen)

const Style = StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    margin: 30,
    flex: 1,
  },
  error: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: 'red',
  },
  fillColCenter: {
    ...Helpers.fillColCenter,
    justifyContent: 'space-between',
  },
  result: {
    ...Fonts.style.h3,
    textAlign: 'center',
    marginBottom: 25,
  },
  workcenterContainer: {
    width: '100%',
    height: 60,
    marginBottom: 25,
    backgroundColor: 'whitesmoke',
  },
})
