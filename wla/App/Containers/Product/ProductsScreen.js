import React, { Component } from 'react'
import { Platform, Text, View, Button, ActivityIndicator,AsyncStorage, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'


export class ProductsScreen extends Component {
    render() {
        return (
            <View>
                <Text>To get started, edit App.js</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

  })
  
  const mapDispatchToProps = (dispatch) => ({
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductsScreen)
