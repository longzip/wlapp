import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import WorkordersActions from 'App/Stores/Workorders/Actions'
import WorkcenterProductivitiesActions from 'App/Stores/WorkcenterProductivities/Actions'
import Style from './WorkordersScreenStyle'
import WorkorderList from './WorkorderList'
import { Button, ThemeProvider } from 'react-native-elements'

class WorkordersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Lệnh làm việc',
    }
  }
  constructor() {
    super()
    this._saveWorkcenterProductivity = this._saveWorkcenterProductivity.bind(this)
  }
  componentDidMount() {
    this._fetchWorkorders()
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('ProductionDetailScreen', { id: item.id })
  }

  render() {
    return (
      <ThemeProvider>
        <View style={Style.container}>
          {this.props.workordersIsLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              {this.props.workordersErrorMessage ? (
                <View>
                  <Text style={Style.error}>{this.props.workordersErrorMessage}</Text>
                  <Button onPress={() => this._fetchWorkorders()} title="Refresh" />
                </View>
              ) : (
                <WorkorderList
                  workorders={this.props.workorders}
                  saveWorkcenterProductivity={this._saveWorkcenterProductivity}
                />
              )}
            </View>
          )}
        </View>
      </ThemeProvider>
    )
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders()
  }

  _saveWorkcenterProductivity(workcenterProductivityBeingAddedOrEdited) {
    this.props.saveWorkcenterProductivity(workcenterProductivityBeingAddedOrEdited)
    this._fetchWorkorders()
  }
}

WorkordersScreen.propTypes = {
  workorders: PropTypes.array,
  workordersIsLoading: PropTypes.bool,
  workordersErrorMessage: PropTypes.string,
  fetchWorkorders: PropTypes.func,
}

const mapStateToProps = (state) => ({
  workorders: state.workordersReducer.workorders,
  workordersIsLoading: state.workordersReducer.workordersIsLoading,
  workordersErrorMessage: state.workordersReducer.workordersErrorMessage,
  workcenterProductivitiesSuccessMessage:
    state.workcenterProductivitiesReducer.workcenterProductivitiesSuccessMessage,
  workcenterProductivitiesIsLoading:
    state.workcenterProductivitiesReducer.workcenterProductivitiesIsLoading,
  workcenterProductivitiesErrorMessage:
    state.workcenterProductivitiesReducer.workcenterProductivitiesErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
  saveWorkcenterProductivity: (workcenterProductivityBeingAddedOrEdited) =>
    dispatch(
      WorkcenterProductivitiesActions.saveWorkcenterProductivity(
        workcenterProductivityBeingAddedOrEdited
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkordersScreen)
