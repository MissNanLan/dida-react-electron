import CoordinationService from './CoordinationService'
import NoticeService from './NoticeService'


class ServiceBuilder{

    constructor(){
       let coordinationService =  new  CoordinationService()
       let noticeService = new NoticeService()

       
       global['coordinationService'] = coordinationService
       global['noticeService'] = noticeService

    }

}

export default ServiceBuilder