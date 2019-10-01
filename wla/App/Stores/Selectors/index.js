import { createSelector } from 'reselect'

const getWorkorder = (state, props) => {
  const id = props.id
  const customerById = state.customers.find((item, i) => item.id === id)
  return customerById
}
export const makeGetWorkorderState = () =>
  createSelector(
    [getWorkorder],
    (customer) => customer
  )
