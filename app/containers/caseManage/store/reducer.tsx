import { Action } from 'redux';
import constants from '../../../store/actionType';

const defaultState = {
  caseList: []
};
export default function caseManageReducer(
  state = defaultState,
  action: Action<any>
) {
  switch (action.type) {
    case constants.UPDATECASE:
      return Object.assign({}, state, {
        caseList: action.payload
      });
    default:
      return state;
  }
}
