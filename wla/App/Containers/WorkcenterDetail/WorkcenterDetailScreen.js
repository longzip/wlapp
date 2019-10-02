import React from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SelectedWorkcenterActions from 'App/Stores/SelectedWorkcenter/Actions'
import WorkcenterProductivitiesActions from 'App/Stores/WorkcenterProductivities/Actions'
import WorkordersActions from 'App/Stores/Workorders/Actions'
import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import { ApplicationStyles } from 'App/Theme'
import WorkorderList from '../Workorders/WorkorderList'
import { makeGetWorkcenterWorkorders } from '../../Stores/Selectors'

class WorkcenterDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.otherParam : 'Công đoạn sản xuất',
    }
  }
  constructor() {
    super()
    this._saveWorkcenterProductivity = this._saveWorkcenterProductivity.bind(this)
  }
  componentDidMount() {
    this._fetchWorkcenter()
    this._fetchWorkorders()
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.workcenterIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.workcenterErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.workcenterErrorMessage}</Text>
                <Button onPress={() => this._fetchWorkcenter()} title="Refresh" />
              </View>
            ) : (
              <View>
                <WorkorderList
                  workorders={this.props.workorders}
                  saveWorkcenterProductivity={this._saveWorkcenterProductivity}
                />
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchWorkcenter() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
      const { id } = this.props.navigation.state.params
      this.props.fetchWorkcenter(id)
    }
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders()
  }
  _saveWorkcenterProductivity(workcenterProductivityBeingAddedOrEdited) {
    this.props.saveWorkcenterProductivity(workcenterProductivityBeingAddedOrEdited)
    this._fetchWorkorders()
  }
}

WorkcenterDetailScreen.propTypes = {
  workcenter: PropTypes.object,
  workcenterIsLoading: PropTypes.bool,
  workcenterErrorMessage: PropTypes.string,
  fetchWorkcenter: PropTypes.func,
}

const makeMapStateToProps = () => {
  const getWorkcenterWorkorders = makeGetWorkcenterWorkorders()
  const mapStateToProps = (state, props) => {
    return {
      workcenter: state.selectedWorkcenterReducer.workcenter,
      workcenterIsLoading: state.selectedWorkcenterReducer.workcenterIsLoading,
      workcenterErrorMessage: state.selectedWorkcenterReducer.workcenterErrorMessage,
      workorders: getWorkcenterWorkorders(state, props),
      workordersIsLoading: state.workordersReducer.workordersIsLoading,
      workordersErrorMessage: state.workordersReducer.workordersErrorMessage,
      //
      workcenterProductivitiesSuccessMessage:
        state.workcenterProductivitiesReducer.workcenterProductivitiesSuccessMessage,
      workcenterProductivitiesIsLoading:
        state.workcenterProductivitiesReducer.workcenterProductivitiesIsLoading,
      workcenterProductivitiesErrorMessage:
        state.workcenterProductivitiesReducer.workcenterProductivitiesErrorMessage,
    }
  }
  return mapStateToProps
}

const mapStateToProps = (state, props) => ({})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkcenter: (id) => dispatch(SelectedWorkcenterActions.fetchWorkcenter(id)),
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
  saveWorkcenterProductivity: (workcenterProductivityBeingAddedOrEdited) =>
    dispatch(
      WorkcenterProductivitiesActions.saveWorkcenterProductivity(
        workcenterProductivityBeingAddedOrEdited
      )
    ),
})

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(WorkcenterDetailScreen)

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
  result: {
    ...Fonts.style.h1,
    textAlign: 'center',
    marginBottom: 5,
  },
})
