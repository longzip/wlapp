import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as ProductionsReducer } from './Productions/Reducers'
import { reducer as SelectedProductionReducer } from './SelectedProduction/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    productions: ProductionsReducer,
    selectedProduction: SelectedProductionReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
