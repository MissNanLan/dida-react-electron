import XLSX from 'xlsx'


class ExcelUtils {

    json2ExcelAndDownload =  async (data:any[],filename:string ='导出数据',fields:string[]=[],titles:any=null,colStyle:any[]=[])=>{
        const wb = await this.json2Excel(data,fields,titles,colStyle)
        XLSX.writeFile(wb,`${filename}.xlsx`,{bookType: 'xlsx', bookSST: true, type: 'array'})
    }
    json2Excel2BitArray = async (data:any[],fields:string[]=[],titles:any=null,colStyle:any[]=[])=>{
        const wb = await this.json2Excel(data,fields,titles,colStyle)
        return XLSX.write(wb,{bookType: 'xlsx', bookSST: true, type: 'array'})
    }

    json2Excel = async (data:any[],fields:string[],titles:any,colStyle:any[])=>{
        let wb =  XLSX.utils.book_new() 
        const ws = XLSX.utils.json_to_sheet(data,{header:fields})
    
        this._handelSheetHeader(ws,titles)
        this._handeSheetColumStyle(ws,colStyle)

        XLSX.utils.book_append_sheet(wb,ws)
        return wb
    }
  
    /**
     * 处理header信息，将第一行改写成自定义名称，同时去掉多余的列
     */
    _handelSheetHeader = (ws:XLSX.WorkSheet,titles:any)=>{
        if(!titles) {
            return
        } 
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
    }
    /**
     * 处理sheet单元格样式
     * @colStyle wch:长
     */
    _handeSheetColumStyle = (ws:XLSX.WorkSheet,colStyle:any[])=>{
        if(!colStyle || colStyle.length <=0) {
            return
        }        
        ws["!cols"] =colStyle
    }

  
}




export default new ExcelUtils()