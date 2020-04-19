import { Action } from 'redux';
import constants from '../../../store/actionType';

const defaultState = {
  caseList: [
    {
      caseName: '小菊'
    },
    {
      caseName: '南蓝'
    }
  ]
};
export default function caseManageReducer(
  state = defaultState,
  action: Action<any>
) {
  switch (action.type) {
    case constants.INCREMENTCASE:
      return Object.assign({}, state, {
        caseList: action.payload
      });
    case constants.DELETECASE:
      return {
        state: {
          caseList: action.payload
        }
      };
    default:
      return state;
  }
}
