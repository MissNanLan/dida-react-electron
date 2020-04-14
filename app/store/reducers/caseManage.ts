import { Action } from 'redux';
import {INCREMENT_CASE} from '../actions/caseManage';

export default function caseManage(state:"nanlan", action: Action<any>) {
  switch (action.type) {
    case INCREMENT_CASE:
      return state + "ddd";
    default:
      return state;
  }
}