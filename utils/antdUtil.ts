// @ts-ignore
import message from "rc-message"
import 'rc-message/assets/index.css'
// 文档地址：https://www.npmjs.com/package/rc-message

export function formatFormData(data: Array<{ name: Array<string>, value: string }>) {
    const tmpData: any = {}
    data?.map?.(d => {
        if (d.name?.length > 0 && d.value) {
            tmpData[d.name[0]] = d.value
        }
    })
    return tmpData
}


export function assignKey(data: Array<any>, columnName: string): Array<any> {
    return data.map(d => {
        const keyedData = {
            key: d[columnName],
            ...d
        }
        if (d.children) {
            keyedData.children = assignKey(d.children, columnName)
        }
        return keyedData
    })
}

export function findItem(data:Array<any>, keyName:string, value:string):any {
    for (const d of data) {
        if (d[keyName] === value) {
            return d
        } else if (d.children) {
            const found = findItem(d.children, keyName,value)
            if (found) return found
        }
    }
    return null
}

export function formatSwitchValue(data:any,...columns:Array<string>){
    columns.forEach(column=>{
        data[column] = (data[column]==='Y'||data[column]==='y')
    })
    return data
}

export function showFailMessage(msg:string){
    message.error({
        content:msg?.toString()||'未知错误',
        duration:8
    })
}

export function showSuccessMessage(msg:string){
    message.success({
        content:msg,
        duration:3
    })
}
