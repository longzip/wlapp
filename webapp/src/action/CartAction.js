import * as ActionType from "./ActionType";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getBomLinesResponse = bomLines => ({
  type: ActionType.GET_BOMLINES_RESPONSE,
  bomLines
});

export function getBomLinesAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("bomLines")
      .then(response => {
        dispatch(getBomLinesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}
