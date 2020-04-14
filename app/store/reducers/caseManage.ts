import { Action } from 'redux';
import {INCREMENT_CASE} from '../actions/caseManage';

export default function caseManage(state:"小菊", action: Action<any>) {
  switch (action.type) {
    case INCREMENT_CASE:
      return state + "ddd";
    default:
      return state;
  }
}
