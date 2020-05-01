import Datastore from 'nedb-promises';
import db from '../protect/db'
import excelUtils from '../utils/excel-utils'
import { dialog } from  'electron'

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

const excelColStype = [
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

class CoordinationService{


    insert = async (doc:CoordPO)=>{
       return await coordinationDb.insert(doc)
    }
    list = async (number:string = '')=>{
       let query = {} 
       if(number) query['number'] = eval(`/${number}/`)
       let res = await coordinationDb.find(query).sort({'createdAt':-1})
       return  res
    }
    del = async (id:string)=>{
       return  await coordinationDb.remove({"_id": id},{multi:false})
    }
    update = async (id:string,doc:CoordPO)=>{
        return coordinationDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
    } 
    downlod =  async(selectRow:CoordPO[],isAll:Boolean=false)=>{
        let path = await dialog.showSaveDialog({title:'协查记录导出',defaultPath:'协查记录'})
        if(!path.filePath){
            return 
        }
        if(isAll){
            selectRow = await this.list() as CoordPO[]
        }
        excelUtils.json2ExcelAndDownload(selectRow,path.filePath,excleFields,excleTitles,excelColStype)
    }

    
}

export default CoordinationService