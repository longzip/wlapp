import { put, call } from 'redux-saga/effects'
import WorkcentersActions from 'App/Stores/Workcenters/Actions'
import SelectedWorkcenterActions from 'App/Stores/SelectedWorkcenter/Actions'
import { workcentersService } from 'App/Services/WorkcentersService'

export function* fetchWorkcenters() {
  yield put(WorkcentersActions.fetchWorkcentersLoading())
  try {
    const workcenters = yield call(workcentersService.fetchWorkcenters)
    if (workcenters) {
      yield put(WorkcentersActions.fetchWorkcentersSuccess(workcenters))
    } else {
      yield put(
        WorkcentersActions.fetchWorkcentersFailure(
          'Có lỗi xảy ra khi tải dữ liệu Công đoạn sản xuất (workcenters).'
        )
      )
    }
  } catch {
    yield put(
      WorkcentersActions.fetchWorkcentersFailure(
        'Có lỗi xảy ra khi tải dữ liệu Công đoạn sản xuất (workcenters).'
      )
    )
  }
}

export function* fetchWorkcenter(action) {
  // console.log('WorkcenterSata')
  // console.log(action)
  yield put(SelectedWorkcenterActions.fetchWorkcenterLoading())
  const workcenter = yield call(workcentersService.fetchWorkcenter, action.id)
  if (workcenter) {
    yield put(SelectedWorkcenterActions.fetchWorkcenterSuccess(workcenter))
  } else {
    yield put(
      SelectedworkcenterActions.fetchWorkcenterFailure(
        'Có lỗi xảy ra khi tải dữ liệu Lệnh sản xuất (workcenter).'
      )
    )
  }
}
