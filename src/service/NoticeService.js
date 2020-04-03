import nedb from 'nedb';
import schedule from 'node-schedule'

const noticeDb = new nedb({
    filename: '/opt/data/dida_notice.db',
    autoload: true
});

const InsertParam = {
    "noticeTime": new Date(),
    "nextNoticeTime": new Date(),
    "noticeTitle": "提醒标题",
    "noticeContent": "提醒内容",
    "noticeType": 0,
    "closeTime": 20,
    "status": 1,
    "isDel": false
}


class NoticeService {

    // 单利模式，维持全局只有一个NoticeService
    static getInstance = () => {
        if (!NoticeService.instance) {
            NoticeService.instance = new NoticeService()
        }
        return NoticeService.instance;
    }
    constructor() {
        this._initSchedule()
    }
    _jobStore = {}
    // 类实例化时初始所有通知任务
    _initSchedule = () => {
        this._queryAllValidNotice()
    }
    // 查询所有有效的通知
    _queryAllValidNotice = () => {
        noticeDb.find({ status: 1, isDel: false }).exec((err, notices) => {
            if (err) return
            notices.forEach(notice => {
                this._convertNotice(notice)
            })
        })
    }
    // 将通知转换成通知事件
    _convertNotice(notice) {
        let rule = this._convertDate2Corn(notice.noticeTime, notice.noticeType);
        if (!rule) return
        let job = schedule.scheduleJob(rule, () => {
            this._doNotice(notice)
        })
        this._jobStore[notice._id] = job
    }
    _convertDate2Corn(date, type) {
        let week = date.getDay()
        let M = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        switch (type) {
            case 0:// 一次
                return date
            case 1:// 每天
                return `${s} ${m} ${h} ${d}/1 * ?`
            case 2:// 每周
                return `${s} ${m} ${h} ? * ${week + 1}`
            case 3:// 每月
                return `${s} ${m} ${h} ${d} ${M}/1 ?`
            default:
                return '';
        }
    }

    // 具体通知内容
    _doNotice = (notice) => {
        alert("标题：" + notice.noticeTitle + "内容:" + notice.noticeContent)
    }

    insert = (insertParam, cb) => {
        noticeDb.insert(InsertParam, cb)
    }
    list = (pageNum, pageSize, cb) => {
        noticeDb.find().exec(cb)
    }
    del = (id, cb) => {
        noticeDb.remove({ "_id": id }, cb)
    }
    update = (notice) => {

    }
}





export default NoticeService