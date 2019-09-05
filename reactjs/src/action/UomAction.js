import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getUomsResponse = Uoms => ({
  type: ActionType.GET_UomS_RESPONSE,
  Uoms
});

export function getUomsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Uoms")
      .then(response => {
        dispatch(getUomsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewUomResponse = () => ({
  type: ActionType.ADD_NEW_Uom_RESPONSE
});

export const updateExistingUomResponse = () => ({
  type: ActionType.UPDATE_EXISTING_Uom_RESPONSE
});

export function saveUomAction(UomBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (UomBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Uoms/" + UomBeingAddedOrEdited.id,
          UomBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingUomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Uoms", UomBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewUomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getUomResponse = UomFound => ({
  type: ActionType.GET_Uom_RESPONSE,
  Uom: UomFound
});

export function getUomAction(UomId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Uoms/" + UomId)
      .then(response => {
        dispatch(getUomResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteUomResponse = () => ({
  type: ActionType.DELETE_Uom_RESPONSE
});

export function deleteUomAction(UomId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Uoms/" + UomId)
      .then(() => {
        dispatch(deleteUomResponse());
      })
      .then(() => {
        dispatch(getUomsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
