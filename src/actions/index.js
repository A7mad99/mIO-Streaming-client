import history from "../history";
import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./types";
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.post("./streams", { ...formValues, userId });
  let payload = { ...response.data, userId };

  dispatch({ type: CREATE_STREAM, payload });
  history.push("/");
};
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("./streams");
  let payload = { ...response.data };
  dispatch({ type: FETCH_STREAMS, payload });
};
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`./streams/${id}`);
  let payload = { ...response.data };
  dispatch({ type: FETCH_STREAM, payload });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`./streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`./streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
