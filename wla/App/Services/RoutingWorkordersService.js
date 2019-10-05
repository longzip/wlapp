import { is, curryN, gte } from 'ramda'
import { apiClient } from './ApiClient'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

function fetchRoutingWorkorders() {
  return apiClient.get('workorders').then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

function fetchRoutingWorkorder(id) {
  return apiClient.get(`routingWorkorders/${id}`).then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

function saveRoutingWorkorder(routingWorkorder) {
  if (routingWorkorder.id)
    return apiClient.put(`routingWorkorders/${routingWorkorder.id}`).then((response) => {
      if (in200s(response.status)) {
        return response.data.result
      }
      return null
    })

  return apiClient.post('routingWorkorders', routingWorkorder).then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

export const routingWorkordersService = {
  fetchRoutingWorkorders,
  fetchRoutingWorkorder,
  saveRoutingWorkorder,
}
