import electron from 'electron';
import Datastore from 'nedb-promises';
import noticeSchedule from './NoticeSchedule'
import {NoticeDto} from './NoticeSchedule'

const db = electron.remote.getGlobal('db')
console.log(db)
const noticeDb:Datastore = db.notice

interface INoticePO{
    noticeTime: Date,
    noticeTitle: string,
    noticeContent: string,
    noticeType: number,
    closeTime: number,
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
        let noticeList = await noticeDb.find({
            status: 1,
            isDel: false,
            // noticeTime: { $gte : new Date()}
        })
        noticeSchedule.batchCreateNotice(noticeList as NoticeDto[])
    }
    insert = async(document) => {
       let  noticePO:INoticePO = {
            noticeTime: new Date(),
            noticeTitle: '',
            noticeContent: '',
            noticeType: 0,
            closeTime: 20,
            status: 1,
            isDel: false
        }
        Object.assign(noticePO,document);
        noticePO.noticeTime = document.noticeTime.toDate()
        let res = await noticeDb.insert(noticePO)
        noticeSchedule.createNotice(res as NoticeDto)
        return res
    }
    update = async (notice) => {
        notice.noticeTime = notice.noticeTime.toDate()
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

export default new NoticeService()