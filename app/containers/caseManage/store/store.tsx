// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CaseManage from '../index';
import { incrementCase,deleteCase } from '../store/action';
import { GetState, Dispatch } from '../../../store/types';

function mapStateToProps(state) {
  return {
    caseList: state.caseManage.caseList
  };
}

function mapDispatchToProps(dispatch: Dispatch, getState:GetState) {
  // const { caseList } = getState;
  console.log(getState);
  return {
    incrementCase(payload) {
      dispatch(incrementCase(payload))
    },
    deleteCase(payload){
      dispatch(deleteCase(payload))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseManage);
