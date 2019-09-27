import { is, curryN, gte } from 'ramda'
import { apiClient } from './ApiClient'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

function fetchProductions() {
  // Simulate an error 50% of the time just for testing purposes
  // if (Math.random() > 0.5) {
  //   return new Promise(function(resolve, reject) {
  //     resolve(null)
  //   })
  // }

  // let number = Math.floor(Math.random() / 0.1) + 1

  return apiClient.get('products').then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }

    return null
  })
}

export const productionsService = {
  fetchProductions,
}
