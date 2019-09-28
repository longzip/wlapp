import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { ProductionsTypes } from 'App/Stores/Productions/Actions'
import { SelectedProductionTypes } from 'App/Stores/SelectedProduction/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'

import { fetchUser } from './ExampleSaga'
import { fetchProductions, fetchProduction, saveProduction } from './ProductionsSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(ProductionsTypes.FETCH_PRODUCTIONS, fetchProductions),
    takeEvery(SelectedProductionTypes.FETCH_PRODUCTION, fetchProduction),
    // takeLatest(SelectedProductionTypes.SAVE_PRODUCTION, saveProduction),
  ])
}
