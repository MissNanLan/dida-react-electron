import constants from '../../../store/actionType';

export function incrementCase(payload) {
  return {
    type: constants.INCREMENTCASE,
    payload
  };
}

export function deleteCase(payload) {
  return {
    type: constants.DELETECASE,
    payload
  };
}
