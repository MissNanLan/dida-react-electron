import schedule from 'node-schedule';
import electron from 'electron';

const { ipcRenderer } = electron;

export interface NoticeDto{
    _id :string
    noticeTime: Date,
    noticeTitle: string,
    noticeContent: string,
    noticeType: number,
    closeTime: number,
}

class NoticeSchedule{

    _jobStore = {}
    // 创建通知
    batchCreateNotice = (noticeList:NoticeDto[])=>{
        noticeList.forEach(notice=>{this.createNotice(notice)})
    }
    createNotice = (notice:NoticeDto)=>{
        let corn = this._convertDate2Corn(notice.noticeTime, notice.noticeType);
            if (!corn) return
            let job = schedule.scheduleJob(corn, () => {
                this._doNotice(notice)
            })
            this._jobStore["" + notice._id] = job
            console.log(this._jobStore)
    }
    // 转换成corn表达式
    _convertDate2Corn = (date:Date, type:number)=> {
        let week = date.getDay()
        let M = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        switch (type) {
            case 0: // 一次
                return date
            case 1: // 每天
                return `${s} ${m} ${h} ${d}/1 * ?`
            case 2: // 每周
                return `${s} ${m} ${h} ? * ${week + 1}`
            case 3: // 每月
                return `${s} ${m} ${h} ${d} ${M}/1 ?`
            default:
                return '';
        }
    }

     // 具体通知内容
     _doNotice = (notice:NoticeDto|any = null) => {
        ipcRenderer.send('create-notice-window', notice);
    }

    delNotice = async(id:string)=>{
        let job = this._jobStore["" + id]
        if(job){
            job.cancel()
        }
    }

}

export default new NoticeSchedule()