import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type caseManageStateType = {
  caseList: [];
};

export type Dispatch = ReduxDispatch<Action<string>>;

export type GetState = () => caseManageStateType;

export type Store = ReduxStore<caseManageStateType, Action<string>>;