import React from 'react'
import { Text, View, Button, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SelectedProductionActions from 'App/Stores/SelectedProduction/Actions'
import RoutingWorkcentersAction from 'App/Stores/RoutingWorkcenters/Actions'
// import Style from './ProductionDetailScreenStyle.js'
import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

class ProductionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Lệnh sản xuất',
    }
  }
  constructor() {
    super()
  }
  componentDidMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
      const { id } = this.props.navigation.state.params
      this._fetchProduction(id)
    }
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('Products')
  }

  render() {
    console.log('sjkdfjksdfkj sdfjksjdkfjsdkfjksdkfskdfjksdjfkjsdfjksdjfk')
    console.log(this.props)
    return (
      <View style={Style.container}>
        {this.props.productionIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.productionErrorMessage ? (
              <View>
                <Text style={Style.error}>{this.props.productionErrorMessage}</Text>
                <Button
                  onPress={() => this._fetchProduction(this.props.navigation.state.params.id)}
                  title="Refresh"
                />
              </View>
            ) : (
              <View>
                <Text>Số: {this.props.production.name}</Text>
                {this.props.workorders ? (
                  <View></View>
                ) : (
                  <Button
                    onPress={() => this._fetchProductionTodo(this.props.navigation.state.params.id)}
                    title="Tạo lệnh làm việc"
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

  _fetchProduction(id) {
    this.props.fetchProduction(id)
  }
  _fetchProductionTodo(id) {
    this.props.fetchProductionTodo(id)
  }
}

ProductionsScreen.propTypes = {
  production: PropTypes.object,
  productionIsLoading: PropTypes.bool,
  productionErrorMessage: PropTypes.string,
  fetchProduction: PropTypes.func,
  saveProduction: PropTypes.func,
}

const mapStateToProps = (state) => ({
  production: state.selectedProductionReducer.production,
  productionIsLoading: state.selectedProductionReducer.productionIsLoading,
  productionErrorMessage: state.selectedProductionReducer.productionErrorMessage,
  //RoutingWorkcenter
  routingWorkcenters: state.routingWorkcentersReducer.routingWorkcenters,
  routingWorkcentersIsLoading: state.routingWorkcentersReducer.routingWorkcentersIsLoading,
  routingWorkcentersErrorMessage: state.routingWorkcentersReducer.routingWorkcentersErrorMessage,
  //Workorder
})

// Object {
//   "id": "sjdkfjskdfjsdjkf",
//   "type": "FETCH_PRODUCTION",
// }
const mapDispatchToProps = (dispatch) => ({
  fetchProduction: (id) => dispatch(SelectedProductionActions.fetchProduction(id)),
  fetchProductionTodo: (id) => dispatch(SelectedProductionActions.fetchProductionTodo(id)),
  fetchRoutingWorkcenters: (routingId) =>
    dispatch(RoutingWorkcentersAction.fetchRoutingWorkcenters(routingId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionsScreen)

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
})
