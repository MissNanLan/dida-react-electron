import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as caseManageReducer } from '../containers/caseManage/store';
import { History } from 'history';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    caseManage: caseManageReducer
  });
}
