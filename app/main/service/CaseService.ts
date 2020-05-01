import db from '../protect/db'
import Datastore from 'nedb-promises';
import { dialog } from  'electron'
import excelUtils from '../utils/excel-utils'

const caseManageDb:Datastore = db.case

type CasePO = {
    _id?: string;
    caseName?: string;
    caseType?:string;
    primaryChecker?: string;
    viceChecker?: string;
    interrogator?: string;
    checkDate?: string;
    jinsanDate?: Date;
    closingDate?: Date;
}
const excleFields = [ 'caseName', 'caseType', 'primaryChecker' , 'viceChecker', 'interrogator', 'checkDate', 'jinsanDate', 'closingDate']

const excleTitles = {
    caseName: '案件名称',
    caseType:'案件类型',
    primaryChecker: '主查员',
    viceChecker: '辅查员',
    interrogator: '审理员',
    checkDate: '检查期间',
    jinsanDate: '金三初次送审日期',
    closingDate: '结案日'
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
]

class CaseManageService {
   
    insert = async (doc:CasePO)=>{
        return await caseManageDb.insert(doc)
     }
     list = async (keyword:string = '')=>{
        let query = {} 
        if(keyword) query['caseName'] = eval(`/${keyword}/`)
        let arr =  await caseManageDb.find(query).sort({'createdAt':-1})
        return arr
     }
     del = async (id:string)=>{
        return  await caseManageDb.remove({"_id": id},{multi:false})
     }
     update = async (id:string,doc:CasePO)=>{
         return caseManageDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
     }
     downlod =  async(selectRow:any[],isAll:Boolean=false)=>{
        let path = await dialog.showSaveDialog({title:'案件记录导出',defaultPath:'案件记录'})
        if(!path.filePath){
            return 
        }
        if(isAll){
            selectRow = await this.list() 
        }
        excelUtils.json2ExcelAndDownload(selectRow,path.filePath,excleFields,excleTitles,excelColStype)
    } 
}

export default CaseManageService