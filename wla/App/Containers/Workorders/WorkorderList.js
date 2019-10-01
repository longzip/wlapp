import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Card } from 'react-native-elements'
import Style from './WorkorderListStyle'

import Dialog from 'react-native-dialog'

class WorkorderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogVisible: false,
      textInputValue: '',
      item: {},
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            {this.props.workorders.map((item, key) => (
              <TouchableOpacity key={key} onPress={this.showDialog.bind(this, item)}>
                <Card>
                  <Text style={Style.result}>
                    {item.Production.name} / {item.Workcenter.name}
                  </Text>
                  <Text style={Style.productTitle}>{item.Product.name}</Text>
                  <Text style={Style.result}>Kích thước: {item.Production.productDimension} </Text>
                  <Text style={Style.result}>Đơn vị: {item.Production.productUom} </Text>
                  <Text style={Style.result}>
                    Số lượng = {item.Production.productQty}x{item.Production.factor}
                  </Text>
                  <Text style={Style.productQty}>
                    Thực hiện ={this._workcenterProductivitiesNumber(item.WorkcenterProductivities)}{' '}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Ghi nhận số liệu</Dialog.Title>
            <Dialog.Description>
              Bạn đã thực hiện được số lượng bao nhiêu? Nhập vào ô trống.
            </Dialog.Description>
            <Dialog.Input
              underlineColorAndroid="transparent"
              keyboardType={'numeric'}
              style={Style.textInput}
              placeholder="Số lượng"
              onChangeText={(textInputValue) => this.setState({ textInputValue })}
            />
            <Dialog.Button label="Hủy" onPress={this.handleCancel} />
            <Dialog.Button label="Đồng ý" onPress={this.handleDelete} />
          </Dialog.Container>
        </View>
      </View>
    )
  }

  _workcenterProductivitiesNumber(workcenterProductivities) {
    return workcenterProductivities.reduce((acc, item) => acc + item.qtyProduced, 0)
  }

  showDialog = (item) => {
    this.setState({ item })
    this.setState({ dialogVisible: true })
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false })
  }

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    const { id, ProductionId, WorkcenterId, ProductId, productUom } = this.state.item
    const workcenterProductivity = {
      ProductionId,
      WorkorderId: id,
      ProductId,
      WorkcenterId,
      qtyProduced: this.state.textInputValue,
      productUom,
    }
    this.props.saveWorkcenterProductivity(workcenterProductivity)
    this.setState({ dialogVisible: false })
  }
}

WorkorderList.propTypes = {
  workorders: PropTypes.array.isRequired,
  saveWorkcenterProductivity: PropTypes.func,
}

export default WorkorderList
