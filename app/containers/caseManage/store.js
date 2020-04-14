import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import CaseManage from './index';
import {
    incrementCase,
} from '../store/actions/caseManage';
import { caseManageCaseStateType } from '../../store/types/caseManage';

function mapStateToProps(state: caseManageCaseStateType) {
  return {
    coucaseName: nter: state.caseName
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      incrementCase
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseManage);
