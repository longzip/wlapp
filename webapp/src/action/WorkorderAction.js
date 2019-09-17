import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getWorkordersResponse = workorders => ({
  type: ActionType.GET_WORKORDERS_RESPONSE,
  workorders
});

export function getWorkordersAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Workorders")
      .then(response => {
        dispatch(getWorkordersResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewWorkorderResponse = () => ({
  type: ActionType.ADD_NEW_WORKORDER_RESPONSE
});

export const updateExistingWorkorderResponse = () => ({
  type: ActionType.UPDATE_EXISTING_WORKORDER_RESPONSE
});

export function saveWorkorderAction(WorkorderBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (WorkorderBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Workorders/" + WorkorderBeingAddedOrEdited.id,
          WorkorderBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingWorkorderResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Workorders", WorkorderBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewWorkorderResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getWorkorderResponse = WorkorderFound => ({
  type: ActionType.GET_WORKORDER_RESPONSE,
  Workorder: WorkorderFound
});

export function getWorkorderAction(WorkorderId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Workorders/" + WorkorderId)
      .then(response => {
        dispatch(getWorkorderResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteWorkorderResponse = () => ({
  type: ActionType.DELETE_WORKORDER_RESPONSE
});

export function deleteWorkorderAction(WorkorderId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Workorders/" + WorkorderId)
      .then(() => {
        dispatch(deleteWorkorderResponse());
      })
      .then(() => {
        dispatch(getWorkordersAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
