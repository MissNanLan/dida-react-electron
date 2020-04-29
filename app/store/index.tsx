import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import createRootReducer from './reducer';
import * as caseManageActions from '../containers/caseManage/store/action';
import { caseManageStateType } from './types';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
      obj: Record<string, any>
    ) => Function;
  }
  interface NodeModule {
    hot?: {
      accept: (path: string, cb: () => void) => void;
    };
  }
}

const history = createHashHistory();
const rooterReducer = createRootReducer(history);

const configureStore = (initialState?: caseManageStateType) => {
  const middleware = [];
  middleware.push(thunk);
  const enhancers = [];
  //   const router = routerMiddleware(history);
  //   middleware.push(router);
  // const actionCreators = {
  //   ...caseManageActions
  // };

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(
    rooterReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
  return store;
};

export { configureStore, history };
