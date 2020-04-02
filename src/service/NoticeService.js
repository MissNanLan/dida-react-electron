import nedb from 'nedb';

const noticeDb = new nedb({
    filename: '/opt/data/dida_notice.db',
    autoload: true
});

const InsertParam = {
    "noticeTime": "2020-04-02 19:23:09",
    "nextNoticeTime": "2020-04-02 19:23:09",
    "noticeTitle": "提醒标题",
    "noticeContent": "提醒内容",
    "noticeType": 0,
    "closeTime": 20,
    "status": 1,
    "isDel": false
}

class NoticeService {

    insert(insertParam, cb) {
        noticeDb.insert(InsertParam, cb)
    }
    list(pageNum, pageSize, cb) {
        noticeDb.find().exec(cb)
    }
    del(id, cb) {
        noticeDb.remove({"_id":id},cb)
    }

}

export default NoticeService