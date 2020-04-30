import db from '../protect/db'
import Datastore from 'nedb-promises';
import noticeSchedule from './NoticeSchedule'
import {NoticeDto} from './NoticeSchedule'


const noticeDb:Datastore = db.notice

interface INoticePO{
    noticeTime: Date|null,
    noticeTitle: string,
    noticeContent: string,
    noticeType: number,
    // closeTime: number,
    status: number,
    isDel: boolean
}

class NoticeService {
    
    constructor() {
        this._initSchedule()
    }
    _jobStore = {}
     // 类实例化时初始所有通知任务
    _initSchedule = () => {
        this._queryAllValidNotice()
    }
    // 查询所有有效的通知
    _queryAllValidNotice = async() => {
        let noticeList = await noticeDb.find({}).sort({"noticeTime":1})
        noticeSchedule.batchCreateNotice(noticeList as NoticeDto[])
    }
    insert = async(document:INoticePO) => {
     
        let res = await noticeDb.insert(document)
        if(document && document.noticeTime && (document.noticeTime >= new Date())){
            noticeSchedule.createNotice(res as NoticeDto)
        }
        return res
    }
    update = async (notice) => {
        await noticeDb.update({'_id':notice._id},notice,{upsert:false,multi:false,returnUpdatedDocs:true})
    }
    list = async () => {
      let dbDoc =  await noticeDb.find({}).sort({"noticeTime":1})
      return dbDoc

    }
    del = async(id:string) => {
        await noticeDb.remove({"_id": id},{multi:false})
        noticeSchedule.delNotice(id)
    }

    notice = (messag:string) => {
        noticeSchedule._doNotice(messag)
    }

    getInfo(id){
        return 'this is from '+id
    }
}

export default NoticeService