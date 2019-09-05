import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getContactsResponse = Contacts => ({
  type: ActionType.GET_ContactS_RESPONSE,
  Contacts
});

export function getContactsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Contacts")
      .then(response => {
        dispatch(getContactsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewContactResponse = () => ({
  type: ActionType.ADD_NEW_Contact_RESPONSE
});

export const updateExistingContactResponse = () => ({
  type: ActionType.UPDATE_EXISTING_Contact_RESPONSE
});

export function saveContactAction(ContactBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (ContactBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Contacts/" + ContactBeingAddedOrEdited.id,
          ContactBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingContactResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Contacts", ContactBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewContactResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getContactResponse = ContactFound => ({
  type: ActionType.GET_Contact_RESPONSE,
  Contact: ContactFound
});

export function getContactAction(ContactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Contacts/" + ContactId)
      .then(response => {
        dispatch(getContactResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteContactResponse = () => ({
  type: ActionType.DELETE_Contact_RESPONSE
});

export function deleteContactAction(ContactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Contacts/" + ContactId)
      .then(() => {
        dispatch(deleteContactResponse());
      })
      .then(() => {
        dispatch(getContactsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
