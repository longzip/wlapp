import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getWorkcenterProductivitiesResponse = WorkcenterProductivities => ({
  type: ActionType.GET_WorkcenterProductivitieS_RESPONSE,
  WorkcenterProductivities
});

export function getWorkcenterProductivitiesAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("WorkcenterProductivities")
      .then(response => {
        dispatch(getWorkcenterProductivitiesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewWorkcenterProductivityResponse = () => ({
  type: ActionType.ADD_NEW_WorkcenterProductivity_RESPONSE
});

export const updateExistingWorkcenterProductivityResponse = () => ({
  type: ActionType.UPDATE_EXISTING_WorkcenterProductivity_RESPONSE
});

export function saveWorkcenterProductivityAction(WorkcenterProductivityBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (WorkcenterProductivityBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "WorkcenterProductivities/" + WorkcenterProductivityBeingAddedOrEdited.id,
          WorkcenterProductivityBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingWorkcenterProductivityResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("WorkcenterProductivities", WorkcenterProductivityBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewWorkcenterProductivityResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getWorkcenterProductivityResponse = WorkcenterProductivityFound => ({
  type: ActionType.GET_WorkcenterProductivity_RESPONSE,
  WorkcenterProductivity: WorkcenterProductivityFound
});

export function getWorkcenterProductivityAction(WorkcenterProductivityId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("WorkcenterProductivities/" + WorkcenterProductivityId)
      .then(response => {
        dispatch(getWorkcenterProductivityResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteWorkcenterProductivityResponse = () => ({
  type: ActionType.DELETE_WorkcenterProductivity_RESPONSE
});

export function deleteWorkcenterProductivityAction(WorkcenterProductivityId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("WorkcenterProductivities/" + WorkcenterProductivityId)
      .then(() => {
        dispatch(deleteWorkcenterProductivityResponse());
      })
      .then(() => {
        dispatch(getWorkcenterProductivitiesAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
