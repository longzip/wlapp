import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  textInput: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688',
    marginBottom: 10,
  },

  result: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  productTitle: {
    ...Fonts.style.h3,
    textAlign: 'center',
    marginBottom: 5,
  },

  productQty: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: 'green',
  },
})
