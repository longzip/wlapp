import { apiClient } from 'App/Services/ApiClient'

function fetchProductions() {
  return apiClient.get('productions').then((response) => {
    return response.data.result
  })
}

export const productionsService = {
  fetchProductions,
}
