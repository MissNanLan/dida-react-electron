import schedule from 'node-schedule';
import electron from 'electron';
import Datastore from 'nedb-promises';
const { ipcRenderer } = electron;

const db = electron.remote.getGlobal('db')
const caseManageDb:Datastore = db.notice

type CaseItemType  = {
    caseName: string;
    primaryChecker: string;
    viceChecker: string;
    interrogator: string;
    checkDate: string;
    closingDate: Date;
    isDel: boolean
}

class CaseManageService {

    constructor() {
        // this._initSchedule()
    }

    // _jobStore = {}
    //  // 类实例化时初始所有通知任务
    // _initSchedule = () => {
    //     this._queryAllValidNotice()
    // }
    // // 查询所有有效的通知
    // _queryAllValidNotice = async() => {
    //     let noticeList = await caseManageDb.find({
    //         status: 1,
    //         isDel: false 
    //     })
    //     noticeList.forEach(notice => {
    //         this._convertNotice(notice)
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
    // _doNotice = (notice:INoticePO|any = null) => {
    //     ipcRenderer.send('create-notice-window', notice);
    // }
    insert = async(document) => {
       let  noticePO:CaseItemType = {
        caseName: "小菊案件管理",
        primaryChecker: "小菊",
        viceChecker: "小菊",
        interrogator: "石伟男",
        checkDate: "",
        closingDate: new Date(),
        isDel: false
        }
        Object.assign(noticePO,document);
        noticePO.noticeTime = document.noticeTime.toDate()
        let res = await caseManageDb.insert(noticePO)
        this._convertNotice(noticePO)
        return res
    }
    update = async (notice) => {
        notice.noticeTime = notice.noticeTime.toDate()
        await caseManageDb.update({_id:notice._id},{$set:notice},{multi:false})
    }
    list = async () => {
      let dbDoc =  await caseManageDb.find({}).sort({"noticeTime":1})
      return dbDoc

    }
    del = async(id:string) => {
        await caseManageDb.remove({"_id": id},{multi:false})
        let job = this._jobStore["" + id]
        if(job){
            job.cancel()
        }
    }

    notice = (messag:string) => {
        this._doNotice(messag)
    }

    getInfo(id){
        return 'this is from '+id
    }
}

export default new CaseManageService()