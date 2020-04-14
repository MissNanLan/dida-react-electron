import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

type caseManageCaseStateType = {
    caseName: string;
    // primaryChecker: string;
    // viceChecker: string;
    // interrogator: string;
    // checkDate: string;
    // closingDate: Date;
}


// export const caseManageList:<caseManageFormItemType>[] = [
//     { caseName:"xiaojuju",primaryChecker:"ddd",viceChecker:"ddd",interrogator:"ddd",checkDate:"dd",closingDate:"dd"}];

export type GetState = () => caseManageCaseStateType;

export type CaseItemType = {
    type: string,
    caseItem: caseManageCaseStateType
}