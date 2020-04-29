import CoordinationService from './CoordinationService'
import NoticeService from './NoticeService'
import CaseManageService from './CaseService'


class ServiceBuilder{

    constructor(){
       let coordinationService =  new  CoordinationService()
       let noticeService = new NoticeService()
       let caseManageService= new CaseManageService()



       
       global['coordinationService'] = coordinationService
       global['noticeService'] = noticeService
       global['caseManageService'] = caseManageService

    }

}

export default ServiceBuilder