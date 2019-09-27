import React from 'react'
import {
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
  AsyncStorage,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ProductionsActions from 'App/Stores/Productions/Actions'
import Style from './ProductionsScreenStyle'
import { Images } from 'App/Theme'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class ProductionsScreen extends React.Component {
  constructor() {
    super()

    this.tmpArray = [
      { name: 'Pankaj', age: 10, class: 'M.C.A' },
      { name: 'Rita', age: 11, class: 'B.C.A' },
      { name: 'Mohan', age: 12, class: 'M.C.A' },
      { name: 'Amit', age: 13, class: 'M.C.A' },
      { name: 'Babulal', age: 14, class: 'B.TECH' },
      { name: 'Mohit', age: 15, class: 'B.C.A' },
      { name: 'Amit', age: 16, class: 'B.C.A' },
      { name: 'Ramkishan', age: 17, class: 'B.C.A' },
      { name: 'Gopal', age: 18, class: 'B.C.A' },
      { name: 'Jogesh', age: 19, class: 'B.C.A' },
      { name: 'Yogesh', age: 20, class: 'B.C.A' },
    ]
  }
  componentDidMount() {
    // this._fetchProductions()
  }

  showArrayItem = (item) => {
    Alert.alert(item)
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.productionsIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {this.props.productionsErrorMessage ? (
              <Text style={Style.error}>{this.props.productionsErrorMessage}</Text>
            ) : (
              <View>
                <ScrollView>
                  {this.tmpArray.map((item, key) => (
                    <TouchableOpacity key={key} onPress={this.showArrayItem.bind(this, item.name)}>
                      <Text style={Style.result}> Name = {item.name} </Text>

                      <Text style={Style.result}> Age = {item.age} </Text>

                      <Text style={Style.result}> Class = {item.class} </Text>

                      <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* <Text style={Style.result}>
                  {"I'm a fake user, my name is fd"}
                  {this.props.user.name}
                </Text>
                <Text style={Style.result}>
                  {this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe."}
                </Text> */}
              </View>
            )}
            <Button onPress={() => this._fetchProductions()} title="Refresh" />

            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
          </View>
        )}
      </View>
    )
  }

  _fetchProductions() {
    this.props.fetchProductions()
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }
}

ProductionsScreen.propTypes = {
  productions: PropTypes.array,
  productionsIsLoading: PropTypes.bool,
  productionsErrorMessage: PropTypes.string,
  fetchProductions: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  productions: state.productions.productions,
  productionsIsLoading: state.productions.productionsIsLoading,
  productionsErrorMessage: state.productions.productionsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductions: () => dispatch(ProductionsActions.fetchProductions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionsScreen)
