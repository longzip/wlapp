import { is, curryN, gte } from 'ramda'
import { apiClient } from './ApiClient'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

function fetchProductions() {
  return apiClient.get('productions').then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

function fetchProduction(id) {
  return apiClient.get(`productions/${id}`).then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

function saveProduction(production) {
  if (production.id)
    return apiClient.put(`productions/${production.id}`).then((response) => {
      if (in200s(response.status)) {
        return response.data.result
      }
      return null
    })

  return apiClient.post('productions', production).then((response) => {
    if (in200s(response.status)) {
      return response.data.result
    }
    return null
  })
}

export const productionsService = {
  fetchProductions,
  fetchProduction,
  saveProduction,
}
