import { app } from 'electron';
import path from 'path';
import Datastore from 'nedb-promises';

app.getAppPath();
    
const p = path.resolve(`${process.resourcesPath}/../bin/`);

const dbFactory = (fileName) => Datastore.create({
  filename: `${process.env.NODE_ENV === 'development' ?'.' : p}/data/${fileName}`, 
  timestampData: true,
  autoload: true
});
const db = {
    notice: dbFactory('notice.db'),
    case: dbFactory('case.db'),
    coordination:dbFactory('coordinaton.db')
};

export default db