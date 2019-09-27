import { put, call } from 'redux-saga/effects'
import ProductionsActions from 'App/Stores/Productions/Actions'
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
