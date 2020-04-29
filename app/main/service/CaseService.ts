import db from '../protect/db'
import Datastore from 'nedb-promises';


const caseManageDb:Datastore = db.case

type CasePO = {
    _id?: string;
    caseName?: string;
    primaryChecker?: string;
    viceChecker?: string;
    interrogator?: string;
    checkDate?: string;
    closingDate?: Date;
}

class CaseManageService {
   
    insert = async (doc:CasePO)=>{
        return await caseManageDb.insert(doc)
     }
     list = async (keyword:string)=>{
        let query = {} 
        if(keyword) query['caseName'] = eval(`/${keyword}/`)
        let arr =  await caseManageDb.find(query).sort({'createdAt.$$date':-1})
         return arr
     }
     del = async (id:string)=>{
        return  await caseManageDb.remove({"_id": id},{multi:false})
     }
     update = async (id:string,doc:CasePO)=>{
         return caseManageDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
     } 
}

export default CaseManageService