import React from 'react'
import { Text, View, Button, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SelectedProductionActions from 'App/Stores/SelectedProduction/Actions'
// import Style from './ProductionDetailScreenStyle'

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
    const { id } = this.props.navigation.state.params
    this._fetchProduction(id)
  }

  showArrayItem = (item) => {
    this.props.navigation.navigate('Products')
  }

  render() {
    console.log('sjkdfjksdfkj sdfjksjdkfjsdkfjksdkfskdfjksdjfkjsdfjksdjfk')
    console.log(this.props)
    return (
      <View>
        <Text>To get started, edit App.js</Text>
      </View>
    )
  }

  _fetchProduction(id) {
    this.props.fetchProduction(id)
  }
}

ProductionsScreen.propTypes = {
  production: PropTypes.array,
  productionIsLoading: PropTypes.bool,
  productionErrorMessage: PropTypes.string,
  fetchProduction: PropTypes.func,
  saveProduction: PropTypes.func,
}

const mapStateToProps = (state) => ({
  production: state.selectedProduction.productions,
  productionIsLoading: state.selectedProduction.productionIsLoading,
  productionErrorMessage: state.selectedProduction.productionErrorMessage,
})

// Object {
//   "id": "sjdkfjskdfjsdjkf",
//   "type": "FETCH_PRODUCTION",
// }
const mapDispatchToProps = (dispatch) => ({
  fetchProduction: (id) => dispatch(SelectedProductionActions.fetchProduction(id)),
  saveProduction: (production) => dispatch(SelectedProductionActions.saveProduction(production)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionsScreen)
