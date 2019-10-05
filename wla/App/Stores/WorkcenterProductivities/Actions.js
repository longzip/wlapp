import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  saveWorkcenterProductivity: ['workcenterProductivityBeingAddedOrEdited'],
  saveWorkcenterProductivitySuccess: ['successMessage'],
  saveWorkcenterProductivityFailure: ['errorMessage'],
})

export const WorkcenterProductivitiesTypes = Types
export default Creators
