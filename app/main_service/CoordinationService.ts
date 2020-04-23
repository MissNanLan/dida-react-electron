import electron from 'electron';
import Datastore from 'nedb-promises';


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

class CoordinationService{

    insert = async (doc:CoordPO)=>{
       return await coordinationDb.insert(doc)
    }
    list = async ()=>{
       return await coordinationDb.find({}).sort({"createdAt.$$date":-1})
    }
    del = async (id:string)=>{
       return  await coordinationDb.remove({"_id": id},{multi:false})
    }
    update = async (id:string,doc:CoordPO)=>{
        return coordinationDb.update({'_id':id},doc,{upsert:false,multi:false,returnUpdatedDocs:true})
    } 

    
}

export default new CoordinationService()