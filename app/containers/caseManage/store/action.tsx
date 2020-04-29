import constants from '../../../store/actionType';

export function updateCase(payload) {
  return {
    type: constants.UPDATECASE,
    payload
  };
}

