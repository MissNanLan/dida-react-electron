import electron from 'electron';
import Datastore from 'nedb-promises';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'


const db = electron.remote.getGlobal('db')
const coordinationDb:Datastore = db.coordination

class CoordPO  {
    _id?: string
    number?: string
    type?:string
    taxpayer?: string
    department?: string
    requireReplyTime?: string
    receiver?: string
    receiveTime?: string
    replyReceiver?: string
    replyReceiveTime?: string
}

const excleFields = [ 'number', 'type', 'taxpayer' , 'department', 'requireReplyTime', 'receiver', 'receiveTime', 'replyReceiver','replyReceiveTime']

const excleTitles = {
    number:'协查编号',
    type:'问题类型',
    taxpayer: '涉及纳税人',
    department: '转办部门',
    requireReplyTime: '要求回函时间',
    receiver: '接收人',
    receiveTime: '接收时间',
    replyReceiver: '回函接收人',
    replyReceiveTime: '接收时间',
}

class CoordinationService{


    insert = async (doc:CoordPO)=>{
       return await coordinationDb.insert(doc)
    }
    list = async (number:string = '')=>{
       let query = {} 
    //    if(number) query['number'] = RegExp('^'+number+'$','i')
       if(number) query['number'] = /z/
       console.log(query)
       return await coordinationDb.find(query).sort({"createdAt.$$date":-1})
    }
    del = async (id:string)=>{
       return  await coordinationDb.remove({"_id": id},{multi:false})
    }
    update = async (id:string,doc:CoordPO)=>{
        return coordinationDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
    } 
    downlod =  async(selectRow:CoordPO[],isAll:Boolean=false)=>{
        let wb =  XLSX.utils.book_new() 
        if(isAll){
            selectRow = await this.list() as CoordPO[]
        }
        let ws = this._createWs(selectRow,excleFields,excleTitles)
        this._handleWsStyle(ws)
        XLSX.utils.book_append_sheet(wb,ws)
        let wbout = XLSX.write(wb,{bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
            FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '导出数据.xlsx');
        } catch (e) {
            if (typeof console !== 'undefined'){
                console.log(e, wbout)
            }
        }
    }
    _createWs = (data:CoordPO[],fields:string[],titles:any)=>{
        const ws = XLSX.utils.json_to_sheet(data, { header: fields})
        const range = XLSX.utils.decode_range(ws['!ref'] as string)

        for(let c = range.s.c; c <= range.e.c; c++) {
            let col = XLSX.utils.encode_col(c)
            const header = col + '1'
            if(!titles[ ws[header].v ]){
                for(let d = 1 ;d<=range.e.r+1;d++){
                    delete ws[''+col+d]
                }
                continue
            }
            ws[header].v = titles[ ws[header].v ]
        }
        return ws
    }
    _handleWsStyle = (sheet:XLSX.WorkSheet)=>{
        sheet["!cols"] =[
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
            { wch: 22 },
        ]
    }

    
}

export default new CoordinationService()