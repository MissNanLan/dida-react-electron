
import electron from 'electron';
import Datastore from 'nedb-promises';

const db = electron.remote.getGlobal('db')
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
        console.log(doc);
        return await caseManageDb.insert(doc)
     }
     list = async ()=>{
        return await caseManageDb.find({}).sort({"createdAt.$$date":-1})
     }
     del = async (id:string)=>{
        return  await caseManageDb.remove({"_id": id},{multi:false})
     }
     update = async (id:string,doc:CasePO)=>{
         return caseManageDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
     } 
}

export default new CaseManageService()