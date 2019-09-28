import { put, call } from 'redux-saga/effects'
import ProductionsActions from 'App/Stores/Productions/Actions'
import SelectedProductionActions from 'App/Stores/SelectedProduction/Actions'
import { productionsService } from 'App/Services/ProductionsService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake productions colections.
 * Feel free to remove it.
 */
export function* fetchProductions() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ProductionsActions.fetchProductionsLoading())

  // Fetch productions colections from an API
  const productions = yield call(productionsService.fetchProductions)
  if (productions) {
    yield put(ProductionsActions.fetchProductionsSuccess(productions))
  } else {
    yield put(
      ProductionsActions.fetchProductionsFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (productions).'
      )
    )
  }
}

export function* fetchProduction({ id }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(SelectedProductionActions.fetchProductionLoading())

  // Fetch productions colections from an API
  const production = yield call(productionsService.fetchProduction, id)
  if (production) {
    yield put(SelectedProductionActions.fetchProductionSuccess(production))
  } else {
    yield put(
      SelectedProductionActions.fetchProductionFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (production).'
      )
    )
  }
}

export function* saveProduction(productionBeingAddedOrEdited) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(SelectedProductionActions.fetchProductionLoading())

  // Fetch productions colections from an API
  const production = yield call(productionsService.saveProduction(productionBeingAddedOrEdited))
  if (production) {
    yield put(SelectedProductionActions.fetchProductionSuccess(production))
  } else {
    yield put(
      SelectedProductionActions.fetchProductionFailure(
        'Có lỗi xảy ra khi lưu dữ liệu Lệnh sản xuất (production).'
      )
    )
  }
}
