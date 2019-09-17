import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getRoutingWorkcentersResponse = RoutingWorkcenters => ({
  type: ActionType.GET_ROUTINGWORKCENTERS_RESPONSE,
  RoutingWorkcenters
});

export function getRoutingWorkcentersAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("RoutingWorkcenters")
      .then(response => {
        dispatch(getRoutingWorkcentersResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewRoutingWorkcenterResponse = () => ({
  type: ActionType.ADD_NEW_ROUTINGWORKCENTER_RESPONSE
});

export const updateExistingRoutingWorkcenterResponse = () => ({
  type: ActionType.UPDATE_EXISTING_ROUTINGWORKCENTER_RESPONSE
});

export function saveRoutingWorkcenterAction(RoutingWorkcenterBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (RoutingWorkcenterBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "RoutingWorkcenters/" + RoutingWorkcenterBeingAddedOrEdited.id,
          RoutingWorkcenterBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingRoutingWorkcenterResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("RoutingWorkcenters", RoutingWorkcenterBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewRoutingWorkcenterResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getRoutingWorkcenterResponse = RoutingWorkcenterFound => ({
  type: ActionType.GET_ROUTINGWORKCENTER_RESPONSE,
  RoutingWorkcenter: RoutingWorkcenterFound
});

export function getRoutingWorkcenterAction(RoutingWorkcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("RoutingWorkcenters/" + RoutingWorkcenterId)
      .then(response => {
        dispatch(getRoutingWorkcenterResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteRoutingWorkcenterResponse = () => ({
  type: ActionType.DELETE_ROUTINGWORKCENTER_RESPONSE
});

export function deleteRoutingWorkcenterAction(RoutingWorkcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("RoutingWorkcenters/" + RoutingWorkcenterId)
      .then(() => {
        dispatch(deleteRoutingWorkcenterResponse());
      })
      .then(() => {
        dispatch(getRoutingWorkcentersAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
