// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CaseManage from '../index';
import { updateCase } from '../store/action';
import {  Dispatch } from '../../../store/types';

function mapStateToProps(state) {
  return {
    caseList: state.caseManage.caseList
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateCase(payload) {
      dispatch(updateCase(payload))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseManage);
