import {
  ADD_CURRENT_EDIT_ID,
  ADD_SERVICE,
  REMOVE_SERVICE,
  CHANGE_SERVICE_FIELD,
  EDIT_SERVICE,
  CLEAR_SERVICE,
  FILTER_SERVICE,
} from "./actionTypes";

export function addCurrentEditId(id) {
  return { type: ADD_CURRENT_EDIT_ID, payload: id };
}

export function addService(name, price) {
  return { type: ADD_SERVICE, payload: { name, price } };
}

export function removeService(id) {
  return { type: REMOVE_SERVICE, payload: { id } };
}

export function EditService(n, price, id) {
  return { type: EDIT_SERVICE, payload: { n, price, id } };
}

export function clearService() {
  return { type: CLEAR_SERVICE };
}

export function changeServiceField(name, value) {
  return { type: CHANGE_SERVICE_FIELD, payload: { name, value } };
}

export function filterService(val) {
  return { type: FILTER_SERVICE, payload: { val } };
}
