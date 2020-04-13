
// import nedb from 'nedb';

// import schedule from 'node-schedule';

import electron from 'electron';
import Datastore from 'nedb-promises';

const db = electron.remote.getGlobal('db')
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
    // constructor() {
    //     this._initSchedule()
    // }
    // _jobStore = {}
    // // 类实例化时初始所有通知任务
    // _initSchedule = () => {
    //     this._queryAllValidNotice()
    // }
    // // 查询所有有效的通知
    // _queryAllValidNotice = () => {
    //     noticeDb.find({
    //         status: 1,
    //         isDel: false
    //     }).exec((err, notices) => {
    //         if (err) return
    //         notices.forEach(notice => {
    //             this._convertNotice(notice)
    //         })
    //     })
    // }
    //  // 将通知转换成通知事件
    //  _convertNotice(notice) {
    //     let rule = this._convertDate2Corn(notice.noticeTime, notice.noticeType);
    //     if (!rule) return
    //     console.log(rule)
    //     let job = schedule.scheduleJob(rule, () => {
    //         this._doNotice(notice)
    //     })
    //     this._jobStore["" + notice._id] = job
    // }
    // _convertDate2Corn(date, type) {
    //     let week = date.getDay()
    //     let M = date.getMonth() + 1
    //     let d = date.getDate()
    //     let h = date.getHours()
    //     let m = date.getMinutes()
    //     let s = date.getSeconds()
    //     switch (type) {
    //         case 0: // 一次
    //             return date
    //         case 1: // 每天
    //             return `${s} ${m} ${h} ${d}/1 * ?`
    //         case 2: // 每周
    //             return `${s} ${m} ${h} ? * ${week + 1}`
    //         case 3: // 每月
    //             return `${s} ${m} ${h} ${d} ${M}/1 ?`
    //         default:
    //             return '';
    //     }
    // }// 具体通知内容
    // _doNotice = (notice='') => {
    //     alert(111)
    // }
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
        return await noticeDb.insert(noticePO)
    }
    // noticeDb:Datastore
    constructor(){
        
    }
    list = async () => {
        // await noticeDb.remove({},{multi:true})
      let dbDoc =  await noticeDb.find({}).sort({"noticeTime":1})

      return dbDoc

    }
    del = async(id) => {
        await noticeDb.remove({"_id": id},{multi:false})
    }
    // update = (notice) => {

    // }
    // notice = () => {
    //     this._doNotice()
    // }



    getInfo(id){
        return 'this is from '+id
    }
}

export default NoticeService